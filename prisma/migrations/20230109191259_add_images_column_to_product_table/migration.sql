/*
  Warnings:

  - Added the required column `images` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `images` VARCHAR(191) NOT NULL;
