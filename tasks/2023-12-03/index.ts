export interface Lokalizacja {
	x: number
	y: number
	z: number
	czas: number
}

export interface MapaCzasoprzestrzenna {
	(x: number, y: number, z: number, czas: number): number
}

export function znajdzWorek(lokalizacje: Lokalizacja[], mapa: MapaCzasoprzestrzenna): Lokalizacja | null {
	if (lokalizacje.length === 0) {
		return null
	}

	const maxValue = lokalizacje.reduce(
		(currentMax, currentLocalization) => {
			const currentValue = mapa(
				currentLocalization.x,
				currentLocalization.y,
				currentLocalization.z,
				currentLocalization.czas
			)

			return currentValue > currentMax.value ? { localization: currentLocalization, value: currentValue } : currentMax
		},
		{
			localization: lokalizacje[0],
			value: mapa(lokalizacje[0].x, lokalizacje[0].y, lokalizacje[0].z, lokalizacje[0].czas),
		}
	)

	if (typeof maxValue.value === 'number' && !isNaN(maxValue.value)) {
		return maxValue.localization
	} else {
		return null
	}
}
