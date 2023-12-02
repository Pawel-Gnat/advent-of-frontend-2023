interface GiftsQueue<T> {
	giftName: T
	priority: number
}

export class ChristmasQueue<T> {
	giftsQueue: GiftsQueue<T>[]

	constructor() {
		this.giftsQueue = []
	}

	enqueue(gift: T, priority: number) {
		this.giftsQueue.push({ giftName: gift, priority })
		this.giftsQueue.sort((a, b) => b.priority - a.priority)
	}

	dequeue() {
		if (this.giftsQueue.length === 0) {
			throw new Error('There are no letters in the queue!')
		}

		return this.giftsQueue.shift()?.giftName
	}

	isEmpty() {
		return this.giftsQueue.length === 0
	}
}