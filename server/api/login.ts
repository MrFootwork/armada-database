import { MongoClient } from 'mongodb'

export default defineEventHandler(async event => {
	console.log('server is hit')
	const query = getQuery(event)
	// const body = await readBody(event)
	const passwords = await fetchPasswords()

	console.log('event.context.auth', event.context.auth)

	return {
		api: 'works',
		in: query,
		passwords: passwords,
		// out: body,
	}
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
