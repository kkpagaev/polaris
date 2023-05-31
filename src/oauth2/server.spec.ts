import { getGoogleOAuth2URL } from "./server"

describe("Server", () => {
  describe("getGoogleOAuth2URL", () => {
    it("should return a valid URL", () => {
      const url = getGoogleOAuth2URL({
        clientId: "foo",
        redirectUri: "bar",
      })

      expect(url).toBe(
        "https://accounts.google.com/o/oauth2/auth?client_id=foo&redirect_uri=bar&response_type=code&access_type=offline&prompt=consent&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar",
      )
    })
  })
})
