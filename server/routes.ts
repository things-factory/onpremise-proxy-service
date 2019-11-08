import { servers } from './controllers/servers'

process.on('bootstrap-module-history-fallback' as any, (app, fallbackOption) => {
  fallbackOption.whiteList.push(`^\/(${['onpremise-servers'].join('|')})($|[/?#])`)
})

process.on('bootstrap-module-route' as any, (app, routes) => {
  routes.get('/onpremise-servers', async (context, next) => {
    context.body = {
      success: true,
      servers: servers()
    }
  })
})
