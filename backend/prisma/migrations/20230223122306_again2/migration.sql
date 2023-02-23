/*
  Warnings:

  - You are about to drop the column `authorId` on the `post` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `authorId`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD COLUMN `year` JSON NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
