import { cpSync, existsSync, mkdirSync, rmSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'client/dist')
const target = join(root, 'server/public')

if (!existsSync(join(dist, 'index.html'))) {
  console.error('❌ No existe client/dist/index.html. Corré npm run build --prefix client primero.')
  process.exit(1)
}

rmSync(target, { recursive: true, force: true })
mkdirSync(target, { recursive: true })
cpSync(dist, target, { recursive: true })

console.log('✓ client/dist copiado a server/public/')
