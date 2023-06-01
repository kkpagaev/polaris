import { createServer } from "http"
import stoppable from "stoppable"

// res = Crest.post(config.token_uri, {
//   "code"          => code,
//   "client_id"     => config.client_id,
//   "client_secret" => config.client_secret,
//   "redirect_uri"  => config.redirect_uri,
//   "grant_type"    => "authorization_code",
// }, json: true)
// token_uri:
// https://accounts.google.com/o/oauth2/auth

export async function startServer() {
  return new Promise<void>((resolve) => {
    const server = stoppable(createServer())

    server.on("request", (_, res) => {
      res.end(JSON.stringify({ message: "Hello, Vlad!" }))
      server.stop()
      resolve()
    })

    const port = 8080
    server.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
}

export interface GoogleAuthConfig {
  clientId: string
  redirectUri: string
}

export function getGoogleOAuth2URL({
  clientId,
  redirectUri,
}: GoogleAuthConfig) {
  const params = [
    `client_id=${clientId}`,
    `redirect_uri=${redirectUri}`,
    "response_type=code",
    "access_type=offline&prompt=consent",
    "scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar",
  ]

  return "https://accounts.google.com/o/oauth2/auth?" + params.join("&")
}
