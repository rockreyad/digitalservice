import chalk from 'chalk'
import dayjs from 'dayjs'

const request = chalk.hex('#384cc9')
const requestBright = chalk.hex('#5769d9')
const response = chalk.hex('#17bd89')
const responsebright = chalk.hex('#3ec99e')

export default class Logger {
    public static log = (args: any) => this.info(args)

    public static info = (args: any) =>
        console.log(
            chalk.blue(`[${dayjs().format('DD-MM-YYYY HH:mm')}] [❕]`),
            typeof args === 'string' ? chalk.blueBright(args) : args,
        )

    public static connect = (args: any) =>
        console.log(
            chalk.green(`[${dayjs().format('DD-MM-YYYY HH:mm')}] [🔛]`),
            typeof args === 'string' ? chalk.greenBright(args) : args,
        )

    public static incoming = (args: any) =>
        console.log(
            request(`[${dayjs().format('DD-MM-YYYY HH:mm')}] [❔]`),
            typeof args === 'string' ? requestBright(args) : args,
        )

    public static response = (args: any) =>
        console.log(
            response(`[${dayjs().format('DD-MM-YYYY HH:mm')}] [✅]`),
            typeof args === 'string' ? responsebright(args) : args,
        )

    public static warning = (args: any) =>
        console.log(
            chalk.yellow(`[${dayjs().format('DD-MM-YYYY HH:mm')}] [⚠️]`),
            typeof args === 'string' ? chalk.yellowBright(args) : args,
        )

    public static error = (args: any) =>
        console.log(
            chalk.red(`[${dayjs().format('DD-MM-YYYY HH:mm')}] [❌]`),
            typeof args === 'string' ? chalk.redBright(args) : args,
        )
}
