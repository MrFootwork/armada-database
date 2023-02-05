import { MongoClient } from 'mongodb'

export default defineEventHandler(async event => {
	console.log('server is hit')
	const query = getQuery(event)
	// const body = await readBody(event)
	const days = await fetchDays()

	// console.table(passwords)

	return {
		api: 'works',
		in: query,
		out: days,
	}
})

async function fetchDays() {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('bookings')
		const days = await db.collection('days').find({}).toArray()

		return days
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
	}
}
