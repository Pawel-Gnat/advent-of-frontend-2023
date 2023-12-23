export type JsonSchema = {
	type: string
	properties?: Record<string, JsonSchema>
	required?: string[]
	items?: JsonSchema
	nullable?: boolean
}

export const generateSchema = (schemaDefinition: JsonSchema): JsonSchema => {
	return schemaDefinition
}

export const validate = (schema: JsonSchema, jsonObject: any): boolean => {
	const validateObject = (obj: any, schema: JsonSchema): boolean => {
		if (schema.required) {
			const requiredProps = schema.required
			return requiredProps.every(prop => prop in obj)
		}

		return true
	}

	return validateObject(jsonObject, schema)
}
