-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "operacion" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "moneda" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "ambientes" INTEGER NOT NULL DEFAULT 0,
    "metros" DOUBLE PRECISION NOT NULL,
    "dormitorios" INTEGER NOT NULL DEFAULT 0,
    "banos" INTEGER NOT NULL DEFAULT 0,
    "descripcion" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "caracteristicas" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);
