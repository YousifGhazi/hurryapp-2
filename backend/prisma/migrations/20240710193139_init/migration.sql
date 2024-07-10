/*
  Warnings:

  - You are about to drop the column `last_reading_time` on the `Sensors` table. All the data in the column will be lost.
  - You are about to drop the column `sensor_type` on the `Sensors` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReadingSensors" DROP CONSTRAINT "ReadingSensors_sensor_id_fkey";

-- AlterTable
ALTER TABLE "Sensors" DROP COLUMN "last_reading_time",
DROP COLUMN "sensor_type";
