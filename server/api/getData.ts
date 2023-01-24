import type { IncomingMessage, ServerResponse } from 'http'

import { MongoClient } from 'mongodb'
import { config } from 'dotenv'

// change in 3.0.0-rc.12
// https://github.com/nuxt/framework/discussions/8296
// Node.js/Express-style middleware with (req, res, next?) => {} signature
// are not longer automatically converted to event handler format.
// You can convert them using new fromNodeMiddleware((req, res) => {}) utility.

export default fromNodeMiddleware(
	async (req: IncomingMessage, res: ServerResponse) => {
		const data = await fetchMongo()

		// lazy writeHead: usually you would need to catch a 404
		res.writeHead(200, { 'Content-Type': 'application/json' })
		res.write(JSON.stringify(data))
		res.end()
	}
)

async function fetchMongo() {
	const uri = process.env.MONGODB_URI || ''
	const mongoClient: MongoClient = new MongoClient(uri)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('food')
		// TODO parallelize both promises
		const dry = await db.collection('dry').find({}).toArray()
		const wet = await db.collection('wet').find({}).toArray()

		return [...dry, ...wet]
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
	}
}
