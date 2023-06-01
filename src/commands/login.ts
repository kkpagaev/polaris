import { exec } from "child_process"
import { GoogleOAuth } from "../oauth2/google"
import { startServer } from "../oauth2/server"

interface LoginOptions {
  port: number
  clientId?: string
  clientSecret?: string
}
export const login = async ({ port, clientId, clientSecret }: LoginOptions) => {
  if (clientSecret === undefined) {
    throw new Error("client secret is required")
  }
  if (clientId === undefined) {
    throw new Error("client id is required")
  }
  const google = new GoogleOAuth(
    clientId,
    clientSecret,
    `http://localhost:${port}/`,
  )

  const url = google.getAuthURL()

  exec(`$BROWSER "${url}"`)

  console.log(`Starting server on port ${port}`)
  const code = await startServer(port, "code")

  const tokens = await google.exchangeCodeForToken(code)
  console.log("server stopped")
  console.log("code", code)
  console.log("tokens", tokens)
}
