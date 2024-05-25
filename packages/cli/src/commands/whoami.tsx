import yargs, { ArgumentsCamelCase } from 'yargs'
import chalk from 'chalk'
import { readConfig } from '../lib/utils'

type Args = {}

class Command {
  readonly command = 'whoami'
  readonly describe = 'Retrieve your user information and test your authentication configuration.'

  readonly builder = (args: yargs.Argv) => {
    return args.showHelpOnFail(true).strict()
  }

  handler = async (args: ArgumentsCamelCase<Args>) => {
    const config = readConfig()
    if (config.user && config.token) {
      console.log('Hi,', chalk.green(`${config.user.name} (@${config.user.email})`))
    } else {
      console.log(
        chalk.yellow('Please login first, try to login by command:'),
        chalk.green('penx login'),
      )
    }
  }
}

const command = new Command()

export default command
