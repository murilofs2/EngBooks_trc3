# Atividade 01 - Tópicos em Redes de Comunicação

#### REST API desenvolvida para o cadastro e listagem de disciplinas.

## Descrição da API

Para verificar o funcionamento da API, por favor verifique o arquivo "DisciplinasAPI.yaml" presente neste repositório que se trata da documentação da API desenvolvida através da aplicação SWAGGER.

## Instalação de recursos necessários

Para rodar esta API será necessário a instalação da plataforma **NodeJs** disponível em **https://nodejs.org/en/download/** e também dos seguintes pacotes instalados por um dos gerenciadores, **Yarn** ou **NPM**, ambos obtidos através da plataforma NodeJs:

- Mongoose (facilitador da comunicação com o banco de dados MongoDB para NodeJs).
- Nodemon (gerenciador automático de atualizações).
- Sucrase (compilador).

Além disso, será necessário a instalação da plataforma de desenvolvimento **Docker**, disponível em **https://www.docker.com**, capaz de rodar diversas aplicações como se estivessem em ambientes únicos e separados, de forma rápida e robusta.

Após instalação do **Docker**, deve-se baixar a imagem **Mongo** para Docker, disponível em **https://hub.docker.com/_/mongo**, capaz de simular um banco de dados em um ambiente isolado capaz de se comunicar com esta API. Após baixar a imagem, utiliza-se os seguintes comandos para criar o container:

- **docker run --name teste -p 27017:27017 -d -t mongo**

Para rodar este container em outras situações, utiliza-se **docker start <<nome_do_container>>**.

## Utilização da API

Para utilizar a API, basta estar com o container **Mongo** rodando e o servidor escutando na **porta 3000** (inicia-se o servidor com o comando **yarn dev**) assim como padrão do código.

Para visualizar o funcionamento, indica-se que primeiramente se visualize os detalhamentos da API no arquivo do SWAGGER indicado na primeira seção. Após esta visualização, inicie o software **Insomnia** e importe o arquivo **"Atividade01_Insomnia.json"**, que contém as chamadas da API necessárias.

Neste momento, qualquer chamada pode ser realizada por este software e também é possível observar seu funcionamento para cada caso, podendo qualquer uma das chamadas ser alterada como bem for desejado.

## Descrição do código

A estrutura da API foi desenvolvida com base no modelo MVC, mas propondo basicamente um **Model** e um **Controller**. 

A **Model** trata da estrutura básica que os arquivos serão dispostos no banco de dados **Mongo**, ou seja, uma coleção de documentos, que nesse caso será uma coleção de disciplinas.

O **Controller** por sua vez trata das regras e do funcionamento básico das funções da API e utiliza o modelo **CRUD** (Create, Read, Update, Delete), funções básicas de uma API.

O restante do código apresenta as definições da porta de listening do servidor, do roteamento provido pelo **express**, das rotas que levam ao **Controller** e das configurações básicas dos arquivos.

### Contato: phnogs@hotmail.com
### Agradecido, Pedro :)

