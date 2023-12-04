type FunctionType = (value: string | number) => string | number

export function memoize(fn: FunctionType): FunctionType {
	const cache: Record<string, string | number> = {}

	if (typeof fn !== 'function') {
		throw new Error('Function to be memoized must be a function.')
	}

	return (...args) => {
		let n = args[0]

		if (n in cache) {
			return cache[n]
		} else {
			let result = fn(n)
			cache[n] = result
			return result
		}
	}
}
