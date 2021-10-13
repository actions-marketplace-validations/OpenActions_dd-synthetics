const { getArg, getCommand } = require('../utils');

describe('getArg()', () => {
  it('returns the correct argument for truthy boolean arguments', () => {
    const arg = true;
    const flag = ' --flag';

    const result = getArg(arg, flag);

    expect(result).toEqual(flag);
  });

  it('returns the no argument for falsy boolean arguments', () => {
    const arg = false;
    const flag = ' --flag';
    const expected = '';

    const result = getArg(arg, flag);

    expect(result).toEqual(expected);
  });

  it('returns the correct argument for string arguments', () => {
    const arg = 'value';
    const flag = ' --flag ';
    const expected = ' --flag value';

    const result = getArg(arg, flag);

    expect(result).toEqual(expected);
  });

  it('returns the no argument for empty string arguments', () => {
    const arg = '';
    const flag = ' --flag ';
    const expected = '';

    const result = getArg(arg, flag);

    expect(result).toEqual(expected);
  });

  it('returns the correct argument for array arguments', () => {
    const arg = ['val1', 'val2', 'val3'];
    const flag = ' --flag ';
    const expected = ' --flag val1 --flag val2 --flag val3';

    const result = getArg(arg, flag);

    expect(result).toEqual(expected);
  });

  it('returns the no argument for array arguments with no length', () => {
    const arg = [];
    const flag = ' --flag ';
    const expected = '';

    const result = getArg(arg, flag);

    expect(result).toEqual(expected);
  });
});

describe('getCommand()', () => {
  it('returns command with no arguments if arguments are empty', () => {
    const args = {};
    const expected = 'datadog-ci synthetics run-tests';

    const result = getCommand(args);

    expect(result).toEqual(expected);
  });

  it('returns command with correct arguments for truthy boolean arguments', () => {
    const args = {
      failOnTimeout: true,
      failOnCriticalErrors: true,
    };
    const expected = 'datadog-ci synthetics run-tests --failOnTimeout --failOnCriticalErrors';

    const result = getCommand(args);

    expect(result).toEqual(expected);
  });

  it('returns command with correct arguments for mixed boolean arguments', () => {
    const args = {
      failOnTimeout: true,
      failOnCriticalErrors: false,
    };
    const expected = 'datadog-ci synthetics run-tests --failOnTimeout';

    const result = getCommand(args);

    expect(result).toEqual(expected);
  });

  it('returns command with correct arguments for string arguments', () => {
    const args = {
      apiKey: 'apiKey',
      appKey: 'appKey',
      config: 'config',
    };
    const expected = 'datadog-ci synthetics run-tests --apiKey apiKey --appKey appKey --config config';

    const result = getCommand(args);

    expect(result).toEqual(expected);
  });

  it('returns command with correct arguments for mixed string arguments', () => {
    const args = {
      apiKey: 'apiKey',
      appKey: 'appKey',
      config: '',
    };
    const expected = 'datadog-ci synthetics run-tests --apiKey apiKey --appKey appKey';

    const result = getCommand(args);

    expect(result).toEqual(expected);
  });

  it('returns command with correct arguments for array arguments', () => {
    const args = {
      files: ['file1', 'file2', 'file3'],
      'public-id': ['id1', 'id2'],
    };
    const expected = 'datadog-ci synthetics run-tests --files file1 --files file2 --files file3 --public-id id1 --public-id id2';

    const result = getCommand(args);

    expect(result).toEqual(expected);
  });

  it('returns command with correct arguments for mixed array arguments', () => {
    const args = {
      files: ['file1', 'file2', 'file3'],
      'public-id': [],
    };
    const expected = 'datadog-ci synthetics run-tests --files file1 --files file2 --files file3';

    const result = getCommand(args);

    expect(result).toEqual(expected);
  });

  it('returns command with correct arguments for mixed arguments', () => {
    const args = {
      failOnTimeout: true,
      failOnCriticalErrors: true,
      apiKey: 'apiKey',
      appKey: 'appKey',
      config: 'config',
      files: ['file1', 'file2', 'file3'],
      'public-id': ['id1', 'id2'],
    };
    const expected = 'datadog-ci synthetics run-tests --failOnTimeout --failOnCriticalErrors --apiKey apiKey --appKey appKey --config config --files file1 --files file2 --files file3 --public-id id1 --public-id id2';

    const result = getCommand(args);

    expect(result).toEqual(expected);
  });
});