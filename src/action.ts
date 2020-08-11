import * as utility from './utility'

export async function createReadme(data: any, config: any): Promise<string> {
  let format = ''
  const body = await getBody(config)

  format = formatBody(data, body, config)
  format = utility.normalize(format)

  return format
}

async function getBody(config: any): Promise<string> {
  if (await utility.exists(config.body)) {
    return await utility.read(config.body)
  } else {
    return config.body
  }
}

function formatBody(data: any, body: string, config: any) {
  const values = {
    package: data,
    dependenciesFormatted: formatDependencies(data, config)
  }

  const format = utility.formatValues(body, values)

  return format
}

function formatDependencies(packageData: any, config: any) {
  let format = ''

  if (packageData.dependencies != null) {
    const keys = Object.keys(packageData.dependencies)

    if (keys.length > 0) {
      for (const key of keys) {
        const value = packageData.dependencies[key]
        const values = {
          package: packageData,
          dependency: {
            name: key,
            version: value
          }
        }

        format += utility.formatValues(config.dependency, values)
      }
    } else {
      format += config.dependenciesEmpty
    }
  }

  return format
}
