import { MongoClient } from 'mongodb'
import { config } from 'dotenv'

export default defineEventHandler(async event => {
	console.log('server is hit')
	const query = getQuery(event)
	// const body = await readBody(event)
	// const passwords = await fetchPasswords()

	console.table(query)

	return {
		api: 'works',
		in: query,
		// out: body,
	}
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
