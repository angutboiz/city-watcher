import 'dotenv/config'

export default {
    expo: {
        name: 'CityWatcher',
        slug: 'city-watcher',
        extra: {
            API_ENDPOINT: process.env.API_ENDPOINT,
        },
    },
}
