export function findCyclesBetweenLocations(graph: Record<string, string[]>): string[][] {
	const visitedLocations: Record<string, boolean> = {}
	const result: string[][] = []

	function deepFirstSearch(currentNode: string, path: string[] = []) {
		visitedLocations[currentNode] = true
		path.push(currentNode)

		const neighbours = graph[currentNode] || []

		for (const nextNode of neighbours) {
			if (!visitedLocations[nextNode]) {
				deepFirstSearch(nextNode, [...path])
			} else {
				const cycleIndex = path.indexOf(nextNode)

				if (cycleIndex !== -1) {
					const cycle = path.slice(cycleIndex)
					cycle.push('North Pole')
					result.push(cycle)
				}
			}
		}
	}

	const allNodes = new Set(Object.keys(graph))
	const allNeighbors = new Set(Object.values(graph).flat())
	const missingNodes = [...allNeighbors].filter(node => !allNodes.has(node))

	if (missingNodes.length > 0) {
		throw new Error('Invalid graph: missing nodes')
	}

	Object.keys(graph).forEach(node => {
		if (!visitedLocations[node]) {
			deepFirstSearch(node)
		}
	})

	return result
}
