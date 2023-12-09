export interface Tool {
	init: () => void
	update: () => void
	dispose: () => void
}

interface EquipmentType {
	tools: Tool[]
	initialized: boolean
}

export class Equipment {
	equipment: EquipmentType = { tools: [], initialized: false }

	registerTools(tool: Tool) {
		this.equipment.tools.push(tool)
	}

	initializeTools() {
		this.equipment.tools.forEach(eq => eq.init())
		this.equipment.initialized = true
	}

	updateTools() {
		if (!this.equipment.initialized) {
			throw new Error('Cannot update any tools before initialization.')
		}

		this.equipment.tools.forEach(eq => eq.update())
	}

	disposeTools() {
		this.equipment.tools.forEach(eq => eq.dispose())
	}
}
