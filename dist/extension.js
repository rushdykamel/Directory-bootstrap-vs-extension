/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPaths = void 0;
const path_1 = __webpack_require__(4);
function getPaths(fullText) {
    const lines = fullText.split(/\r\n|\r|\n/);
    let results = [];
    lines.forEach((line) => {
        const fileName = (0, path_1.basename)(line);
        let isFile = false;
        if (fileName.includes('.') && !line.endsWith('/')) {
            isFile = true;
            const dirName = (0, path_1.dirname)(line);
            if (dirName && dirName !== '.')
                results.push({ type: 'folder', path: dirName });
        }
        if (line)
            results.push({ type: isFile ? 'file' : 'folder', path: line });
    });
    return results;
}
exports.getPaths = getPaths;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("path");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const fs_1 = __webpack_require__(1);
const vscode = __webpack_require__(2);
const fileUtils_1 = __webpack_require__(3);
function activate(context) {
    const createFolderCommand = vscode.commands.registerCommand('directoryBootstrap.generate', () => {
        let workSpaceFolder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0] : null;
        if (workSpaceFolder) {
            let rootFolder = workSpaceFolder.uri.fsPath;
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const selection = editor.selection;
                const selectedText = editor.document.getText(selection);
                if (!selectedText) {
                    vscode.window.showInformationMessage('No text selected!');
                }
                else {
                    const results = (0, fileUtils_1.getPaths)(selectedText);
                    results.forEach((p) => {
                        const fullPath = `${rootFolder}/${p.path}`;
                        if (!(0, fs_1.existsSync)(fullPath)) {
                            if (p.type === 'file') {
                                (0, fs_1.writeFileSync)(fullPath, '');
                            }
                            else {
                                (0, fs_1.mkdirSync)(fullPath, { recursive: true });
                            }
                            vscode.window.showInformationMessage(`'${p.path}' has been created successfully`);
                        }
                        else {
                            vscode.window.showInformationMessage(`'${p.path}' already exists..`);
                        }
                    });
                }
            }
            else {
                vscode.window.showInformationMessage('No active editor');
            }
        }
    });
    context.subscriptions.push(createFolderCommand);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map