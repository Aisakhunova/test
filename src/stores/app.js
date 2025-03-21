// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
	state: () => ({
		favorites: ref([])
	}),

	getters: {
		isFavorite: (state) => (productId) => state.favorites.includes(productId),
	  },
	
	actions: {
		addToFavorites(productId) {
			if (!this.favorites.includes(productId)) {
			this.favorites.push(productId)
			}
		},

		removeFromFavorites(productId) {
			this.favorites = this.favorites.filter(id => id !== productId)
		}
	}
})
