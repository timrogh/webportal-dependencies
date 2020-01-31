const fetch = require('node-fetch')

console.log('Creating admin and database...')
fetch(`http://localhost:8086/query?q=CREATE USER admin WITH PASSWORD 'admin' WITH ALL PRIVILEGES`, { method: 'post' })
  .then(() =>
    fetch(`http://admin:admin@localhost:8086/query?q=CREATE DATABASE "metrics"`, { method: 'post' }))
  .then(() => console.log("Done"))