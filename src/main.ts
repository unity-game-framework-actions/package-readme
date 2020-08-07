import * as core from '@actions/core'
import * as utility from './utility'
import * as action from './action'

run()

async function run(): Promise<void> {
  try {
    const packagePath = core.getInput('packagePath', {required: true})
    const templatePath = core.getInput('templatePath', {required: true})
    const config = await utility.readConfig()
    const result = await action.createReadme(packagePath, templatePath, config)

    await utility.setOutput(result)
  } catch (error) {
    core.setFailed(error.message)
  }
}
