type GalacticHistoryTracer<T> = {
	history: T[]
	currentIndex: number
	add: (path: T) => void
	current: () => T | null
	redo: () => T
	undo: () => T
}

export function createTracer<T>(): GalacticHistoryTracer<T> {
	return {
		history: [],
		currentIndex: 0,
		add: function (path: T) {
			this.history.push(path)
			this.currentIndex = this.history.length - 1
		},
		current: function () {
			if (this.currentIndex < 0) return null
			return this.history[this.currentIndex]
		},
		undo: function () {
			this.currentIndex -= 1
			return this.history[this.currentIndex]
		},
		redo: function () {
			if (this.currentIndex === this.history.length - 1) {
				throw new Error('No more galaxies to explore')
			}

			this.currentIndex += 1
			return this.history[this.currentIndex]
		},
	}
}
