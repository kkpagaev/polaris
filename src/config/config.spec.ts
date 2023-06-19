import * as fs from "fs"
import { Config, GoogleOAuth2Tokens } from "./config"

const dir = "./.polaris"

describe("config", () => {
  beforeEach(() => {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true })
    }
  })
  const tokens: GoogleOAuth2Tokens = {
    expires_in: 1000,
    scope: "scope",
    id_token: "id_token",
    token_type: "token_type",
    created_at: new Date(2023, 1, 1),
    access_token: "access_token",
    refresh_token: "refresh_token",
  }
  it("should return config", () => {
    const config = Config.get(dir)
    expect(config.data).toEqual({})
  })

  it("should set config", () => {
    const config = Config.get(dir)
    config.setTokens(tokens)
    expect(config.data).toEqual({
      tokens: tokens,
    })
  })

  it("should set config and get config", () => {
    const config = Config.get(dir)

    config.setTokens(tokens).save()

    expect(Config.get(dir).data).toEqual({
      tokens: tokens,
    })
  })
})
