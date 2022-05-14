import { readFile } from 'fs'
import { ARIA2DIR } from '../config/index'

export function readConfig(): Promise<Map<string, string>> {
    const config: Map<string, string> = new Map()
    return new Promise((resolve, reject) => {
        readFile(`${ARIA2DIR}/aria2.conf`, {encoding: 'utf8'}, (error, data) => {
            if (error) {
                reject(error)
            }
            const lines = data.split('\n')
            for (let idx = 0; idx < lines.length; ++idx) {
                const row = lines[idx]
                if (row.length == 0 || row[0] === '#') {
                    continue
                }
                const [key, val] = row.split('=')
                config.set(key, val)
            }
            resolve(config)
        })
    })
}

export function writeConfig(config: Map<string, string>) {
    // todo
}
