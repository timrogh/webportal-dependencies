const fetch = require('node-fetch')

const
    endpoint = 'http://localhost:8086',
    token = 'WT9qju4ImswjRug6bUHa2CvgCuUDxJsBwzjM770kgyf9I8fdAAT_bkv6Y0ByePjRRBC12kw0sXc6t0DayETRyg==',
    bucket = 'timr',
    orgId = 'timr@hadean.com',
    now = ~~(new Date().valueOf() / 1000),
    period = 60 * 60 * 2,
    interval = 10,
    start = now - period

const data = [...new Array(period / interval)]
    .map((_, i) => [
        `network.consumed dataIn.bytes=${~~(Math.random() * 500000)},dataOut.bytes=${~~(Math.random() * 1000000)} ${start + i * interval}`,
        `machines machines.count=${~~(Math.random() * 3 + 1)} ${start + i * interval}`
    ])
    .flat()
    .join('\n')

console.log('Sending data points...')
fetch(`${endpoint}/api/v2/write?org=${orgId}&bucket=${bucket}&precision=s`, {
        method: 'post',
        headers: {
          "Content-type": "text/plain; charset=UTF-8",
          "Authorization": `Token ${token}`
        },
        body: data
      })
      .then(console.log)