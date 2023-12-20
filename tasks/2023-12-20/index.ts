export class GiftStream<T> {
	private gifts: T[]
	private operations: Array<{ type: string; count?: number; callback?: (value: T) => T }>

	constructor(gifts: T[]) {
		this.gifts = gifts || []
		this.operations = []
	}

	map(callback: (value: T) => T) {
		this.operations.push({
			type: 'map',
			callback,
		})
		return this
	}

	skip(count: number) {
		this.operations.push({
			type: 'skip',
			count,
		})
		return this
	}

	take(count: number) {
		this.operations.push({
			type: 'take',
			count,
		})
		return this
	}

	getGifts(): T[] {
		let result = [...this.gifts]

		for (const operation of this.operations) {
			switch (operation.type) {
				case 'map':
					result = result.map(operation.callback as (value: T) => T)
					break
				case 'skip':
					result = result.slice(operation.count)
					break
				case 'take':
					result = result.slice(0, operation.count)
					break
			}
		}

		return result
	}
}
