// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
	state: () => ({
		favorites: ref([]),
		cart: [],\
	}),

	getters: {
		isFavorite: (state) => (productId) => state.favorites.includes(productId),

		cartTotal: (state) => state.cart.reduce((sum, item) => sum + item.quantity, 0),
    cartItems: (state) => state.cart

	  },
	
	actions: {
		addToFavorites(productId) {
			if (!this.favorites.includes(productId)) {
				this.favorites.push(productId)

			}
		},

		removeFromFavorites(productId) {
			this.favorites = this.favorites.filter(id => id !== productId)
		},

		
		addToCart(productId) {
			const item = this.cart.find(item => item.id === productId)
			if (item) {
			  item.quantity++
			} else {
			  this.cart.push({ id: productId, quantity: 1 })
			}
		  },
	  
		removeFromCart(productId) {
			this.cart = this.cart.filter(item => item.id !== productId)
		},
	
		updateCartItem(productId, quantity) {
			const item = this.cart.find(item => item.id === productId)
			if (item) {
				item.quantity = quantity
				if (item.quantity <= 0) {
					this.removeFromCart(productId)
				}
			}
		}
	}
})
