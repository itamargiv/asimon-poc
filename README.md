# Asimon POC

This is a Proof of Concept for a Tokens File editor for system designers.

So far the POC can:

- Load a set file on disk (make sure to change the `filePath` variable to point to your file)
- Save to a set file on disk 
- Reload from changes on disk (th inappropriately named "open" button)
- Make a commit to a git repository (the git repository need to already exist in the path, so make sure to create it via the terminal)

Yet to come in order to complete this POC

- [ ] Rely on cloned remote repositories rather than local files:
    - [ ] Can clone a repository to a folder in the system
    - [ ] Can publish back to the remote

Beyond the POC, I'd like to have

- Revision history
- Multiple branch support
- Conflict resolution
- Support for Aliases
- Side by Side Editor + Preview

## To run this locally

- Grab a copy of Electron Fiddle: https://www.electronjs.org/fiddle
- Clone this repository
- Open this folder with electron fiddle
- Change the `filePath` variable in `renderer.js`

