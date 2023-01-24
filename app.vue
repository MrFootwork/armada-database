<template>
  <div>
    <input type="password" name="password" id="password" v-model="inputPassword">
    <button @click="login">login </button>
  </div>
</template>

<script setup lang="ts">

const inputPassword = ref('')

// FIXME read about data fetching in Nuxt
// https://nuxt.com/docs/getting-started/data-fetching#data-fetching
async function login() {
  // await useFetch(`/api/login`, { method: 'GET', body: { verify: inputPassword.value } })
  await useFetch(`/api/login?verify=${inputPassword.value}`)
}

</script>