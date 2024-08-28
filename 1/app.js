const {
  createServer,
  request
} = require('node:http');

const main = async () => {
  const server = createServer((request, response) => {
    response.writeHead(200, {
      "Content-Type": "text/html"
    })
    response.write("Hello Web Application!")
    response.end()
  })

  server.listen(3000, "127.0.0.1", () => {
    console.log("you are in LocalHost on port: 3000")
  })
}


main().catch(console.error)