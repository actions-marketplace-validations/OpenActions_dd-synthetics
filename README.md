# DataDog Synthetics Action

This is the GitHub Action wrapper for the DataDog CI synthetics command.<br>
https://github.com/DataDog/datadog-ci/tree/master/src/commands/synthetics

## Inputs

All inputs for the action are not required but the ones that are marked are required for the CI command. You will be able to set the required inputs through environment variables instead of passing it into the action.

| Input                | Type    | Required           | Default           | Description |
| :------------------- | :-----: | :----------------: | :---------------: | :----------------------------------------------------------------------------------------------------------------- |
| apiKey               | String  | :white_check_mark: | ''                | DataDog API key which can also be set by setting `DATADOG_API_KEY` as an environment variable                      |
| appKey               | String  | :white_check_mark: | ''                | Datadog app key which can also be set by setting `DATADOG_APP_KEY` as an environment variable                      |
| configPath           | String  |                    | 'datadog-ci.json' | DataDog Synthetics CI configuration file path                                                                      |
| datadogSite          | String  |                    | 'datadoghq.com'   | DataDog Host Site which can also be set by setting `DATADOG_SITE` as an environment variable                       |
| failOnCriticalErrors | Boolean |                    | False             | Set run to fail on critical errors                                                                                 |
| failOnTimeout        | Boolean |                    | True              | Set run to fail on timeout                                                                                         |
| files                | Array   |                    | ''                | Synthetic test run configuration files that is set as a multiline input                                            |
| publicIds            | Array   |                    | ''                | Synthetic test public IDs that is set as a multiline input                                                         |
| search               | String  |                    | ''                | Synthetic test search query which is comma separated (Ex: 'tag:e2e-tests, env:prod')                               |
| subdomain            | String  |                    | 'app'             | Custom subdomain to access DataDog which can also be set by setting `DATADOG_SUBDOMAIN` as an environment variable |
| tunnel               | Boolean |                    | False             | Open a websocket tunnel (Not Recommended)                                                                          |

## Environment Variables
https://github.com/DataDog/datadog-ci/tree/master/src/commands/synthetics#setup

- **DATADOG_API_KEY**
- **DATADOG_APP_KEY**
- **DATADOG_SITE**
- **DATADOG_SUBDOMAIN**
- **DATADOG_SYNTHETICS_LOCATIONS**

## Configuration File

You can setup a configuration file `datadog-ci.json` or another filename, where the file path will need to be set to the `configPath` input of the action.<br>
https://github.com/DataDog/datadog-ci/tree/master/src/commands/synthetics#api

## Example Usage

```yml
uses: OpenActions/dd-synthetics@v1
with:
  apiKey: ${{ secrets.DD_API_KEY }}
  appKey: ${{ secrets.DD_APP_KEY }}
  search: 'tag:e2e-tests'
```