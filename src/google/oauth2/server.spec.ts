import { startServer } from "./server"

describe("Server", () => {
  it("should create a server and after a request is made, close the server", async () => {
    const promise = startServer(8080, "code")
    await fetch("http://127.0.0.1:8080?code=123")

    expect(promise).resolves.toBe("123")
  })
})
