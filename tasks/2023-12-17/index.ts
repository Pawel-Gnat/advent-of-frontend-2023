export interface Gift {
	ribbon: string
	label: string
	items: (Wearable | Literary)[] 
}

export interface Wearable {
	type: string
	size: string
	color: string
	pattern?: string
	winterSeason?: boolean
}

interface Literary {
	type: string
	size: string
	title: string
	author: string
}

export const GSL_DEMO_SNIPPET = `
Gift(ribbon: "gold curly", label: "Merry Christmas!") {
    Wearable(type: "socks", size: "small", color: "red").if(winterSeason: true) {
      pattern: "snowflakes"
    }

    Wearable(type: "scarf", size: "medium", color: "green") {
      pattern: "snowflakes"
    }

    Literary(type: "book", size: "15cm 22cm 2cm", title: "Christmas Stories", author: "C. Claus")
}
`

function extractGiftParams(giftScript: string): Pick<Gift, 'ribbon' | 'label'> {
	const giftRegex = /Gift\s*\(\s*ribbon:\s*['"]([^'"]*)['"]\s*,\s*label:\s*['"]([^'"]*)['"]\s*\)/
	const match = giftScript.match(giftRegex)

	if (match) {
		const [, ribbon, label] = match
		return { ribbon, label }
	} else {
		return { ribbon: '', label: '' }
	}
}

export function extractLiteraryParams(literaryScript: string): Literary | null {
	const literaryRegex =
		/Literary\s*\(\s*type:\s*['"]([^'"]*)['"]\s*,\s*size:\s*['"]([^'"]*)['"]\s*,\s*title:\s*['"]([^'"]*)['"]\s*,\s*author:\s*['"]([^'"]*)['"]\s*\)/
	const match = literaryScript.match(literaryRegex)

	if (match) {
		const [, type, size, title, author] = match
		return { type, size, title, author }
	} else {
        return null
    }
}

export function extractWearables(gslScript: string): Wearable[] {
	const wearables: Wearable[] = []
	const wearableRegex =
		/Wearable\s*\(\s*type:\s*['"]([^'"]*)['"]\s*,\s*size:\s*['"]([^'"]*)['"]\s*,\s*color:\s*['"]([^'"]*)['"]\s*\)(?:\s*\.if\s*\(\s*winterSeason:\s*true\s*\)\s*{(?:\s*pattern:\s*['"]([^'"]*)['"]\s*)?})?/g

	let match
	while ((match = wearableRegex.exec(gslScript)) !== null) {
		const [, type, size, color, pattern] = match
		const winterSeason = !!match[4]

		wearables.push({
			type,
			size,
			color,
			pattern,
			winterSeason,
		})
	}

	return wearables
}

export function parseGSL(gslScript: string): Gift {
	return { ...extractGiftParams(gslScript), items: [...extractWearables(gslScript)!, extractLiteraryParams(gslScript)!] }
}
