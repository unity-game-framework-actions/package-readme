import * as utility from './utility'

export async function createReadme(packagePath: string, templatePath: string, config: any): Promise<string> {
  const packageData = await utility.readData(packagePath, 'json')
  const template = await utility.read(templatePath)
  const values = {
    package: packageData,
    dependenciesFormatted: formatDependencies(packageData, config)
  }

  const format = utility.formatValues(template, values)

  return format
}

export function formatDependencies(packageData: any, config: any) {
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
