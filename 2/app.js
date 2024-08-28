const {
  createServer,
  request
} = require('node:http');

const {
  readFile,
  access,
  constants
} = require('node:fs/promises');

const main = async () => {
  await access("./data.json", constants.F_OK)
  const data = await readFile("./data.json", "utf-8")

  const server = createServer((request, response) => {

    const url = request.url

    if (url === "/json") {
      response.writeHead(200, {
        "Content-Type": "application/json"
      })
      response.write(data)
      response.end()
    }
  })

  server.listen(3000, "127.0.0.1", () => {
    console.log("you are in LocalHost on port: 3000")
  })
}


main().catch(console.error)