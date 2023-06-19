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
      // on windows errors on "code"
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
  constructor(private type: EditorType, private body: string) {}

  async edit() {
    return new Promise((res, rej) => {
      const tmpfile = this.openEditorInTmpFile()

      /*
       * Basicaly this opens editor
       * some editors like vscode will run in bg
       * so we must pass a flag
       * and to ope TUI(vim) application we must inherit STDIO
       */
      const [cmd, params] = getEditorParams(tmpfile.name, this.type)
      const child = spawn(cmd, params, {
        stdio: "inherit",
      })

      // after close file in edditor updates this.body
      child.on("exit", () => {
        const buffer = readFileSync(tmpfile.name)

        this.body = buffer.toString()

        res(this.body)
      })

      // unexpected behavior
      child.on("error", (err) => {
        rej(err)
      })
    })
  }

  /*
   * Creates tmp file and puts body in it
   */
  private openEditorInTmpFile() {
    const file = tmp.fileSync()

    writeFileSync(file.name, this.body)

    return file
  }
}
