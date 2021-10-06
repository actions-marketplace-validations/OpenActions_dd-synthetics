const core = require('@actions/core');
const shell = require('execa');
const { to } = require('await-to-js');

const getArg = (arg, flag) => {
  switch (typeof arg) {
    case 'boolean': return arg ? flag : '';
    case 'object': return arg.length ? `${flag}${val.join(flag)}` : '';
    default: return `${flag}${arg}`;
  }
};

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

    const DD_ARGS = Object.keys(datadogArgs).reduce((acc, key) => {
      const flag = ` --${key} `;
      const val = datadogArgs[key];

      if (!val && typeof val !== 'boolean') { return acc; }

      acc += getArg(val, flag);
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