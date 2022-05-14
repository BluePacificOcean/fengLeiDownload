import { join } from 'path'

export const ASSETDIR = join(process.cwd(), process.env.NODE_ENV == 'development' ? '' : 'resources', 'assets')

export const ARIA2DIR = join(ASSETDIR, 'aria2')

export const ARIA2PATH = join(ARIA2DIR, 'aria2c')

export const PRELOADPATH = join(process.cwd(), 'src/preload/index.js')

export const LOGOPATH = join(ASSETDIR, 'logo.png')