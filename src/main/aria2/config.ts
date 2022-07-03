import { open } from 'fs/promises'
import {join} from 'path'
import { ARIA2DIR } from '../config/index'

const configPath = join(ARIA2DIR, 'aria2.conf')

export async function setConfig(key: string, val: string): Promise<boolean> {
    try {
        updateConfigFile(key, val)
    }
    catch (error) {
        return false
    }
    return true
}

async function updateConfigFile(key: string, val: string) {
    let fileHandle = await open(configPath, 'r+')
    let content = await fileHandle.readFile({
        encoding: 'utf-8'
    })
    let reg = new RegExp(`^${key}=.*?\$`, 'm')
    content = content.replace(reg, `${key}=${val}`)
    await fileHandle.writeFile(content, {
        flag: 'w',
        encoding: 'utf-8'
    })
}