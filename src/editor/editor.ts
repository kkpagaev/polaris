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

/*
 * Creates tmp file with initial body
 */
function createTmpFile(body: string): tmp.FileResult {
  const file = tmp.fileSync()

  writeFileSync(file.name, body)

  return file
}

export class Editor {
  private tmpfile: tmp.FileResult

  constructor(private type: EditorType, body: string) {
    this.tmpfile = createTmpFile(body)
  }

  async edit(): Promise<string> {
    return new Promise<string>((res, rej) => {
      /*
       * Basicaly this opens editor
       * some editors like vscode will run in bg
       * so we must pass a flag
       * and to ope TUI(vim) application we must inherit STDIO
       */
      const [cmd, params] = getEditorParams(this.tmpfile.name, this.type)
      const child = spawn(cmd, params, {
        stdio: "inherit",
      })

      // after close file in edditor updates this.body
      child.on("exit", () => {
        res(this.getBody())
      })

      // unexpected behavior
      child.on("error", (err) => {
        rej(err)
      })
    })
  }

  getBody() {
    const buffer = readFileSync(this.tmpfile.name)

    return buffer.toString()
  }
}
