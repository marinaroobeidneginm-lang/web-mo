import { cpSync, mkdirSync, rmSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'client/dist')
const publicDir = join(root, 'public')

rmSync(publicDir, { recursive: true, force: true })
mkdirSync(publicDir, { recursive: true })
cpSync(dist, publicDir, { recursive: true })

console.log('✓ client/dist copiado a public/')
