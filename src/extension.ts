import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as vscode from 'vscode';
import { PathResult, getPaths } from './fileUtils';

export function activate(context: vscode.ExtensionContext) {
	const createFolderCommand = vscode.commands.registerCommand('directoryBootstrap.generate', () => {
		let workSpaceFolder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0] : null;
		if (workSpaceFolder) {
			let rootFolder: string = workSpaceFolder.uri.fsPath;
			const editor = vscode.window.activeTextEditor;
			
			if (editor) {
				const selection = editor.selection;
				const selectedText = editor.document.getText(selection);
				
				if (!selectedText) {
					vscode.window.showInformationMessage('No text selected!');
				} else {
					const results = getPaths(selectedText);
					results.forEach((p: PathResult) => {
						const fullPath = `${rootFolder}/${p.path}`;
						if (!existsSync(fullPath)) {
							if (p.type === 'file') {
								writeFileSync(fullPath, '');	
							} else {
								mkdirSync(fullPath, { recursive: true });
							}
							vscode.window.showInformationMessage(`'${p.path}' has been created successfully`);
						} else {
							vscode.window.showInformationMessage(`'${p.path}' already exists..`);
						}
					})
				}

			} else {
				vscode.window.showInformationMessage('No active editor');
			}
		}

	});

	context.subscriptions.push(createFolderCommand);
}



// This method is called when your extension is deactivated
export function deactivate() { }
