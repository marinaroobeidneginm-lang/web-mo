import 'dotenv/config'
import pg from 'pg'

const { Client } = pg

const url = process.env.DIRECT_URL || process.env.DATABASE_URL

if (!url || url.includes('[YOUR-PASSWORD')) {
  console.error('❌ Configurá DIRECT_URL en server/.env')
  console.error('   Copiá el string desde Supabase → Connect → Session pooler')
  process.exit(1)
}

console.log('Probando conexión...')
console.log('Host:', url.replace(/:[^:@]+@/, ':***@'))

const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } })

try {
  await client.connect()
  const result = await client.query('SELECT NOW() as now')
  console.log('✅ Conexión OK:', result.rows[0].now)
} catch (error) {
  console.error('❌ Error:', error.message)
  console.error('')
  console.error('Soluciones:')
  console.error('1. Supabase Dashboard → Connect → copiá el Session pooler string COMPLETO')
  console.error('2. Usuario debe ser: postgres.qwxnscormzschyukuksj (no solo "postgres")')
  console.error('3. Si la contraseña tiene $ ? & @ → codificala en https://www.urlencoder.org/')
  console.error('4. Reset password en Supabase y usá la generada (sin caracteres raros)')
} finally {
  await client.end().catch(() => {})
}
