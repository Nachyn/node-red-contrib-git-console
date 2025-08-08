# Node-RED Git Console

A Node-RED plugin that adds a Git Console tab to the UI, allowing you to execute Git commands directly within your project's directory.

# Note
After switching commits using `git checkout`, refresh the page (F5) to let Node-RED compute the difference between the previously applied code and the Git data

## Features

- `Git Console` tab in Node-RED UI
- Execute Git commands in current project directory (`/data/projects/{current-project}`)
- Clear command history with one click
- Basic command security validation

## Installation
Install via the Palette Manager or from within your node-red directory:
```bash
npm install @nachyn/node-red-contrib-git-console
```

## Screenshots

![Screen1](https://raw.githubusercontent.com/Nachyn/node-red-contrib-git-console/master/img/1.jpg)