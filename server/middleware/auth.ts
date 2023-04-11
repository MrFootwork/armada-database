import { MongoClient } from 'mongodb'

// this will be called every time, before anything else
export default defineEventHandler(async event => {
	console.log('auth is hit')
	// console.log(event.node.res.statusCode)
	// const passwords = await fetchPasswords()
	// console.log(passwords)
	event.context.auth = { user: 123 }
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
