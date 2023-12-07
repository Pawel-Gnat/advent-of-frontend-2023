type Letter = { [key: string]: number }

export function createTrackedLetter(letter: Letter, fn: (key: string, value: number) => void): Letter {
	const trackedLetter: Letter = new Proxy(letter, {
		set: function (target, key, value) {
			const previousValue = target[key as string]

			target[key as string] = value

			if (previousValue !== value) {
				fn(key as string, value as number)
			}

			return true
		},
	})

	return trackedLetter as Letter
}
