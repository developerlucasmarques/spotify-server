# Spotify Server <img src="https://user-images.githubusercontent.com/95504029/151560441-2e792d97-fd65-462c-8fd7-70f581de5674.gif" width="100">

Este projeto foi desenvolvido no quinto módulo do curso de back-end da Blue EdTech com foco em aprimorar nossas habilidades em criar uma API que utilize TypeScript, NestJs, Prisma ORM e PostgreSQL. A presente API tem como objetivo que um usuário utilize de funcionalidades parecidas com as do Spotify e também possa criar perfis, dependendo do plano em que ele "assina". Artistas também tem suas próprias funcionalidades. Além disso também é possível que administradores possam gerir a plataforma.

## Pré-requisitos

É imprescindível que você tenha instalado em seu computador o NodeJs e o PostgreSQL para que possa executar e testar este projeto.

- **Node** - [https://nodejs.org/en/download/](https://nodejs.org/pt-br/download/)
- **PostgreS** - [https://www.postgresql.org/download/](https://www.npmjs.com/package/download)

## Instalação

 Exemplo:

 Clone esse projeto em seu computador com o comando:

 ```
 	git clone [https://github.com/mlucasdev/spotify-server]
 ```

 Acesse a pasta do projeto seu terminal:

 ```
 	cd [spotfy-server]
 ```

 Já pasta da aplicação em seu terminal, digite o seguinte comando:

 ```
 	npm install
 ```

 Crie um arquivo '.env' e preencha com as variáveis do arquivo '.env.example'

 ```
 DATABASE_URL="postgresql://[nome do usuário no postgres]:[senha do usuário]@localhost:[porta em que seu banco de dados está rodando, ex: '5432']/spotify-server"
 ```

 ```
 JWT_SECRET="klsA92n9LWS9bfjs128$%"
 ```

## Execução

Após ter configurado o projeto e ter aguardado a instalação das dependencias de desenvolvimento, execute o comando:

```
 	npm run start
```

 Caso queira que o projeto rode automaticamente após fazer alguma alteração no código execute o comando:

 ```
 	npm run start:dev
 ```

 Para criar as tabelas no banco de dados execute o comando:

 ```
 	npx prisma db push
 ```

 A aplicação estará disponível para visualização em seu navegador, caso isso não aconteça automaticamente abre o navegador no seguinte endereço: _localhost:3006/api_

## Funcionalidades

- Como usuário, você tera acesso as músicas e aos álbuns criadas pelos artistas e também poderá criar playlists, favoritar músicas e playlists de outros usuários.

- Um admin só pode ser criado por um manager e ele poderá gerir a plataforma.

- Como artista, você poderá publicar suas músicas e criar álbuns.

<img src="https://i.imgur.com/TvYGO0W.png" width="520"> <br><br>

## Links
- **API** - [https://spotify-server-blue.herokuapp.com/api/](https://spotify-server-blue.herokuapp.com/api/)
- **DOCUMENTACIO** - [https://mlucasdev.github.io/spotify-server-documentation-client/](https://mlucasdev.github.io/spotify-server-documentation-client/)

## Stacks Utilizadas

- NestJs, TypeScript, JavaScript, Express, Swagger, Bcrypt, JWT


## Contribuições

Para contribuir com os autores desse projeto, você pode nos indicar para uma vaga na empresa que você trabalha. #contrataagente

## Autores

- **Gustavo Martins** - Desenvolvedor e Idealizador do Projeto - [Github](https://github.com/gumartins77) | [Linkedin](https://www.linkedin.com/in/gustavo-martins-681921229/)

- **Lucas Marques** - Desenvolvedor e Idealizador do Projeto - [Github](https://github.com/mlucasdev) | [Linkedin](https://www.linkedin.com/in/mlucasdev/)

## Licença

General Public License [GNU](https://www.gnu.org/licenses/gpl-3.0.html).

## Agradecimentos

Agradecemos a [Blue EdTech](https://www.linkedin.com/school/blue-edtech/mycompany/) pelo ensinamento e oportunidade de podermos colocar em prática tudo que aprendemos nos módulos passados. Agradecemos também aos professores [Leo Ruiz](https://www.linkedin.com/in/leonardoorabona/), [Marcus Silva](https://www.linkedin.com/in/marcusvinysilva/) e [Paulo Salvatore](https://www.linkedin.com/in/salvatorepaulo/)
