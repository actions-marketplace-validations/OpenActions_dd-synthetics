const core = require('@actions/core');
const shell = require('execa');
const { getCommand } = require('../utils');
const { to } = require('await-to-js');

async function run() {
  try {
    const datadogArgs = {
      apiKey: core.getInput('apiKey'),
      appKey: core.getInput('appKey'),
      config: core.getInput('config'),
      datadogSite: core.getInput('datadogSite'),
      failOnCriticalErrors: core.getBooleanInput('failOnCriticalErrors'),
      failOnTimeout: core.getBooleanInput('failOnTimeout'),
      files: core.getMultilineInput('files'),
      'public-id': core.getMultilineInput('publicIds'),
      search: core.getInput('search'),
      subdomain: core.getInput('subdomain'),
    };

    const DD_CMD = getCommand(datadogArgs);
    console.log('> ', DD_CMD);

    const proc = shell.command(DD_CMD);
    proc.stdout.pipe(process.stdout);

    const [shellError, result] = await to(proc);

    const error = shellError || result.stderr || (result.stdout || '').includes('ERROR');
    console.log('error', error);
    if (error) {
      throw error;
    }
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();