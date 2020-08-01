import * as core from '@actions/core'
import * as utility from './utility'
import * as action from './action'

run()

async function run(): Promise<void> {
  try {
    const packagePath = core.getInput('package', {required: true})
    const template = core.getInput('template', {required: true})
    const config = await utility.readConfig()
    const result = await action.createReadme(packagePath, template, config)

    await utility.setOutput(result)
  } catch (error) {
    core.setFailed(error.message)
  }
}
