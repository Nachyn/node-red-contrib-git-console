const { exec } = require("child_process");
const bodyParser = require("body-parser");

module.exports = function (RED) {
  function GitConsoleNode(config) {
    RED.nodes.createNode(this, config);
  }

  RED.httpAdmin.use(bodyParser.json());
  RED.httpAdmin.post("/git-console/command", function (req, res) {
    const command = req.body.command;
    const execPath = req.body.projectDir;

    if (!command) {
      return res.status(400).json({
        error: true,
        output: "No command provided",
        command: ""
      });
    }

    if (!execPath) {
      return res.json({
        error: true,
        output: "No active project detected",
        command: command
      });
    }

    // Простейшая проверка безопасности
    // Команда должна начинаться с 'git '
    if (!command.trim().toLowerCase().startsWith("git ")) {
      return res.status(400).json({
        error: true,
        output: "Only git commands are allowed",
        command: command
      });
    }

    // Запрещаем опасные символы, чтобы исключить цепочки команд
    // Можно расширить список
    const forbiddenChars = ['&', ';', '|', '$', '`', '>', '<', '\\'];
    for (const ch of forbiddenChars) {
      if (command.includes(ch)) {
        return res.status(400).json({
          error: true,
          output: `Forbidden character detected: '${ch}'`,
          command: command
        });
      }
    }

    exec(command, { cwd: execPath }, (err, stdout, stderr) => {
      res.json({
        command: command,
        output: err ? stderr : stdout,
        error: !!err
      });
    });
  });

  try {
    RED.nodes.registerType("git-console", GitConsoleNode);
  } catch (err) {
    console.error(err);
  }
};
