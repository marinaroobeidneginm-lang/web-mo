import 'dotenv/config'
import {
  getSupabaseAdmin,
  isStorageConfigured,
  STORAGE_BUCKET,
} from '../lib/supabase.js'

if (!isStorageConfigured()) {
  console.error('❌ Configurá SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en server/.env')
  console.error('   Dashboard → Project Settings → API → service_role (secret)')
  process.exit(1)
}

const supabase = getSupabaseAdmin()

const { data: buckets, error: listError } = await supabase.storage.listBuckets()

if (listError) {
  console.error('❌ No se pudo listar buckets:', listError.message)
  process.exit(1)
}

const exists = buckets.some((bucket) => bucket.name === STORAGE_BUCKET)

if (exists) {
  console.log(`✅ El bucket "${STORAGE_BUCKET}" ya existe.`)
  process.exit(0)
}

const { error: createError } = await supabase.storage.createBucket(STORAGE_BUCKET, {
  public: true,
  fileSizeLimit: 5 * 1024 * 1024,
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
})

if (createError) {
  console.error('❌ Error al crear bucket:', createError.message)
  process.exit(1)
}

console.log(`✅ Bucket "${STORAGE_BUCKET}" creado (público, máx. 5 MB, JPG/PNG/WebP).`)
