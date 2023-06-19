export enum TokenType {
  Illegal,
  Eof,
  Ident = "IDENT",
  Int = "INT",
  Dash = "-",
  Sharp = "#",
}

export type Token<Type extends TokenType, Literal extends string> = {
  type: Type
  literal: Literal
}

export const createToken = <Type extends TokenType, Literal extends string>(
  type: Type,
  literal: Literal,
): Token<Type, Literal> => ({ type, literal })

export class Tokenizer {
  private position: number = 0
  private ch: string
  private input: string

  constructor(input: string) {
    this.input = input

    this.readChar()
  }

  private readChar() {
    this.ch = this.input[this.position]
    this.position++
  }

  nextToken(): Token<TokenType, string> {
    let token: Token<TokenType, string>

    switch (this.ch) {
      case "-":
        token = createToken(TokenType.Dash, this.ch)
        break
      case "#":
        token = createToken(TokenType.Sharp, this.ch)
        break
      case "":
        token = createToken(TokenType.Eof, "")
        break
      default:
        if (this.isLetter(this.ch)) {
          const literal = this.readIdentifier()
          return createToken(TokenType.Ident, literal)
        } else if (this.isDigit(this.ch)) {
          const literal = this.readNumber()
          return createToken(TokenType.Int, literal)
        } else {
          token = createToken(TokenType.Illegal, this.ch)
        }
    }

    this.readChar()

    return token
  }
}
