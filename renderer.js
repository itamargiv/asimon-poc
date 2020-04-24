// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// Imports
const os = require('os');
const path = require("path");
const fs = require("fs");
const git = require('isomorphic-git');
const http = require("isomorphic-git/http/node");
const JSONEditor = require('jsoneditor');

// Helpers
// Save file
const saveFile = async (editor, filePath) => {
  const updatedJson = JSON.stringify(editor.get(), null, 2);

  fs.writeFileSync(filePath, updatedJson);
  const hash = await git.commit({
    fs,
    dir: path.dirname(filePath),
    author: {
      name: 'Mr. Test',
      email: 'mrtest@example.com',
    },
    message: `Asimon changes from ${new Date().toISOString()}`
  })
  console.log(`written ${hash}`);
}

// Load file
const loadFile = (editor, filePath) => {
  data = fs.readFileSync(filePath);
  
  editor.set(JSON.parse(data))
  console.log("loaded")
}

// Publish file: doesn't work yet - authentication might be an issue with 2FA on github
const publishFile = async (filePath) => {
  const pushRes = await git.push({
    fs,
    http,
    dir: path.dirname(filePath),
    remote: 'origin'
  })

  console.log(`published ${pushRes}`)
}

// Some options
// probably this has to be replaced with a user provided path or
const filePath = path.resolve(os.homedir(), path.join('.asimon', 'token-editor-poc', 'data', 'test.json'));
// remote URL: obvs this should be requested from the user
const gitRemoteURL = 'https://github.com/itamargiv/test-asimon-poc.git'



// UI
// Create the editor
const container = document.getElementById("jsoneditor")

const options = {
  mode: 'tree'
}
const editor = new JSONEditor(container, options)

loadFile(editor, filePath);


// Events
// Save
document.getElementById('json-editor-save').addEventListener('click', async (event) => {
  event.target.disabled = true;
  await saveFile(editor, filePath);
  event.target.disabled = false;
});

// Load
document.getElementById('json-editor-open').addEventListener('click', () => loadFile(editor, filePath));

// Publish
document.getElementById('json-editor-publish').addEventListener('click', () => publishFile(filePath));
