import { exec } from "child_process"
import { startServer } from "../oauth2/server"

export const login = async () => {
  exec("$BROWSER google.com")
  console.log("starting server")
  await startServer()
  console.log("server stopped")
}
