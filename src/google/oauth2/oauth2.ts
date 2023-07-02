// exchangeCodeForToken
// status: 200
//
// access_token: ''
// expires_in: 3599
// id_token: ''
// refresh_token: ''
// scope: ''
// token_type: 'Bearer'

export interface GoogleOAuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
}

export interface ExchangeCodeForTokenReponse {
  access_token: string
  expires_in: number
  id_token: string
  refresh_token: string

  scope: string
  // Bearer
  token_type: string
}

export class GoogleOAuth {
  constructor(private config: GoogleOAuthConfig) {}

  getAuthURL() {
    const params = [
      `client_id=${this.config.clientId}`,
      `redirect_uri=${this.config.redirectUri}`,
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
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        redirect_uri: this.config.redirectUri,
        grant_type: "authorization_code",
      }),
    })
    if (res.status !== 200) {
      throw new Error("Something gone wrong")
    }

    return (await res.json()) as ExchangeCodeForTokenReponse
  }
}
