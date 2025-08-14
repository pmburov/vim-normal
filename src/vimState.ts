import * as vscode from "vscode"
import { getConfig, MarksConfig } from "./config"

export class VimState {
  static statusBar: vscode.StatusBarItem
  static listenForInput: boolean
  static typeHandler: vscode.Disposable | null = null
  static config: MarksConfig

  static init(context: vscode.ExtensionContext) {
    this.listenForInput = false

    this.statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10)
    context.subscriptions.push(this.statusBar)

    vscode.commands.executeCommand("setContext", "vim-normal.mode", "")

    const config = vscode.workspace.getConfiguration("vim-normal")
    this.config = getConfig(config)
  }

  static updateConfig(config: vscode.WorkspaceConfiguration) {
    this.config = getConfig(config)
  }

  static regTypeHandler() {
    this.typeHandler = vscode.commands.registerCommand("type", (text) => {
      this.type(text.text)
    })
  }

  static add() {
    vscode.commands.executeCommand("setContext", "vim-normal.mode", "input")
    const editor = vscode.window.activeTextEditor
    if (editor) {
      editor.options.cursorStyle = vscode.TextEditorCursorStyle.Block
    }
    this.regTypeHandler()

    this.listenForInput = true

    if (this.config.showInputIndicator) {
      this.statusBar.text = "NORMAL"
      this.statusBar.show()
    }
  }

  static stop() {
    this.listenForInput = false
    this.statusBar.text = ""
    this.statusBar.hide()
    if (this.typeHandler) {
      this.typeHandler.dispose()
      this.typeHandler = null
    }
    vscode.commands.executeCommand("setContext", "vim-normal.mode", "")
    const editor = vscode.window.activeTextEditor
    if (editor) {
      editor.options.cursorStyle = vscode.TextEditorCursorStyle.Line
    }
  }

  static async type(text: string) {
    if (this.listenForInput) {
      this.stop()
    } else {
      vscode.commands.executeCommand("default:type", { text: text })
    }
  }
}
