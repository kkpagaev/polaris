import { Config, getConfig, setConfig } from "./config"
import * as fs from "fs"

const dir = "./.polaris"

describe("config", () => {
  beforeEach(() => {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true })
    }
  })
  const tokens = {
    expires_in: 1000,
    scope: "scope",
    id_token: "id_token",
    token_type: "token_type",
    created_at: new Date(2023, 1, 1),
    access_token: "access_token",
    refresh_token: "refresh_token",
  }
  it("should return config", () => {
    expect(getConfig(dir)).toEqual({})
  })

  it("should set config", () => {
    const config: Config = {
      tokens,
    }
    expect(setConfig(dir, config)).toEqual(config)
  })

  it("should set config and get config", () => {
    const config: Config = {
      tokens,
    }
    setConfig(dir, config)
    expect(getConfig(dir)).toEqual(config)
  })
})
