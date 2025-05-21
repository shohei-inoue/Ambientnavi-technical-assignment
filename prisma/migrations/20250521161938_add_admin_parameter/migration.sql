-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'CUSTOMER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "employeeNumber" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER';
