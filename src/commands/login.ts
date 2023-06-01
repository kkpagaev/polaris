import { exec } from "child_process"
import { getGoogleOAuth2URL, startServer } from "../oauth2/server"

export const login = async () => {
  const url = getGoogleOAuth2URL({
    clientId:
      "647260528726-i4ajbc3sf2sav1va79qadhbrbn71gc5i.apps.googleusercontent.com",
    redirectUri: "http://localhost:8080/",
  })
  exec(`$BROWSER "${url}"`)

  console.log("starting server")
  await startServer()
  console.log("server stopped")
}
