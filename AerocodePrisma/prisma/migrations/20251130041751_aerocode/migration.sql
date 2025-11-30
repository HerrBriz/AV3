-- CreateTable
CREATE TABLE `aeronave` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `capacidade` INTEGER NOT NULL,
    `alcance` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `aeronave_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `etapa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `prazo` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `usuario` VARCHAR(191) NOT NULL,
    `funcao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `fornecedor` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teste` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `resultado` VARCHAR(191) NOT NULL,
    `data` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_etapaTofuncionario` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_etapaTofuncionario_AB_unique`(`A`, `B`),
    INDEX `_etapaTofuncionario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_etapaTofuncionario` ADD CONSTRAINT `_etapaTofuncionario_A_fkey` FOREIGN KEY (`A`) REFERENCES `etapa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_etapaTofuncionario` ADD CONSTRAINT `_etapaTofuncionario_B_fkey` FOREIGN KEY (`B`) REFERENCES `funcionario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
