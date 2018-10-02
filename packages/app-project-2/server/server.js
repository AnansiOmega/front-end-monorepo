const { createServer } = require('http')
const next = require('next')
const pathMatch = require('path-match')
const { parse } = require('url')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const route = pathMatch()

const match = route('/projects/:owner/:slug/:subroute*')

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const { pathname, query } = parse(req.url, true)

      // assigning `query` into the params means that we still
      // get the query string passed to our application
      // i.e. /blog/foo?show-comments=true
      function renderPage (path) {
        return app.render(req, res, path, Object.assign(params, query))
      }

      const params = match(pathname)

      if (params === false) {
        if (dev && req.url === '/') {
          return renderPage('/Index')
        }

        handle(req, res)
        return
      }

      if (!params.subroute) {
        return renderPage('/Home')
      }

      if (params.subroute.includes('classify')) {
        return renderPage('/Classify')
      }

      if (params.subroute.includes('about')) {
        return renderPage('/About')
      }
    })
    .listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })