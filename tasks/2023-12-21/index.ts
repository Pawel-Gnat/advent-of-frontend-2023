export class InjectionToken<T> {
	constructor(description: T) {}
}

export class FactoryInjector {
	registry: Map<any, any> = new Map()

	registerClass<T>(item: { new (): T }): void {
		this.registry.set(item, () => new item())
	}

	get<T>(identifier: any): T {
		const registeredItem = this.registry.get(identifier)

		if (!registeredItem) {
			throw new Error(`No blueprint registered for ${identifier}`)
		}

		return typeof registeredItem === 'function' ? registeredItem() : registeredItem
	}

	provideValue<T>(token: InjectionToken<T>, value: T): void {
		this.registry.set(token, value)
	}
}
