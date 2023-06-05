import * as fs from "fs"

export interface GoogleOAuth2Tokens {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
  id_token: string
  created_at?: Date
}

export interface ConfigData {
  tokens?: GoogleOAuth2Tokens
}

export class Config {
  data: ConfigData
  configDir: string

  constructor(configDir: string, data: ConfigData) {
    this.configDir = configDir
    this.data = data
  }

  getTokens(): GoogleOAuth2Tokens | undefined {
    return this.data.tokens
  }

  setTokens(tokens: GoogleOAuth2Tokens) {
    this.data.tokens = tokens
    return this
  }

  static get(configDir: string): Config {
    return new Config(configDir, getConfig(configDir))
  }

  save() {
    if (!fs.existsSync(this.configDir)) {
      fs.mkdirSync(this.configDir)
    }
    const configPath = `${this.configDir}/config.json`
    fs.writeFileSync(configPath, JSON.stringify(this.data))

    return this.data
  }
}

// Default path ~./.polaris/config.json
const getConfig = (configDir: string): ConfigData => {
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir)
  }
  const configPath = `${configDir}/config.json`
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, "{}")
  }
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"))

  if (config.tokens) {
    config.tokens.created_at = new Date(config.tokens.created_at)
  }
  return config
}
