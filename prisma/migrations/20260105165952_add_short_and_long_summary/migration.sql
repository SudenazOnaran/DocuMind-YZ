/*
  Warnings:

  - You are about to drop the column `text` on the `Summary` table. All the data in the column will be lost.
  - Added the required column `shortText` to the `Summary` table without a default value. This is not possible if the table is not empty.

*/
-- 1️⃣ Yeni kolonları nullable olarak ekle
ALTER TABLE "Summary"
ADD COLUMN "shortText" TEXT,
ADD COLUMN "longText" TEXT;

-- 2️⃣ Eski özetleri shortText'e taşı
UPDATE "Summary"
SET "shortText" = "text";

-- 3️⃣ shortText'i zorunlu yap
ALTER TABLE "Summary"
ALTER COLUMN "shortText" SET NOT NULL;

-- 4️⃣ Eski kolonu güvenle sil
ALTER TABLE "Summary"
DROP COLUMN "text";
