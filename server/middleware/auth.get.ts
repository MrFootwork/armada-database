// import {
// 	createApp,
// 	createRouter,
// 	useBody,
// 	useBase,
// 	sendError,
// 	createError,
// } from 'h3'
import { MongoClient } from 'mongodb'
import { config } from 'dotenv'

export default defineEventHandler(async event => {
	// console.log('auth is hit')
	// const body = await readBody(event)
	// // const passwords = await fetchPasswords()
	// // console.log(passwords)
	// // console.log(event.node.req)
	// console.log(body)
	// return {
	// 	authenticated: false,
	// }
})

async function fetchPasswords() {
	const uri = process.env.MONGODB_URI || ''
	const mongoClient: MongoClient = new MongoClient(uri)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('security')
		const keys = await db.collection('keys').find({}).toArray()

		return keys
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
	}
}
