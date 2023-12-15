const PptxGenJS = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

let pptx = new PptxGenJS();

const directoryPath = "./imagens"; // Caminho da pasta com as imagens PNG

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Erro ao acessar a pasta de imagens", err);
    return;
  }

  const imageFiles = files
    .filter((file) => file.startsWith("imagem_") && file.endsWith(".png"))
    .sort(
      (a, b) =>
        parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10),
    );

  imageFiles.forEach((file) => {
    let slide = pptx.addSlide();
    let filePath = path.join(directoryPath, file);
    // O PowerPoint usa medidas em polegadas, então vamos converter 2048x1152 pixels para polegadas
    // Considerando que o PowerPoint usa uma resolução de 96 DPI, dividimos os pixels por 96 para obter polegadas
    slide.addImage({ path: filePath, x: 0, y: 0, w: "100%", h: "100%" });
  });

  pptx
    .writeFile("apresentacao.pptx")
    .then((fileName) => {
      console.log(`Arquivo criado com sucesso: ${fileName}`);
    })
    .catch((err) => {
      console.error(err);
    });
});
