import * as vscode from "vscode"
import { VimState } from "./vimState"

export function activate(context: vscode.ExtensionContext) {
  VimState.init(context)

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.start", () => {
    VimState.add()
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.stop", () => {
    VimState.stop()
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.mark-add", () => {
    VimState.stop()
    vscode.commands.executeCommand("vim-marks.add")
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.mark-go", () => {
    VimState.stop()
    vscode.commands.executeCommand("vim-marks.go")
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.change-inside", () => {
    VimState.stop()
    vscode.commands.executeCommand("vim-change.inside")
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.change-around", () => {
    VimState.stop()
    vscode.commands.executeCommand("vim-change.around")
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.select-inside", () => {
    VimState.stop()
    vscode.commands.executeCommand("vim-change.select-inside")
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.select-around", () => {
    VimState.stop()
    vscode.commands.executeCommand("vim-change.select-around")
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.center-screen", () => {
    VimState.stop()
    vscode.commands.executeCommand("vim-marks.center")
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.move-up", () => {
    vscode.commands.executeCommand("cursorMove", {
      "to": "prevBlankLine",
      "by": "wrappedLine"
    })
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.move-down", () => {
    vscode.commands.executeCommand("cursorMove", {
      "to": "nextBlankLine",
      "by": "wrappedLine"
    })
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.file-start", () => {
    vscode.commands.executeCommand("cursorTop")
    VimState.stop()
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.file-end", () => {
    vscode.commands.executeCommand("cursorBottom")
    VimState.stop()
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.split-vertical", () => {
    vscode.commands.executeCommand("workbench.action.splitEditor")
    VimState.stop()
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.close", () => {
    vscode.commands.executeCommand("workbench.action.closeActiveEditor")
    VimState.stop()
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.right-panel", () => {
    vscode.commands.executeCommand("workbench.action.moveActiveEditorGroupRight")
    VimState.stop()
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.left-panel", () => {
    vscode.commands.executeCommand("workbench.action.moveActiveEditorGroupLeft")
    VimState.stop()
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.flash-go", () => {
    VimState.stop()
    vscode.commands.executeCommand("vim-flash.go")
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.flash-up", () => {
    VimState.stop()
    vscode.commands.executeCommand("vim-flash.up")
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.flash-down", () => {
    VimState.stop()
    vscode.commands.executeCommand("vim-flash.down")
  }))

  context.subscriptions.push(vscode.commands.registerCommand("vim-normal.flash-select", () => {
    VimState.stop()
    vscode.commands.executeCommand("vim-flash.select")
  }))

  const configChangeListener = vscode.workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration('vim-normal')) {
      const config = vscode.workspace.getConfiguration("vim-normal")
      VimState.updateConfig(config)
    }
  })
  context.subscriptions.push(configChangeListener)

  return {
    VimState,
  }
}

export { VimState }

export function deactivate() { }
