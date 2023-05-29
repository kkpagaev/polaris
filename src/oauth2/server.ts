import { createServer } from "http"
import stoppable from "stoppable"

export function startServer() {
  const server = stoppable(createServer())

  server.on("request", (_, res) => {
    res.end(JSON.stringify({ message: "Hello, Vlad!" }))
    server.stop()
  })

  const port = 3000
  server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })

  console.log("foo bar")
}
