import { MongoClient } from 'mongodb'

export default defineEventHandler(async event => {
	console.log('server is hit')
	const query = getQuery(event)
	// const body = await readBody(event)
	const gyms = await fetchGyms()

	// console.table(passwords)

	return {
		api: 'works',
		in: query,
		out: gyms,
	}
})

async function fetchGyms() {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('bookings')
		const gyms = await db.collection('gyms').find({}).toArray()

		return gyms
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
	}
}
