export async function conductInterviews(
	subjects: string[],
	interview: (subject: string) => Promise<string>,
	timeConstraint: number
): Promise<string[]> {
	const completedSubjects: string[] = []

	for (const subject of subjects) {
		try {
			const result = await Promise.race([interview(subject), timeoutPromise(timeConstraint)])

			completedSubjects.push(result)
		} catch (error: any) {
			completedSubjects.push(`Error: ${error.message}`)
		}
	}

	return completedSubjects
}

function timeoutPromise(ms: number): Promise<never> {
	return new Promise((_, reject) => {
		setTimeout(() => {
			reject(new Error('Timeout'))
		}, ms)
	})
}
