<template>
  <div>
    <input type="password" name="password" id="password" v-model="inputPassword">
    <button @click="login">login </button>
    <h4>{{ data }}</h4>
  </div>
</template>

<script setup lang="ts">

const inputPassword = ref('')
const isLoggedIn = ref(false)
const data = ref({})
// const { data: verified } = await useFetch(`/api/login?verify=${inputPassword.value}`)


// FIXME read about data fetching in Nuxt
// https://nuxt.com/docs/getting-started/data-fetching#data-fetching
async function login() {
  // await useFetch(`/api/login`, { method: 'GET', body: { verify: inputPassword.value } })
  // const { data: back } = await useFetch(`api/login?verify=${inputPassword.value}`, {
  //   method: 'post',
  //   body: { test: 123 }
  // })

  // const { data: back } = await useFetch('api/login')
  // const { data: back } = await useFetch('api/login?param1=test')
  // const { data: back } = await useFetch(`api/login?verify=${inputPassword.value}`)

  // data.value = back

  data.value = await useFetch(`api/login?verify=${inputPassword.value}`)

  // data.value = await useFetch(`api/login?verify=${inputPassword.value}`, {
  //   method: 'post',
  //   body: { test: 123 }
  // })
  isLoggedIn.value = true
  // console.log(verified);
  // isLoggedIn.value = verified.value.authenticated
}

</script>