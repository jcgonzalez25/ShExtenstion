// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function validateData(data){
	let MINIMUM_SHORTHAND_SIZE = 23;

	return new Promise((resolve,reject)=>{
		if(data.length <= MINIMUM_SHORTHAND_SIZE){
			reject("SHORTHAND:ERROR:Minimum Size Failure");
		}
		resolve(data);
	})
}

function activate(context) {
	var Editor = vscode.window.activeTextEditor;
	let Window = vscode.window;
	let CurrentSelection;
	Window.onDidChangeTextEditorSelection(
		({selections})=>{CurrentSelection=selections[0]}
	);

	let disposable = vscode.commands.registerCommand('extension.showShorthand', async function () {
		let data;
		if(typeof CurrentSelection === 'undefined'){
			//ERROR: If highlighted before activate is triggered then will result in a error
			Window.showErrorMessage("Something Went Wrong, Highlight and try again");
		}
		data = Editor.document.getText(CurrentSelection);
		try{
			data = await validateData(data);
		}catch(error){
			Window.showErrorMessage(error)
			console.error(error);
		}
		console.log("HIGHLIGHTED DATA:" + data);
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
