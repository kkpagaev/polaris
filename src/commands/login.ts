import { exec } from "child_process"
import { GoogleOAuth } from "../oauth2/google"
import { startServer } from "../oauth2/server"

interface LoginOptions {
  port: number
  clientId?: string
  clientSecret?: string
}
export const login = async (options: LoginOptions) => {
  if (options.clientSecret === undefined) {
    throw new Error("client secret is required")
  }
  if (options.clientId === undefined) {
    throw new Error("client id is required")
  }
  const google = new GoogleOAuth(
    options.clientId,
    options.clientSecret,
    "http://localhost:8080/",
  )

  const url = google.getAuthURL()

  exec(`$BROWSER "${url}"`)

  console.log("Starting server on port 8080")
  const code = await startServer(8080, "code")

  const tokens = await google.exchangeCodeForToken(code)
  console.log("server stopped")
  console.log("code", code)
  console.log("tokens", tokens)
}
