/*
  Warnings:

  - You are about to drop the column `location_id` on the `Sensors` table. All the data in the column will be lost.
  - You are about to drop the `Locations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lat` to the `Sensors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long` to the `Sensors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sensors" DROP CONSTRAINT "Sensors_location_id_fkey";

-- AlterTable
ALTER TABLE "Sensors" DROP COLUMN "location_id",
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "long" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Locations";
