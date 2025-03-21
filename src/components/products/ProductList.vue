<script setup>
import { onMounted, computed } from 'vue'
import useProducts from '@/composables/useProducts'
import ProductCard from './ProductCard.vue'

const { flags, getAllProducts, selectedCategory, filteredProducts, products } = useProducts()

onMounted(async () => {
  await getAllProducts()
})

const categories = computed(() => [...new Set(products.value.map(p => p.category))])

</script>

<template>
  <div>
    <v-row>
        <v-col md="3">
            <v-autocomplete
                v-model="selectedCategory"
                :items="categories"
                label="Выберите категорию"
                clearable
            ></v-autocomplete>
        </v-col>
    </v-row>

    <v-progress-circular 
        v-if="flags.isLoading" 
        indeterminate color="primary" 
        size="50" 
        class="w-100 my-4" 
    />

    <v-row v-else>
        <v-col 
            v-for="product in filteredProducts" 
            :key="product.id" 
            cols="12" 
            md="3"
        >
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </div>
</template>
