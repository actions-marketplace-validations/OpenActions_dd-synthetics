const getArg = (arg, flag) => {
  if (!arg) { return ''; }

  switch (typeof arg) {
    case 'boolean': return flag;
    case 'object': return arg.length ? `${flag}${arg.join(flag)}` : '';
    default: return `${flag}${arg}`;
  }
};

const getCommand = (args) => {
  const DD_ARGS = Object.keys(args).reduce((acc, key) => {
    const val = args[key];
    const isBoolean = typeof val === 'boolean';
    const flag = ` --${key}${isBoolean ? '' : ' '}`;

    if (!val && typeof val !== 'boolean') { return acc; }

    acc += getArg(val, flag);
    return acc;
  }, '');

  return `datadog-ci synthetics run-tests${DD_ARGS}`;
};

module.exports = {
  getArg,
  getCommand,
};
