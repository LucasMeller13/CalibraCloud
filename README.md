## Instalação do Projeto

Caso você queira executar este projeto em sua máquina, faça o download e acesse a pasta do projeto. Após isso, execute a seguinte linha de comando para instalar as dependências:

`npm install`

Depois disso, você poderá rodar o projeto com o Vite utilizando o comando:

`npm run dev`

## Página Login

Para fazer login basta usar qualquer usuário de users.json ('lucas','joao','cleber','mateus'), já a senha pode ser qualquer caractere.

---

# CalibraCloud  

Integrantes: André Eyng e Lucas Meller.

### Descrição do Projeto 
O projeto Front-End **CalibraCloud** organiza em uma única plataforma calibrações de diversos sensores para fácil acesso aos estagiários e professores da SATC. Para isso, o cadastramento de cada sensor com sua identificação e características são feitos na plataforma, após isso é cadastrado a calibração do sensor como também o método utilizado e resultados obtidos (quais foram os procedimentos na realização da calibração, upload de arquivos utilizados; descrição dos resultados como a ordem da linha de tendência e R2).

### Objetivo do projeto 
O objetivo do projeto **CalibraCloud** é organizar em um único lugar na nuvem todas as calibrações de sensores feitas em laboratórios da SATC visto que, em diversos casos, os arquivos de calibração são perdidos pela rotatividade de computadores usados como também pelas calibrações serem feitas em contas de usuários diferentes, o que torna complexo o monitoramento da localização de cada calibração de sensores.

### Estrutura do projeto
<ul>
  <li>Página Inicial (Dashboard): indicadores e gráficos sobre as calibrações como quantidade de sensores cadastrados por mês, quantidade de sensores cadastrados por tipo, usuário com mais sensores calibrados, entre outros.</li>
  <li>Página CRUD p/ sensores: cadastro, consulta, edição e remoção de calibrações.</li>
  <li>Página CRUD p/ usuários: cadastro, consulta, edição e remoção de usuários.</li>
  <li><s>Páginas Novas Calibrações: página para o administrador revisar novas calibrações e decidir entre aceitá-las ou vetá-las.</s></li>
</ul>

### Público Alvo 
Os principais beneficiários do projeto são professores e estagiários que utilizam sensores e que necessitam que esses dispositivos sejam devidamente calibrados.

### Tecnologias
As principais tecnologias que serão usadas são o React e a biblioteca Rechart.
