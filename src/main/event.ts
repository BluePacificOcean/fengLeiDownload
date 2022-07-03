import {ipcMain, dialog } from 'electron'
import { setConfig } from './aria2'

ipcMain.on('onOpenDirectory', async (e)=>{
    const path = await dialog.showOpenDialog({
        properties: ["openDirectory"]
    })
    e.reply('onOpenDirectory', path.filePaths[0])
})

ipcMain.on('onUpdateAria2Config', async (e, [key, val])=>{
    e.reply('onUpdateAria2Config', await setConfig(key, val))
})