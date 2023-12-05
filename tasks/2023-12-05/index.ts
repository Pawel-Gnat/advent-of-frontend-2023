type Events = Record<string, (() => void)[]>

export class ChristmasEmitter {
	events: Events

	constructor() {
		this.events = {}
	}

	on(item: string, fn: () => void) {
		if (!this.events[item]) {
			this.events[item] = []
		}

		this.events[item].push(fn)

		return () => {
			this.off(item, fn)
		}
	}

	off(item: string, fn: () => void) {
		if (this.events[item]) {
			this.events[item] = this.events[item].filter(callback => callback !== fn)
		}
	}

	emit(event: string) {
		const callbacks = this.events[event] || []
		callbacks.forEach(callback => callback())
	}
}
