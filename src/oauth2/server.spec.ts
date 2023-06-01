import { getGoogleOAuth2URL } from "./server"

describe("Server", () => {
  describe("getGoogleOAuth2URL", () => {
    it("should return a valid URL", () => {
      const url = getGoogleOAuth2URL({
        clientId:
          "647260528726-i4ajbc3sf2sav1va79qadhbrbn71gc5i.apps.googleusercontent.com",
        redirectUri: "http://localhost:8080/",
      })

      expect(url).toBe(
        "https://accounts.google.com/o/oauth2/auth?client_id=647260528726-i4ajbc3sf2sav1va79qadhbrbn71gc5i.apps.googleusercontent.com&redirect_uri=http://localhost:8080/&response_type=code&access_type=offline&prompt=consent&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar",
      )
    })
  })
})
