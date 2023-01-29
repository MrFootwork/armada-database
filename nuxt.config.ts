// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		mongoURI: process.env.MONGODB_URI,
	},
})
