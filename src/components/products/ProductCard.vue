<script setup>
import { useAppStore } from '@/stores/app';
import { computed } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const appStore = useAppStore()

const isFavorite = computed(() => appStore.isFavorite(props.product.id))
const cartItem = computed(() => appStore.cart.find(item => item.id === props.product.id))

const toggleLike = () => {
    isFavorite.value
        ? appStore.removeFromFavorites(props.product.id) 
        : appStore.addToFavorites(props.product.id)
}

const addToCart = () => {
  appStore.addToCart(props.product.id);
};

const increaseQuantity = () => {
  appStore.updateCartItem(props.product.id, cartItem.value.quantity + 1);
};

const decreaseQuantity = () => {
  if (cartItem.value.quantity > 1) {
    appStore.updateCartItem(props.product.id, cartItem.value.quantity - 1);
  } else {
    appStore.removeFromCart(props.product.id);
  }
};

</script>

<template>
  <v-card class="product-card" elevation="3">
    <v-img 
        :src="product.image" 
        :alt="product.name" 
        height="200"
        cover
    ></v-img>

    <v-card-title>{{ product.name }}</v-card-title>

    <v-card-text>
        <p class="text-subtitle-1">{{ product.category }}</p>
        <p class="text-h6 font-weight-bold">${{ product.price }}</p>
    </v-card-text>

    <v-card-actions>
      <div v-if="cartItem" class="quantity-controls">
        <v-btn icon @click="decreaseQuantity">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <span class="quantity">{{ cartItem.quantity }}</span>
        <v-btn icon @click="increaseQuantity">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      <v-btn v-else color="primary" @click="addToCart">
        В корзину
      </v-btn>

      <v-btn 
        icon="mdi-heart"  
        :color="isFavorite ? 'red' : 'grey'" 
        @click="toggleLike"
      ></v-btn>
    </v-card-actions>

     

  </v-card>
</template>

<style scoped>
.product-card {
  width: 100%;
  margin: auto;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity {
  font-size: 18px;
  font-weight: bold;
}
</style>
