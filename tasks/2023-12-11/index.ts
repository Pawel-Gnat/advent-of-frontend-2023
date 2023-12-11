export interface WeightedGraph {
	[key: string]: { [key: string]: number }
}

let shortestDistanceNode = (distances: { [key: string]: number }, visited: string[]): string | null => {
	let shortest = null

	for (let node in distances) {
		let currentIsShortest = shortest === null || distances[node] < distances[shortest]

		if (currentIsShortest && !visited.includes(node)) {
			shortest = node
		}
	}

	return shortest
}

export function findShortestPath(graph: WeightedGraph, startNode: string, endNode: string): string[] | null {
	const nodes = Object.keys(graph)

	if (!nodes.includes(startNode) || !nodes.includes(endNode)) {
		throw new Error('Invalid or non-existent route')
	}

	let distances: { [key: string]: number } = {}
	distances[endNode] = Infinity
	distances = Object.assign(distances, graph[startNode])

	let parents: { [key: string]: string | null } = { endNode: null }
	for (let child in graph[startNode]) {
		parents[child] = startNode
	}

	let visited: string[] = []

	let node: string | null = shortestDistanceNode(distances, visited)

	while (node) {
		let distance = distances[node]
		let children = graph[node]

		for (let child in children) {
			if (String(child) === String(startNode)) {
				continue
			} else {
				let newdistance = distance + children[child]

				if (!distances[child] || distances[child] > newdistance) {
					distances[child] = newdistance
					parents[child] = node
				}
			}
		}

		visited.push(node)
		node = shortestDistanceNode(distances, visited)
	}

	if (distances[endNode] === Infinity) {
		return null
	}

	let shortestPath = [endNode]
	let parent = parents[endNode]

	while (parent) {
		shortestPath.push(parent)
		parent = parents[parent]
	}

	shortestPath.reverse()

	let results = {
		distance: distances[endNode],
		path: shortestPath,
	}

	return results.path
}
