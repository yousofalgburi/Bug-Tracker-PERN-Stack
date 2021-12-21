const axios = require('axios')

const baseURL = process.env.NODE_ENV === 'PRODUCTION' ? '/api/' : 'http://localhost:5000'

module.exports = axios.create( { baseURL })