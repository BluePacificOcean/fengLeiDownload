import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { ARIA2DIR, ARIA2PATH } from '../config/index'
export * from './config'
export let aria2Process: ChildProcessWithoutNullStreams

export function startAria2() {
    return new Promise((resolve, reject) => {
        aria2Process = spawn(ARIA2PATH, ['--conf-path', './aria2.conf'], { cwd: ARIA2DIR })
        aria2Process.stdout.once('data', (data: Buffer) => {
            let msg = data.toString()
            console.log(msg)
            resolve(msg)
        })
        aria2Process.stderr.once('data', (data: Buffer) => {
            reject(data.toString())
        })
    })
}

export function stopAria2() {
    if(aria2Process !== undefined) {
        aria2Process.kill()
    }
}

export function restartAria2() {
    stopAria2()
    startAria2()
}