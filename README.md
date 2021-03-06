# Teste Dextra
Este repositório contém o projeto desenvolvido para solucionar o teste técnico Dextra.

O projeto foi desenvolvido com JavaEE, Java 8, servidor de aplicação Wildfly e Apache Maven para gerenciar as dependências e automatizar builds.

No frontend foi utilizado HTML, CSS, Bootstrap (como na descrição do projeto não foi mencionado a restrição do uso desse framework, foi decidido utilizá-lo para criar uma interface mais amigável) e jQuery/Javascript.

### Estrutura do projeto
- DexSandwich (Raíz do projeto)
  - DexSandwich-ear (Contém o ear gerado após compilação, para ser "deployado" no servidor de aplicação)
  - DexSandwich-ejb (Camada de negócio)
    - Classes com a implementação dos serviços chamados na camada web
  - DexSandwich-jar (Contém as entidades criadas)
    - Classes que definem as entidades criadas
  - DexSandwich-war (Camada web)
    - Arquivos html, js, css e os serviços
    
### Serviços
1-) Serviço responsável por obter as informações dos lanches do cardápio
  - GET - http://localhost:1234/dexsandwich-war/rest/application/getSandwichesInfo

2-) Serviço responsável por obter as inforamações dos ingredientes para montagem de lanches
  - GET - http://localhost:1234/dexsandwich-war/rest/application/getIngredientsInfo
  
3-) Serviço responsável pelo cálculo dos preços de lanches selecionados do cardápio
  - POST - http://localhost:1234/dexsandwich-war/rest/application/calculateSandwichTotalPrice
  
4-) Serviço responsável pelo cálculo dos preços do lanche personalizado (incluindo as promoções, caso exista)
  - POST - http://localhost:1234/dexsandwich-war/rest/application/calculateCustomizedTotalPrice
  
### Instruções para executar o projeto
- Realize o clone do repositório e faça o import no Eclipse. Para realizar o import, basta ir em File > Import e selecionar a opção "Existing Maven Project" apontando para a raíz do projeto.

- Realize o download do servidor de aplicação WildFly 16.0.0 e configure o servidor no Eclipse. Para realizar essa configuração, basta ir na aba "Servers", adicionar um novo servidor e selecionar a opção "WildFly 8.x" apontando para a raíz do diretório de instalação (do servidor).

- Abra o arquivo "standalone.xml" que será encontrado no diretório de instalação do WildFly em "standalone > configuration" e altere a tag "<socket-binding name="http" port="${jboss.http.port:8080}"/>", mudando a porta "8080" para "1234".

- Abra o pom.xml do componente DexSandwich-ear, procure pela tag "outputDirectory" e altere o caminho para que ao compilar o pacote ear seja copiado na pasta de "deployments" do seu servidor, automaticamente.

- Realize a compilação do projeto (na raíz) através do Apache Maven.

- Realize o download do servidor HTTP "nginx" (no projeto foi utilizado o nginx 1.15.9). Após realizar o download, abra o arquivo "nginx.conf". Nesse arquivo você irá encontrar algumas configurações do servidor. Realizar as seguintes configurações:
  - Criar dentro do diretório "logs" um diretório específico para seu projeto. Nesse caso, os logs de acesso, poderão ser encontrados nessa pasta.
  - Descomentar as linhas de "log_format  main"
  - Nos dois "access_log" especificar o caminho o local em que deseja guardar os logs de acesso do "nginx". Lembrando que no item acima foi criado um diretório específico para isso.
  - Em "server_name" manter o valor "localhost".
  - Dentro de "location /" coloque a diretiva "proxy_pass" com o valor "http://127.0.0.1:1234;" (Exemplo: "proxy_pass  http://127.0.0.1:1234;"
  
Esse servidor irá redirecionar as requisições da porta 80, para o server-side.

- Suba o servidor "nginx" e o servidor de aplicação.

- Entre com o endereço http://localhost:80/dexsandwich-war para acessar a aplicação no browser.

### Instruções para executar os teste unitários (JUnit)
- Foi implementada uma classe de testes, chamada "ApplicationTest" que pode ser encontrada no pacote "br.com.dexsandwich.tests" do projeto. 

- Entrar na classe "ApplicationTest" clicar com o botão direito do mouse dentro da classe, selecionar a opção "Run As" e clicar em "JUnit Test". Isso fará com que todos os testes sejam executados e abrirá uma janela no eclipse, mostrando se os testes foram realizados com sucesso ou não. Caso, algum teste não esteja correto, esse console mostrará o motivo do teste ter falhado.

### Instruções para utilização do Jenkins
- Realizar o download e instalação do Jenkins. O Jenkins utilizado no projeto foi o Jenkins 2.150.3.
- Após instalar e se autenticar no Jenkins, será necessário a criação de um "Job", selecionando a opção "Novo Job".
- Insira um nome para o "Job" (nesse projeto foi criado com o nome "DexSandwich"), e selecione a opção "Construir um projeto de software free-style".
- Após inserir o nome do "job", aparecerá a tela de configuração do mesmo. A configuração do "job" para esse projeto foi a seguinte:
  - Aba "General": foi colocado apenas uma descrição do "job".
  - Aba "Gerenciamento de código fonte": foi selecionado a opção "Git" e inserido o link do repositório do projeto no github.
  - Aba "Trigger de builds" foi selecionado a opção "Construir periodicamente" e colocado no campo "Agenda" o valor H H * * * (significando que o job será executado uma vez por dia, todos os dias).
  - Aba "Build", seleciona a opção "Chamar alvos do Maven de alto nível", colocar no campo "Goals" o valor "clean install" e no campo "POM" o caminho que contém o "pom.xml" principal do projeto.
  
 # Entregáveis
 ##### Fácil:
 - [ ] Implementação dos requisitos
 - [ ] Instruções para executar
 
 ##### Médio:
 - [x] Implementação dos requisitos
 - [x] Relatório de justificativas para escolha do design de código
 - [x] Instruções para executar
 
 ### Difícil:
 - [x] Implementação dos requisitos
 - [x] Relatório de justificativas para escolha do design de código
 - [x] Os testes automatizados devem ser executados por algum modelo de integração contínua
 - [x] O ambiente de execução da aplicação deve possuir um HTTP Proxying com nginx, redirecionando as requisições da porta 80 para o server-side
 - [ ] Ambiente virtualizado em Docker com scripts para execução do projeto
 
 O projeto desenvolvido atendeu todos os requisitos do nível de complexidade Médio. Também atendeu os requisitos do nível de complexidade Difícil, faltando apenas o requisito "Ambiente virtualizado em Docker".
