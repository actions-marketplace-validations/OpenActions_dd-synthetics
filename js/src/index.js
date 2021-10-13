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

    const [shellError] = await to(proc);
    if (shellError) {
      throw shellError;
    }
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();