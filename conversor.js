const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const directoryPath = "./imagens"; // caminho da pasta com as imagens

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Erro ao acessar a pasta de imagens", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const outputFilePath = path.join(
      directoryPath,
      path.parse(file).name + ".png",
    );

    sharp(filePath)
      .toFormat("png")
      .toFile(outputFilePath, (err, info) => {
        if (err) {
          console.error(`Erro ao converter a imagem ${file}`, err);
        } else {
          console.log(`Imagem ${file} convertida com sucesso:`, info);
        }
      });
  });
});
