-- CreateTable
CREATE TABLE "Locations" (
    "location_id" SERIAL NOT NULL,
    "city_name" TEXT NOT NULL,

    CONSTRAINT "Locations_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "Sensors" (
    "id" SERIAL NOT NULL,
    "sensor_type" TEXT NOT NULL,
    "last_reading_time" TIMESTAMP(3),
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "Sensors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingSensors" (
    "id" SERIAL NOT NULL,
    "sensor_id" INTEGER NOT NULL,
    "temp" DOUBLE PRECISION,
    "hum" DOUBLE PRECISION,
    "co2" DOUBLE PRECISION,
    "pm25" DOUBLE PRECISION,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReadingSensors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sensors" ADD CONSTRAINT "Sensors_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Locations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingSensors" ADD CONSTRAINT "ReadingSensors_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "Sensors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
