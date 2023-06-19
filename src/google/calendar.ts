// Calendar
//
// accessRole: 'owner'
// backgroundColor: '#9fe1e7'
// colorId: '14'
// conferenceProperties: {allowedConferenceSolutionTypes: Array(1)}
// defaultReminders: (1) [{…}]
// etag: '""'
// foregroundColor: '#000000'
// id: 'foo@gmail.com'
// kind: 'calendar#calendarListEntry'
// notificationSettings: {notifications: Array(4)}
// primary: true
// summary: 'Holidays in Ukraine'
// timeZone: 'Europe/Kiev'
//
// Event
// created: '2023-05-24T06:41:58.000Z'
// creator: {email: 'kapagaev111@gmail.com'}
// end: {dateTime: '2023-05-26T07:30:00Z', timeZone: 'Europe/Kiev'}
// etag: '"3369821037270000"'
// eventType: 'default'
// htmlLink: 'https://www.google.com/calendar/event?eid=Y3F0N3QcmtsazQgcWJqM2pnZGd1cTh0MTRib3BiN2pz
// iCalUID: 'qt7t3lk4@google.com'
// id: 't7t8rklk4'
// kind: 'calendar#event'
// organizer: {email: 'guq8t14bphkvfs@group.calendar.google.com', displayName: 'Org-Moon', self: true}
// reminders: {useDefault: true}
// sequence: 0
// start: {dateTime: '2023-05-26T07:30:00Z', timeZone: 'Europe/Kiev'}
// status: 'confirmed'
// summary: 'Work'
// updated: '2023-05-24T06:41:58.635Z'

interface GoogleCalendarListItem {
  // accessRole: 'owner'
  backgroundColor: string
  colorId: string
  foregroundColor: string
  id: string
  // notificationSettings: { notifications: Array(4) }
  primary: true
  // title
  summary: string
  timeZone: string
}

interface GoogleCalendarListResponce {
  items: GoogleCalendarListItem[]
}

export async function getCalendars(token: string) {
  const res = await fetch(
    "https://www.googleapis.com/calendar/v3/users/me/calendarList",
    {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    },
  )

  const json = await res.json()

  return json as GoogleCalendarListResponce
}

export async function createCalendar(token: string) {
  const res = await fetch("https://www.googleapis.com/calendar/v3/calendars", {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
    body: JSON.stringify({
      summary: "Polaris",
    }),
  })

  return res.json()
}

export async function listEvents(calendarId: string, token: string) {
  const start = new Date(2022, 7, 2)
  const end = new Date()
  const query = `timeMax=${end.toISOString()}&timeMin=${start.toISOString()}`

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${query}`,
    {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    },
  )
  const json = await res.json()

  return json
}
