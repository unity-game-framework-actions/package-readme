import * as utility from './utility'

export async function createReadme(data: any, config: any, context: any): Promise<string> {
  const values = {
    context: context,
    package: data,
    dependenciesFormatted: formatDependencies(data, config, context)
  }

  let format = utility.formatValues(config.body, values)

  format = utility.normalize(format)

  return format
}

function formatDependencies(packageData: any, config: any, context: any) {
  let format = ''

  if (packageData.dependencies != null) {
    const keys = Object.keys(packageData.dependencies)

    if (keys.length > 0) {
      for (const key of keys) {
        const value = packageData.dependencies[key]
        const values = {
          context: context,
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
