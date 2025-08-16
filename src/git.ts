import * as vscode from "vscode"
import type { GitExtension, Repository } from './types/git';

function getRepoAndCurrentFile(): [Repository | null, vscode.Uri | null] {
  const extension = vscode.extensions.getExtension<GitExtension>('vscode.git');

  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('No editor is open');
    return [null, null]
  }

  const uri = editor.document.uri;
  const repo = extension?.exports.getAPI(1).getRepository(uri)

  if (!repo) {
    vscode.window.showErrorMessage('No repository found for current file');
    return [null, null]
  }

  return [repo, uri];
}

export async function stageCurrentFile() {
  const [repo, uri] = getRepoAndCurrentFile();

  if (repo && uri) {
    await repo.add([uri.fsPath]);
  }
}

export async function unstageCurrentFile() {
  const [repo, uri] = getRepoAndCurrentFile();

  if (repo && uri) {
    await repo.revert([uri.fsPath]);
  }
}
