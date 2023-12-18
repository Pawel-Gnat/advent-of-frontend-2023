export class RateLimiter {
	private maxRequests: number
	private intervalMs: number
	private tokens: number
	private lastAccessTime: number

	constructor(maxRequests: number, intervalMs: number) {
		this.maxRequests = maxRequests
		this.intervalMs = intervalMs
		this.tokens = maxRequests
		this.lastAccessTime = 0
	}

	attemptAccess(): boolean {
		const now = Date.now()

		if (now - this.lastAccessTime > this.intervalMs) {
			this.tokens = this.maxRequests
		}

		if (this.tokens > 0) {
			this.tokens--
			this.lastAccessTime = now
			return true
		}

		return false
	}
}
