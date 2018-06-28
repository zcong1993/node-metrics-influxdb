const InfluxMetrics = require('..')

const options = {
  host: "localhost",
  port: 8086,
  protocol: "http",
  database: "app_metrics",
  tags: {
      app: "my-app",
      environment: "test"
  },
  callback(error) {
    if (error) {
        console.log("Sending data to InfluxDB failed: ", error);
    }
  }
}

const justify = (t, interval) => {
  const _t = new Date(t).getTime()
  const res = _t - _t % interval
  return res
}

const reporter = new InfluxMetrics.Reporter(options)

let i = 10

const g = new InfluxMetrics.Gauge()
reporter.addMetric('test.gauge', g)


reporter.cronStart('*/5 * * * * *', true, () => {
    g.set(Math.random() > 0.5 ? i++ : i--, justify(Date.now(), 5000), {})
})
