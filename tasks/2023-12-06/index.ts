export class OrderController {
	machines: Machine[]

	constructor() {
		this.machines = []
	}

	registerMachine(machine: Machine) {
		this.machines.push(machine)
	}

	setState(state: string) {
		if (state === 'unknown') {
			throw new Error('Invalid state provided')
		}

		this.machines.forEach(machine => {
			machine.update(state)
		})
	}

	unregisterMachine(machine: Machine) {
		this.machines = this.machines.filter(m => m !== machine)
		machine.update(null)
	}
}

export class Machine {
	state: string | null = null
	orderHistory: string[] = []

	constructor() {
		this.state = null
		this.orderHistory = []
	}

	performAudit() {
		return this.orderHistory
	}

	update(order: string | null): void {
		this.state = order

		if (order) {
			this.orderHistory.push(`Order #${this.orderHistory.length + 1} - ${order}`)
		}
	}
}
