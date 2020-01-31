const fetch = require('node-fetch')

const
    endpoint = 'http://localhost:8086',
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoyMDAwMDAwMDAwfQ.IFKmv6FS8fubRxCcsAdhp9Rk9cSN88zqQ6mSCyIeGPs',
    database = 'metrics',
    now = ~~(new Date().valueOf() / 1000),
    period = 60 * 60 * 2,
    interval = 10,
    start = now - period

const data = [...new Array(period / interval)]
    .map((_, i) => [
        `network.consumed dataIn.bytes=${~~(Math.random() * 500000)},dataOut.bytes=${~~(Math.random() * 1000000)} ${(start + i * interval)}`,
        `machines machines.count=${~~(Math.random() * 3 + 1)} ${start + i * interval}`
    ])
    .flat()
    .concat([
      `network.total dataIn.bytes=${1.21 * 1024*1024*1024},dataOut.bytes=${1.21 * 1024*1024*1024} ${now}`
    ])
    .join('\n')

console.log('Sending data points...')
fetch(`${endpoint}/write?db=${database}&precision=s`, {
        method: 'post',
        headers: {
          "Content-type": "text/plain; charset=UTF-8",
          "Authorization": `Bearer ${token}`
        },
        body: data
      })
      .then(console.log)