export interface TextProcessingPlugin {
	process(text: string): string
}

export class TextProcessor {
	plugins: TextProcessingPlugin[] = []

	use(plugin: TextProcessingPlugin) {
		this.plugins.push(plugin)
	}

	process(inputText: string): string {
		let processedText = inputText

		for (const plugin of this.plugins) {
			processedText = plugin.process(processedText)
		}

		return processedText
	}
}

export class RemoveWordsPlugin implements TextProcessingPlugin {
	wordsToRemove: string[]

	constructor(wordsToRemove: string[]) {
		this.wordsToRemove = wordsToRemove
	}

	process(text: string): string {
		for (const word of this.wordsToRemove) {
            const regex = new RegExp(`\\b\\s*${word}\\s*\\b`, 'ig');
            text = text.replace(regex, match => ' '.repeat(match.length));
          }
          text = text.replace(/\s+/g, ' ').trim();
          return text;
	}
}

export class ReplaceCharsPlugin implements TextProcessingPlugin {
	charMap: { [key: string]: string }

	constructor(charMap: { [key: string]: string }) {
		this.charMap = charMap
	}

	process(text: string): string {
		for (const [originalChar, replacement] of Object.entries(this.charMap)) {
			text = text.split(originalChar).join(replacement)
		}
		return text
	}
}

export class MarkdownToHtmlPlugin implements TextProcessingPlugin {
	process(text: string): string {
		return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
	}
}
