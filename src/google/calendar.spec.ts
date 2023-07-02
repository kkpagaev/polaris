import { getCalendars, listEvents } from "./calendar"

describe("Google Calendar", () => {
  it.todo("should create calendar")
  it.todo("should throw errors")

  describe("Calendar list", () => {
    // return error
    it("should return list of calendars", async () => {
      const token = "real token XD"
      const res = getCalendars(token)

      await expect(res).resolves.toBeDefined()
    })
  })

  describe("List events", () => {
    it("should return list of events", async () => {
      const token = "real token XD"
      const calendarId = "real calendar token"
      const res = listEvents(calendarId, token)

      await expect(res).resolves.toBeDefined()
    })
  })
})
