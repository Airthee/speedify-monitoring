const { execSync } = require('child_process');

const runSpeedifyCommand = async (command, toJson) => {
  const buf = execSync(`speedify_cli ${command}`);
  const commandResult = buf.toString('utf-8');
  return toJson ? JSON.parse(commandResult) : commandResult;
}

module.exports = {
  async getState() {
    const commandResult = await runSpeedifyCommand('state', true);
    return commandResult.state;
  },
  async getSettings() {
    return runSpeedifyCommand('show settings', true);
  },
  async getCurrentServer() {
    return runSpeedifyCommand('show currentserver', true);
  },
  async getAdapters() {
    return runSpeedifyCommand('show adapters', true);
  },
  async getUser() {
    return runSpeedifyCommand('show user', true);
  },
  async getConnectMethod() {
    return runSpeedifyCommand('show connectmethod', true);
  },
  async getVersion() {
    return runSpeedifyCommand('version', true);
  },
}