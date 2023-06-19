import EventEmitter from "events"
import { Readable } from "stream"
import { Editor, EditorType, createTmpFile } from "./editor"
import * as child_process from "child_process"
import { writeFileSync } from "fs"

const mockChildProcess = (): child_process.ChildProcess => {
  const proc = new EventEmitter() as child_process.ChildProcess

  proc.stdout = new EventEmitter() as Readable
  proc.stderr = new EventEmitter() as Readable

  return proc
}

jest.mock("child_process")

describe("Editor", () => {
  let editor: Editor
  let filepath: string

  beforeEach(() => {
    filepath = createTmpFile("foo")
    editor = new Editor(EditorType.NVIM, filepath)
  })

  it("should be defined", async () => {
    expect(editor).toBeDefined()
  })

  it("should update body", async () => {
    const process = mockChildProcess()

    jest.spyOn(child_process, "spawn").mockReturnValueOnce(process)

    const updatedBody = editor.edit()

    writeFileSync(filepath, "new file content")

    process.emit("exit")

    expect(updatedBody).resolves.toEqual("new file content")
    expect(editor.getBody()).toEqual("new file content")
  })
})
