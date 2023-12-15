const axios = require("axios");
const fs = require("fs");
const path = require("path");
const stream = require("stream");
const util = require("util");

// Transforma pipeline em uma versão Promise
const pipeline = util.promisify(stream.pipeline);

// Leitura dos links a partir do arquivo "links_para_baixar.txt"
const arquivoLinks = fs.readFileSync("links_para_baixar.txt", "utf-8");
const linksParaBaixar = arquivoLinks
  .split("\n")
  .filter((link) => link.trim() !== "");

// Pasta de destino para salvar as imagens
const pastaDestino = "./imagens";

// Certifique-se de que a pasta de destino exista ou crie-a se não existir
if (!fs.existsSync(pastaDestino)) {
  fs.mkdirSync(pastaDestino);
}

// Função para baixar uma imagem
async function baixarImagem(url, nomeArquivo) {
  try {
    const resposta = await axios.get(url, { responseType: "stream" });
    const caminhoArquivo = path.join(pastaDestino, nomeArquivo);

    // Use pipeline para salvar a imagem usando Node Streams
    await pipeline(resposta.data, fs.createWriteStream(caminhoArquivo));

    console.log(`Imagem ${nomeArquivo} baixada com sucesso.`);
  } catch (erro) {
    console.error(`Erro ao baixar a imagem ${nomeArquivo}: ${erro.message}`);
  }
}

// Baixa todas as imagens
async function baixarTodasAsImagens() {
  for (let i = 0; i < linksParaBaixar.length; i++) {
    const url = linksParaBaixar[i];
    const nomeArquivo = `imagem_${i + 1}.jpg`;
    await baixarImagem(url, nomeArquivo);
  }
}

// Chama a função para baixar todas as imagens
baixarTodasAsImagens();
