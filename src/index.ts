import { Command } from "commander"
import { login } from "./commands/login"

export function hello(str: string) {
  return `Hello ${str}`
}

export function main() {
  const program = new Command()

  program
    .name("string-util")
    .description("CLI to some JavaScript string utilities")
    .version("0.8.0")

  program.command("login").description("OAuth2 login to Google").action(login)

  program
    .command("split")
    .description("Split a string into substrings and display as an array")
    .argument("<string>", "string to split")
    .option("--first", "display just the first substring")
    .option("-s, --separator <char>", "separator character", ",")
    .action((str, options) => {
      const limit = options.first ? 1 : undefined
      console.log(str.split(options.separator, limit))
    })

  program.parse()
}
if (process.env.NODE_ENV !== "test") {
  main()
}
