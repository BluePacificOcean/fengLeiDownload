import { join } from 'path'

export const isDev = process.env.NODE_ENV == 'development'

export const RESOURCESPATH = isDev ? '' : 'resources'

export const ASSETDIR = join(process.cwd(), RESOURCESPATH, 'assets')

export const ARIA2DIR = join(ASSETDIR, 'aria2')

export const ARIA2PATH = join(ARIA2DIR, 'aria2c')

export const PRELOADPATH = join(process.cwd(), RESOURCESPATH, isDev?'':'/app.asar', 'src/renderer/preload.js')

export const LOGOPATH = join(ASSETDIR, 'logo.png')