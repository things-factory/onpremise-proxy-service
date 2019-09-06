var mdns = require('mdns')
var browser
var servers = {}
process.on('bootstrap-module-middleware' as any, async app => {
  browser = mdns.createBrowser(mdns.tcp('tfserver'))

  browser.on('serviceUp', service => {
    servers[service.name] = service
    ;(global as any).onpremiseServers = [...Object.values(servers)]
  })
  browser.on('serviceDown', service => {
    delete servers[service.name]
    ;(global as any).onpremiseServers = [...Object.values(servers)]
  })

  browser.start()
})

process.on('exit' as any, code => {
  if (browser) {
    browser.stop()
    browser = null
  }
})
