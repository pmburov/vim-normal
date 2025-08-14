import * as vscode from "vscode"

export type MarksConfig = {
  showInputIndicator: boolean
}

export function getConfig(config: vscode.WorkspaceConfiguration): MarksConfig {
  return {
    showInputIndicator: config.get<boolean>('showInputIndicator', true),
  }
}
