const {
  createServer,
} = require("node:http")
const {
  readFile,
  access
} = require('node:fs/promises');
const {
  error
} = require("node:console");

const main = async () => {

  Promise.all([await access("./index.html"), await access("./style.css")])

  const [htmlFile, cssFile, imageFile, usersData] = Promise.all([await readFile("./index.html", "utf-8"),
    await readFile("./style.css", "utf-8"), await readFile("./apple.png"),
    await readFile("./usersLoginData.json", "utf-8")
  ])

  const server = createServer((request, response) => {
    const pathName = request.url

    if (pathName === "/html") {
      response.writeHead(200, {
        "Content-Type": "text/html"
      })

      response.write(htmlFile)
      response.end()
    } else if (pathName === "/css") {
      response.writeHead(200, {
        "Content-Type": "text/css"
      })

      response.write(cssFile)
      response.end()
    } else if (pathName === "/about") {
      response.writeHead(200, {
        "Content-Type": "text/plain"
      })

      response.write("About Me")
      response.end()
    } else if (pathName === "/photo") {
      response.writeHead(200, {
        "Content-Type": "image/png "
      })

      response.write(imageFile)
      response.end()
    } else if (pathName === "/usersData") {
      response.writeHead(200, {
        "Content-Type": "application/json"
      })

      response.write(imageFile)
      response.end()
    } else {
      response.writeHead(404, {
        "Content-Type": "text/html"
      })

      response.write("Not-Found")
      response.end()
    }
  })

  server.listen(3000, "127.0.0.1", () => {
    console.log("you are in LocalHost on port: 3000")
  })
}

main().catch(console.error)