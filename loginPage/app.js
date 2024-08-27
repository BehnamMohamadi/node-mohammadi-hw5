const {
  createServer
} = require("node:http")
const {
  readFile
} = require("node:fs/promises")
const querystring = require('querystring');

const main = async () => {

  let usersData = await readFile("./usersLoginData.json", "utf-8")
  usersData = JSON.parse(usersData)
  console.log(usersData)
  const loginHTMLFile = await readFile("./index.html")
  const loginCSSFile = await readFile("./style.css")

  const server = createServer((request, response) => {

    const pathName = request.url
    const method = request.method
    
    if (pathName === "/login" && method === "GET") {

      response.writeHead(200, {
        "Content-Type": "text/html"
      })

      response.write(loginHTMLFile)
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
          response.writeHead(200, {
            'Content-Type': 'text/html'
          });
          response.end('Login successful!');
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
      response.write("Home")
      response.end()
    }
  })




  server.listen(3001, "127.0.0.1", () => {
    console.info("you are in localHost");
  })
}

main().catch(console.error)