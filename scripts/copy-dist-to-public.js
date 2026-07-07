import { cpSync, existsSync, mkdirSync, rmSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'client/dist')
const publicDir = join(root, 'public')

if (!existsSync(join(dist, 'index.html'))) {
  console.error('❌ No existe client/dist/index.html. Corré npm run build --prefix client primero.')
  process.exit(1)
}

rmSync(publicDir, { recursive: true, force: true })
mkdirSync(publicDir, { recursive: true })
cpSync(dist, publicDir, { recursive: true })

console.log('✓ client/dist copiado a public/')
