-- AlterTable
ALTER TABLE "character" ADD COLUMN     "rulebookId" INTEGER;

-- CreateTable
CREATE TABLE "rulebook" (
    "id" SERIAL NOT NULL,
    "createdOn" TIMESTAMP(6) NOT NULL,
    "lastModifiedOn" TIMESTAMP(6) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "rulebook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_rulebookId_fkey" FOREIGN KEY ("rulebookId") REFERENCES "rulebook"("id") ON DELETE SET NULL ON UPDATE CASCADE;
