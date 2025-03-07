/*
  Warnings:

  - You are about to alter the column `assignedToUserId` on the `issue` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_assignedToUserId_fkey`;

-- DropIndex
DROP INDEX `Issue_assignedToUserId_fkey` ON `issue`;

-- AlterTable
ALTER TABLE `issue` ADD COLUMN `createdByUserId` VARCHAR(191) NULL,
    MODIFY `assignedToUserId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_createdByUserId_fkey` FOREIGN KEY (`createdByUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
