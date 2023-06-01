export class GoogleOAuth {
  constructor(
    private clientId: string,
    private clientSecret: string,
    private redirectUri: string,
  ) {}

  getAuthURL() {
    const params = [
      `client_id=${this.clientId}`,
      `redirect_uri=${this.redirectUri}`,
      "response_type=code",
      "access_type=offline&prompt=consent",
      "scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar",
    ]

    return "https://accounts.google.com/o/oauth2/auth?" + params.join("&")
  }

  async exchangeCodeForToken(code: string) {
    const res = await fetch("https://accounts.google.com/o/oauth2/token", {
      method: "POST",
      body: JSON.stringify({
        code,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUri,
        grant_type: "authorization_code",
      }),
    })

    return res.json()
  }
}
