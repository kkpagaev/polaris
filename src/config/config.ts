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

export interface Config {
  tokens?: GoogleOAuth2Tokens
}

// Default path ~./.polaris/config.json
export const getConfig = (configDir: string): Config => {
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

export const setConfig = (configDir: string, config: Config) => {
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir)
  }
  const configPath = `${configDir}/config.json`
  fs.writeFileSync(configPath, JSON.stringify(config))

  return config
}
