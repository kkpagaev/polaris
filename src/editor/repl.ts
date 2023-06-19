import { Editor, EditorType } from "./editor"

const ed = new Editor(EditorType.VSCODE)

ed.editFile("test").then((content) => {
  console.log(content)
})
