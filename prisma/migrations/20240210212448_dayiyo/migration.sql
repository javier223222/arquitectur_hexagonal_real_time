-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(40) NOT NULL,
    `email` VARCHAR(60) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subasta` (
    `idSubasta` INTEGER NOT NULL AUTO_INCREMENT,
    `nameSubata` VARCHAR(100) NOT NULL,
    `imageSubasta` VARCHAR(120) NOT NULL,
    `descripcion` VARCHAR(120) NOT NULL,
    `idCreator` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `timeDurantion` DATETIME(3) NULL,
    `finisAt` DATETIME(3) NULL,
    `isfinished` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`idSubasta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ofertas` (
    `idOferta` INTEGER NOT NULL AUTO_INCREMENT,
    `idSubasta` INTEGER NOT NULL,
    `idUser` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `precio` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`idOferta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Winner` (
    `idWinner` INTEGER NOT NULL AUTO_INCREMENT,
    `idSubasta` INTEGER NOT NULL,
    `idUser` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idWinner`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subasta` ADD CONSTRAINT `Subasta_idCreator_fkey` FOREIGN KEY (`idCreator`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ofertas` ADD CONSTRAINT `Ofertas_idSubasta_fkey` FOREIGN KEY (`idSubasta`) REFERENCES `Subasta`(`idSubasta`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ofertas` ADD CONSTRAINT `Ofertas_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Winner` ADD CONSTRAINT `Winner_idSubasta_fkey` FOREIGN KEY (`idSubasta`) REFERENCES `Subasta`(`idSubasta`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Winner` ADD CONSTRAINT `Winner_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
