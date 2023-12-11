import { findShortestPath } from './index'

describe('findShortestPath', () => {
	it('should return the shortest path between cities', () => {
		const graph = {
			London: { Paris: 1, Berlin: 4 },
			Paris: { London: 1, Berlin: 2, Tokyo: 5 },
			Berlin: { London: 4, Paris: 2, Tokyo: 1 },
			Tokyo: { Paris: 5, Berlin: 1 },
		}
		expect(findShortestPath(graph, 'London', 'Tokyo')).toEqual(['London', 'Paris', 'Berlin', 'Tokyo'])
	})

	it('should handle cities with no connection between them', () => {
		const graph = {
			London: { Paris: 1 },
			Paris: { London: 1 },
			Tokyo: { Beijing: 1 },
			Beijing: { Tokyo: 1 },
		}
		expect(findShortestPath(graph, 'London', 'Beijing')).toBeNull()
	})

	it('should throw an error for invalid or non-existent routes', () => {
		const graph = {
			London: { Berlin: 1, Paris: 2 },
			Berlin: { London: 1 },
		}
		expect(() => findShortestPath(graph, 'London', 'Frankfurt')).toThrow('Invalid or non-existent route')
	})
})
