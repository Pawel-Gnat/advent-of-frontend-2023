export interface Letter {
	content: string
	country: 'pl' | 'de' | 'us'
	priority: 'high' | 'medium' | 'low'
}

interface SortingStrategy {
	sort(letters: Letter[]): Letter[]
}

export class LetterSorter {
	private strategy: SortingStrategy

	constructor(strategy: SortingStrategy) {
		this.strategy = strategy
	}

	sortLetters(letters: Letter[]): Letter[] {
		return this.strategy.sort(letters)
	}
}

export class PriorityStrategy {
	sort(letters: Letter[]): Letter[] {
		const priorityOrder = { low: 3, medium: 2, high: 1 }

		return [...letters].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
	}
}

export class CountryStrategy {
	private countryMap: Record<Letter['country'], number> = {
		pl: 1,
		de: 2,
		us: 3,
	}

	sort(letters: Letter[]): Letter[] {
		return [...letters].sort((a, b) => this.countryMap[a.country] - this.countryMap[b.country])
	}
}

export class LengthStrategy {
	sort(letters: Letter[]): Letter[] {
		return [...letters].sort((a, b) => {
			return a.content.length - b.content.length
		})
	}
}
