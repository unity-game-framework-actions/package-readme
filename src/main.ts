import * as core from '@actions/core'
import * as utility from './utility'
import * as action from './action'

run()

async function run(): Promise<void> {
  try {
    const data = await utility.getInputAny()
    const config = await utility.readConfigAny()
    const result = await action.createReadme(data, config)

    await utility.setOutput(result)
  } catch (error) {
    core.setFailed(error.message)
  }
}
