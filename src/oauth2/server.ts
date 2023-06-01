import { createServer } from "http"
import stoppable from "stoppable"

// This is the function that starts the server
// and returns the value of the query parameter
// after one request server is stopped
export async function startServer(port: number, param: string) {
  return new Promise<string>((resolve) => {
    const server = stoppable(createServer())

    server.on("request", (req, res) => {
      const getParam = new URL(
        req.url,
        "http://localhost:8080",
      ).searchParams.get(param)

      res.end(JSON.stringify({ message: "Hello, Vlad!" }))
      server.stop()
      resolve(getParam)
    })

    server.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
}
