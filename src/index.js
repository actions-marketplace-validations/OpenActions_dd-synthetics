const core = require('@actions/core');
const shell = require('execa');
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
      tunnel: core.getInput('tunnel'),
    };

    const DD_ARGS = Object.keys(datadogArgs).reduce((acc, key) => {
      const flag = ` --${key} `;
      const val = datadogArgs[key];

      if (!val && typeof val !== 'boolean') { return acc; }
      acc += `${flag}${val instanceof Array ? val.join(flag) : val}`;
      return acc;
    }, '');

    const [shellError] = await to(shell.command(`datadog-ci synthetics run-tests${DD_ARGS}`));
    if (shellError) {
      throw shellError;
    }
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();