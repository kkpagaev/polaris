export const isDigit = (char: string): boolean => {
  return /[0-9]/.test(char)
}

export const isLetter = (char: string): boolean => {
  return /[a-zA-Z]/.test(char)
}

export const isWhiteSpace = (char: string): boolean => {
  return char === " "
}
