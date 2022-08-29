-- CreateTable
CREATE TABLE "pokemon" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "types" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemon_types" (
    "pokemon_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pokemon_types_pkey" PRIMARY KEY ("pokemon_id","type_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_id_key" ON "pokemon"("id");

-- CreateIndex
CREATE UNIQUE INDEX "types_id_key" ON "types"("id");

-- AddForeignKey
ALTER TABLE "pokemon_types" ADD CONSTRAINT "pokemon_types_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemon_types" ADD CONSTRAINT "pokemon_types_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
