import { Editor, EditorType } from "./editor"

describe("Editor", () => {
  let editor: Editor

  beforeEach(() => {
    editor = new Editor(EditorType.NVIM, "foo")
  })

  it("should be defined", async () => {
    expect(editor).toBeDefined()
  })
})
