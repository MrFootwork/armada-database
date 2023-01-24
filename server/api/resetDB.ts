import type { IncomingMessage, ServerResponse } from 'http'

import { MongoClient } from 'mongodb'
import { config } from 'dotenv'

export default fromNodeMiddleware(
	async (req: IncomingMessage, res: ServerResponse) => {
		const uri = process.env.MONGODB_URI || ''
		const mongoClient: MongoClient = new MongoClient(uri)

		await mongoClient.connect()
		const db = mongoClient.db('food')

		try {
			await dropCollection(db, 'dry')
			await addData(db, 'dry', dryFood)
			await dropCollection(db, 'wet')
			await addData(db, 'wet', wetFood)
		} catch (e) {
			console.error('could not read from database. ', e)
		} finally {
			await mongoClient.close()
		}

		res.writeHead(200, { 'Content-Type': 'application/json' })
		res.end()
	}
)

const royalCaninCare = {
	name: 'Royal Canin Care Hair&Skin',
	recommendations: [
		{
			weight: 3,
			ideal: 41,
			overweight: 33,
		},
		{
			weight: 4,
			ideal: 50,
			overweight: 40,
		},
		{
			weight: 5,
			ideal: 59,
			overweight: 47,
		},
		{
			weight: 6,
			ideal: 67,
			overweight: 53,
		},
	],
	type: 'dry',
	color: '#00D8FF',
	image:
		'https://lh3.googleusercontent.com/LVjwlxmeu5omDhv-ay80SkE8zhqiEzXjnb2DoTOO59L_6PmGFXj5c8pNcqCMBD0l0JgT4WlJywsQSiXZDyh4wl9hQr3s5yt_PN04iG1-PYhQGNfWfpwkBUxzIiyeoFf34oKuEhcA-ZI=w2400',
}
const royalCaninSterilised = {
	name: 'Royal Canin Regular Sterilised 37',
	recommendations: [
		{
			weight: 3,
			ideal: 47,
			overweight: 37,
		},
		{
			weight: 4,
			ideal: 57,
			overweight: 46,
		},
		{
			weight: 5,
			ideal: 67,
			overweight: 54,
		},
		{
			weight: 6,
			ideal: 76,
			overweight: 61,
		},
	],
	type: 'dry',
	color: '#E46651',
	image:
		'https://lh3.googleusercontent.com/mAzKOk9HjKoegN-4MMzobtShYzN2xBKK2VwnF48w6fBAVnO_nT5aamBFK1j9YetIged7FPpsHistECwdDkZ9pi6sa7z8XcwDiCqIQyBD89Igb3T9ulTqrAA6L8jwLr-Wbkuk0iFE8TI=w2400',
}
const test_1 = {
	name: 'dry test_1',
	recommendations: [
		{
			weight: 3,
			ideal: 47,
			overweight: 37,
		},
		{
			weight: 4,
			ideal: 57,
			overweight: 46,
		},
		{
			weight: 5,
			ideal: 67,
			overweight: 54,
		},
		{
			weight: 6,
			ideal: 76,
			overweight: 61,
		},
	],
	type: 'dry',
	color: '#41B883',
	image:
		'https://lh3.googleusercontent.com/mAzKOk9HjKoegN-4MMzobtShYzN2xBKK2VwnF48w6fBAVnO_nT5aamBFK1j9YetIged7FPpsHistECwdDkZ9pi6sa7z8XcwDiCqIQyBD89Igb3T9ulTqrAA6L8jwLr-Wbkuk0iFE8TI=w2400',
}
const test_2 = {
	name: 'dry test_2',
	recommendations: [
		{
			weight: 3,
			ideal: 47,
			overweight: 37,
		},
		{
			weight: 4,
			ideal: 57,
			overweight: 46,
		},
		{
			weight: 5,
			ideal: 67,
			overweight: 54,
		},
		{
			weight: 6,
			ideal: 76,
			overweight: 61,
		},
	],
	type: 'dry',
	color: '#41B883',
	image:
		'https://lh3.googleusercontent.com/mAzKOk9HjKoegN-4MMzobtShYzN2xBKK2VwnF48w6fBAVnO_nT5aamBFK1j9YetIged7FPpsHistECwdDkZ9pi6sa7z8XcwDiCqIQyBD89Igb3T9ulTqrAA6L8jwLr-Wbkuk0iFE8TI=w2400',
}
const test_3 = {
	name: 'dry test_3',
	recommendations: [
		{
			weight: 3,
			ideal: 47,
			overweight: 37,
		},
		{
			weight: 4,
			ideal: 57,
			overweight: 46,
		},
		{
			weight: 5,
			ideal: 67,
			overweight: 54,
		},
		{
			weight: 6,
			ideal: 76,
			overweight: 61,
		},
	],
	type: 'dry',
	color: '#41B883',
	image:
		'https://lh3.googleusercontent.com/mAzKOk9HjKoegN-4MMzobtShYzN2xBKK2VwnF48w6fBAVnO_nT5aamBFK1j9YetIged7FPpsHistECwdDkZ9pi6sa7z8XcwDiCqIQyBD89Igb3T9ulTqrAA6L8jwLr-Wbkuk0iFE8TI=w2400',
}
const test_4 = {
	name: 'dry test_4',
	recommendations: [
		{
			weight: 3,
			ideal: 47,
			overweight: 37,
		},
		{
			weight: 4,
			ideal: 57,
			overweight: 46,
		},
		{
			weight: 5,
			ideal: 67,
			overweight: 54,
		},
		{
			weight: 6,
			ideal: 76,
			overweight: 61,
		},
	],
	type: 'dry',
	color: '#41B883',
	image:
		'https://lh3.googleusercontent.com/mAzKOk9HjKoegN-4MMzobtShYzN2xBKK2VwnF48w6fBAVnO_nT5aamBFK1j9YetIged7FPpsHistECwdDkZ9pi6sa7z8XcwDiCqIQyBD89Igb3T9ulTqrAA6L8jwLr-Wbkuk0iFE8TI=w2400',
}
const test_5 = {
	name: 'dry test_5',
	recommendations: [
		{
			weight: 3,
			ideal: 47,
			overweight: 37,
		},
		{
			weight: 4,
			ideal: 57,
			overweight: 46,
		},
		{
			weight: 5,
			ideal: 67,
			overweight: 54,
		},
		{
			weight: 6,
			ideal: 76,
			overweight: 61,
		},
	],
	type: 'dry',
	color: '#41B883',
	image:
		'https://lh3.googleusercontent.com/mAzKOk9HjKoegN-4MMzobtShYzN2xBKK2VwnF48w6fBAVnO_nT5aamBFK1j9YetIged7FPpsHistECwdDkZ9pi6sa7z8XcwDiCqIQyBD89Igb3T9ulTqrAA6L8jwLr-Wbkuk0iFE8TI=w2400',
}
const shebaBig = {
	name: 'Sheba Slices',
	recommendations: [
		{
			weight: 3,
			ideal: 3,
			overweight: 2.5,
		},
		{
			weight: 4,
			ideal: 4,
			overweight: 3.5,
		},
		{
			weight: 5,
			ideal: 5,
			overweight: 4,
		},
		{
			weight: 6,
			ideal: 6,
			overweight: 5,
		},
	],
	type: 'wet',
	image:
		'https://lh3.googleusercontent.com/cGXV_a6OVQbXzkybi1waEyaVgQkYKT3VbxgTiMoluEzIut1S1ZxvAo8hJopJOfPd2UUixv3v6e3EZ7Qm4HwMc2kdyKSLWOQ8JbUZP6c-j15EZ4RCQD2k6sTDVExo8wQQNktwf1mhXKQ=w2400',
}
const shebaSelection = {
	name: 'Sheba Selection In Sauce',
	recommendations: [
		{
			weight: 3,
			ideal: 2.5,
			overweight: 2,
		},
		{
			weight: 4,
			ideal: 3,
			overweight: 2.5,
		},
		{
			weight: 5,
			ideal: 3.5,
			overweight: 3,
		},
		// {
		// 	weight: 6,
		// 	ideal: 4,
		// 	overweight: 3.5,
		// },
	],
	type: 'wet',
	image:
		'https://lh3.googleusercontent.com/cGXV_a6OVQbXzkybi1waEyaVgQkYKT3VbxgTiMoluEzIut1S1ZxvAo8hJopJOfPd2UUixv3v6e3EZ7Qm4HwMc2kdyKSLWOQ8JbUZP6c-j15EZ4RCQD2k6sTDVExo8wQQNktwf1mhXKQ=w2400',
}
const kitekatWet = {
	name: 'kitekat Wet',
	recommendations: [
		{
			weight: 3,
			ideal: 2.5,
			overweight: 2,
		},
		{
			weight: 4,
			ideal: 3,
			overweight: 2.5,
		},
		{
			weight: 5,
			ideal: 3.5,
			overweight: 3,
		},
	],
	type: 'wet',
	image:
		'https://lh3.googleusercontent.com/HH41WS_RTGRLUPAQ1HhC43A0YZedqGUPnElxw1L-7a_cEVO0QRH0kaD8WFU9VCAWv6YMptfgsOzfQLyRt4nNvdnQg4lyk6tGEOv1graVCeYmLNtmY9hBA27AclgNQ38q5OfZeGjS-QE=w2400',
}
// FIXME add more brands
// FIXME add colors for brands
// TODO kg / lbs
const dryFood = [
	royalCaninCare,
	royalCaninSterilised,
	test_1,
	test_2,
	test_3,
	test_4,
	test_5,
]
const wetFood = [shebaBig, shebaSelection, kitekatWet]

async function addData(db, collection, data) {
	console.log('data added to database: ', data)
	await db.collection(collection).insertMany(data)
}

async function dropCollection(db, collection) {
	await db.collection(collection).drop()
}
