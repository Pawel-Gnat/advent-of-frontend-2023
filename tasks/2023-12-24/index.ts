abstract class Component {
	state: Record<string, any>
	style: string

	constructor(state: Record<string, any> = {}, style: string = '') {
		this.state = state
		this.style = style
	}

	abstract template(): string

	setState(newState: Record<string, any>): void {
		this.state = { ...this.state, ...newState }
	}

	render(): string {
		return this.template()
	}
}

function renderComponent(component: Component): string {
	return component.render()
}

export { Component, renderComponent }
