const {
  createServer
} = require("node:http")
const {
  readFile,
  access,
  constants
} = require("node:fs/promises")
const {
  join
} = require(
  "node:path"
)
const querystring = require('querystring');

const main = async () => {
  let usersData = await readFile("./usersLoginData.json", "utf-8")
  usersData = JSON.parse(usersData)
  const loginHTMLFile = await readFile("./index.html")
  const loginCSSFile = await readFile("./style.css")
  const showUserHtml = await readFile(join(__dirname, "assets/index.html"), "utf-8")
  const showUserCss = await readFile(join(__dirname, "assets/style.css"), "utf-8")

  const server = createServer((request, response) => {

    const pathName = request.url
    const method = request.method

    if (pathName === "/login" && method === "GET") {
      response.writeHead(200, {
        "Content-Type": "text/html"
      })

      response.write(loginHTMLFile)
      response.end()

    } else if (pathName === "/style.css") {
      response.writeHead(200, {
        "Content-Type": "text/css"
      })

      response.write(showUserCss)
      response.end()
    } else if (pathName === "/login" && method === "POST") {

      let body = '';

      request.on('data', chunk => {
        body += chunk.toString();
      });

      request.on('end', () => {

        const parsedBody = querystring.parse(body);
        const username = parsedBody.username;
        const password = parsedBody.password;

        const user = usersData.find(u => u.username === username && u.password === password);

        if (user) {
          const userHtml = showUserHtml
            .replace('{%username%}', username)
            .replace('{%password%}', password);
          response.writeHead(200, {
            'Content-Type': 'text/html'
          });
          response.write(userHtml)
          response.end();
        } else {
          response.writeHead(400, {
            'Content-Type': 'text/html'
          });
          response.end('Username or password is invalid');
        }
      });
    } else if (pathName === "/css") {
      response.writeHead(200, {
        "Content-Type": "text/css"
      })

      response.write(loginCSSFile)
      response.end()
    } else {
      response.write("Not-Found")
      response.end()
    }
  })

  server.listen(3001, "127.0.0.1", () => {
    console.info("you are in localHost");
  })
}

main().catch(console.error)