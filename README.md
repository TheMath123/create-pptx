# Download, convert, and create PPTX
Este conjunto de script, vão baixar imagens converter e criar um arquivo power point com as imagens baixadas. Siga o passo a passo para ter sucesso em sua empreitada.

## Steb by Step

1. Verifique o arquivo "links_para_baixar.txt", coloque as url das imagens, uma em cada linha, pois será assim que script será lido.

2. Instale os pacotes:
```bash
npm install
```

3. Execute o primeiro script para baixar as imagens, lembres de deixar "links_para_baixar.txt", nas raiz.
```bash
npm ./download.js
```

4. (Passo opicional) Agora caso as imagens não tiver no formato .png, pode converter ela usando o script a seguir, basta executar o mesmo:
```bash
npm ./conversor.js
``` 

5. Agora basta executar o ultimo script, para gerar a apresentação:
```bash
npm ./create_pptx.js
``` 