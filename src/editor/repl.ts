import { Editor, EditorType } from "./editor"

const ed = new Editor(EditorType.VSCODE, "test")

ed.edit().then((content) => {
  console.log(content)
})
