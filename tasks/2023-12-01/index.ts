interface Child {
	id: number
	gifts: string[]
}

export class GiftRegistry {
	gifts: Child[]

	constructor() {
		this.gifts = []
	}

	addGift(id: number, giftToAdd: string) {
		const child = this.gifts.find(child => child.id === id)
		child ? child.gifts.push(giftToAdd) : this.gifts.push({ id, gifts: [giftToAdd] })
	}

	removeGift(id: number, giftToRemove: string) {
		const child = this.gifts.find(child => child.id === id)

		if (child?.gifts.find(gift => gift === giftToRemove)) {
			child.gifts = child.gifts.filter(gift => gift !== giftToRemove)
		} else {
			throw new Error('Gift not found')
		}
	}

	getGiftsForChild(id: number) {
		return this.gifts.find(child => child.id === id)?.gifts
	}
}
