import { MongoClient } from 'mongodb'

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
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)

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
