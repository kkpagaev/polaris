import { spawn } from "child_process"
import * as tmp from "tmp"
import { writeFileSync, readFileSync } from "fs"

export enum EditorType {
  VSCODE,
  NVIM,
  SUMBLIME,
  HELIX,
}

function isWindows() {
  return process.platform === "win32"
}

function getEditorParams(
  filePath: string,
  editor: EditorType,
): [string, Array<string>] {
  switch (editor) {
    case EditorType.VSCODE:
      if (isWindows()) {
        return ["code.cmd", [filePath, "-w"]]
      }
      return ["code", [filePath, "-w"]]
    case EditorType.NVIM:
      return ["nvim", [filePath]]
    case EditorType.SUMBLIME:
      return ["subl", [filePath, "-w"]]
    default:
      throw new Error("Editor not found")
  }
}

export class Editor {
  constructor(private type: EditorType) {}

  async editFile(content: string) {
    return new Promise((res, rej) => {
      const tmpfile = this.createTmpFile(content)

      /**
       * Basicaly this opens editor
       * some editors like vscode will run in bg
       * so we must pass a flag
       * and to ope TUI(vim) application we must inherit STDIO
       */
      const [cmd, params] = getEditorParams(tmpfile.name, this.type)
      const child = spawn(cmd, params, {
        stdio: "inherit",
      })

      child.on("exit", () => {
        // after saving a file we pass its content back
        const buffer = readFileSync(tmpfile.name)

        res(buffer.toString())
      })

      child.on("error", (err) => {
        rej(err)
      })
    })
  }

  private createTmpFile(content: string) {
    const file = tmp.fileSync()

    writeFileSync(file.name, content)

    return file
  }
}
