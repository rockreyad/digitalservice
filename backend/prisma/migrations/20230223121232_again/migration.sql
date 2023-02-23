-- AlterTable
ALTER TABLE `user` MODIFY `name` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `published` BOOLEAN NULL DEFAULT false,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NULL,
    `authorId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
