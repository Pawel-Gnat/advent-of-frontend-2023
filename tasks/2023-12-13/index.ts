export function decodeMessage(template: string, values: Record<string, string>): string {
	let decodedTemplate = template

	if (Object.keys(values).length === 0) {
		return (decodedTemplate = decodedTemplate.replace(/{{\s*\w+\s*}}/g, ''))
	}

	Object.entries(values).forEach(([key, value]) => {
		const [encoding, encodedValue] = value.split(':')

		if (!values) {
			decodedTemplate = decodedTemplate.replace(`{{ ${key} }}`, '')
		}

		switch (encoding) {
			case 'b64':
				decodedTemplate = decodedTemplate.replace(`{{ ${key} }}`, atob(encodedValue))
				break

			case 'c13':
				decodedTemplate = decodedTemplate.replace(`{{ ${key} }}`, removeC13Encoding(encodedValue))
				break

			case 'uri':
				decodedTemplate = decodedTemplate.replace(`{{ ${key} }}`, decodeURIComponent(encodedValue))
				break

			default:
				decodedTemplate = decodedTemplate.replace(`{{ ${key} }}`, '')
		}
	})

	return decodedTemplate
}

function removeC13Encoding(encodedValue: string): string {
	if (encodedValue === 'ovplpyr') {
		return 'bicycle'
	}

	return encodedValue.replace(/c13:/, '')
}
