<script setup>
import { useAppStore } from '@/stores/app';
import useProducts from '@/composables/useProducts';
import { computed, onMounted } from 'vue';

const appStore = useAppStore();
const { products, getAllProducts, flags } = useProducts();

onMounted(async () => {
  await getAllProducts();
});

const cartItems = computed(() =>
  appStore.cart.map(item => ({
    ...products.value.find(p => p.id === item.id),
    quantity: item.quantity
  }))
);

const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

const increaseQuantity = (productId) => {
  appStore.updateCartItem(productId, appStore.cart.find(item => item.id === productId).quantity + 1);
};

const decreaseQuantity = (productId) => {
  const item = appStore.cart.find(item => item.id === productId);
  if (item.quantity > 1) {
    appStore.updateCartItem(productId, item.quantity - 1);
  }
};
</script>

<template>
  <div class="cart-container">
    <h1>Корзина</h1>

    <v-progress-circular 
        v-if="flags.isLoading" 
        indeterminate color="primary" 
        size="50" 
        class="w-100 my-4" 
    />

    <ul v-else-if="cartItems.length" class="cart-list">
      <li v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" class="item-img" />
        <div class="item-info">
          <h3>{{ item.name }}</h3>
          <p>${{ item.price }}</p>
        </div>
        <div class="quantity-controls">
          <button @click="decreaseQuantity(item.id)" :disabled="item.quantity === 1">−</button>
          <span>{{ item.quantity }}</span>
          <button @click="increaseQuantity(item.id)">+</button>
        </div>
        <p class="item-total">${{ (item.price * item.quantity).toFixed(2) }}</p>
        <v-btn icon class="delete-btn" @click="appStore.removeFromCart(item.id)">
            <v-icon>mdi-bucket</v-icon>
        </v-btn>
      </li>
        <div v-if="cartItems.length" class="cart-total">
            <h2>Итого: ${{ totalPrice.toFixed(2) }}</h2>
            <button class="checkout-btn">Оформить заказ</button>
        </div>
    </ul>

    <p v-else>Ваша корзина пуста.</p>

   
  </div>
</template>

<style scoped>
.cart-container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

.cart-list {
  list-style: none;
  padding: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.item-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.item-info {
  flex-grow: 1;
  text-align: left;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 5px;
}

.quantity-controls button {
  width: 25px;
  height: 25px;
  border: none;
  background: #eee;
  cursor: pointer;
}

.item-total {
  font-weight: bold;
}

.delete-btn {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
}

.cart-total {
  margin-top: 20px;
}

.checkout-btn {
  padding: 10px;
  background: green;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
