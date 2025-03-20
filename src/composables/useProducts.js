import { ref, reactive } from 'vue'

import fakeProducts from '@/temp/products.json'

export default function useProducts() {
	const flags = reactive({
		isLoading: false,
	})

	const products = ref([])

	const getAllProducts = () => {
		flags.isLoading = true
		return new Promise((resolve) => {
			setTimeout(() => {
				products.value = fakeProducts
				flags.isLoading = false
				resolve(products.value)
			}, parseInt(Math.random() * 2000))
		})
	}

	return {
		flags,
		products,
		getAllProducts,
	}
}
