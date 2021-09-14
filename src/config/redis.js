require('dotenv').config()
const redis = require('redis')

const client = redis.createClient({

})

client.on('connect', () => {
  console.log('Connected to redis instance!')
})

module.exports = client
