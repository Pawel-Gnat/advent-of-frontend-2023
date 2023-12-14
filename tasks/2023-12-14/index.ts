export type Gift = {
	value: number
	weight: number
	volume: number
}

export function calculateMaxGiftValue(gifts: Gift[], maxWeight: number, maxVolume: number): number {
	if (
		Object.values(gifts).every(gift => gift.volume > maxVolume) ||
		Object.values(gifts).every(gift => gift.weight > maxWeight) ||
		gifts.length === 0
	) {
		return 0
	}

	const giftsLength = gifts.length
	const result: number[][][] = new Array(giftsLength + 1)
		.fill(0)
		.map(() => new Array(maxWeight + 1).fill(0).map(() => new Array(maxVolume + 1).fill(0)))

	for (let i = 1; i <= giftsLength; i++) {
		const { value, weight, volume } = gifts[i - 1]

		for (let w = 0; w <= maxWeight; w++) {
			for (let v = 0; v <= maxVolume; v++) {
				if (weight <= w && volume <= v) {
					result[i][w][v] = Math.max(result[i - 1][w][v], result[i - 1][w - weight][v - volume] + value)
				} else {
					result[i][w][v] = result[i - 1][w][v]
				}
			}
		}
	}

	return result[giftsLength][maxWeight][maxVolume]
}
