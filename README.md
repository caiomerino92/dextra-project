# Teste Dextra
Este repositório contém o projeto desenvolvido para solucionar o teste técnico Dextra.

O projeto foi desenvolvido com JavaEE, Java 8, servidor de aplicação Wildfly e Apache Maven para gerenciar as dependências e automatizar builds.

No frontend foi utilizado HTML, CSS, Bootstrap (como na descrição do projeto não foi mencionado a restrição do uso desse framework, foi decidido utilizá-lo para criar uma interface mais amigável) e jQuery/Javascript.

### Estrutura do projeto
- DexSandwich (Raíz do projeto)
  - DexSandwich-ear (Contém o ear gerado após compilação, para ser deployado no servidor de aplicação)
  - DexSandwich-ejb (Camada de negócio)
    - Classes com a implementação dos serviços chamados na camada web
  - DexSandwich-jar (Contém as entidades criadas)
    - Classes que definem as entidades criadas
  - DexSandwich-war (Camada web)
    - Arquivos html, js, css e os serviços
    
### Serviços
1-) Serviço responsável por obter as informações dos lanches do cardápio
  - GET - http://localhost:8080/dexsandwich-war/rest/application/getSandwichesInfo

2-) Serviço responsável por obter as inforamações dos ingredientes para montagem de lanches
  - GET - http://localhost:8080/dexsandwich-war/rest/application/getIngredientsInfo
  
3-) Serviço responsável pelo cálculo dos preços de lanches selecionados do cardápio
  - POST - http://localhost:8080/dexsandwich-war/rest/application/calculateSandwichTotalPrice
  
4-) Serviço responsável pelo cálculo dos preços do lanche personalizado (incluindo as promoções, caso exista)
  - POST - http://localhost:8080/dexsandwich-war/rest/application/calculateCustomizedTotalPrice
  
### Instruções para executar o projeto
- Realize o clone do repositório e faça o import no Eclipse. Para realizar o import, basta ir em File > Import e selecionar a opção "Existing Maven Project" apontando para a raíz do projeto.

- Realize o download do servidor de aplicação WildFly 16.0.0 e configure o servidor no Eclipse. Para realizar essa configuração, basta ir na aba "Servers", adicionar um novo servidor e selecionar a opção "WildFly 8.x" apontando para a raíz do diretório de instalação (do servidor).

- Abra o pom.xml do componente DexSandwich-ear, procure pela tag "outputDirectory" e altere o caminho para que ao compilar o pacote ear seja copiado na pasta de "deployments" do seu servidor, automaticamente.

- Realize a compilação do projeto (na raíz) através do Apache Maven.

- Suba o servidor de aplicação.

- Acesse o endereço http://localhost:8080/dexsandwich-war para acessar a aplicação no browser.

### Instruções para executar os teste unitários (JUnit)
- Foi implementada uma classe de testes, chamada "ApplicationTest" que pode ser encontrada no pacote "br.com.dexsandwich.tests" do projeto. 

- Entrar na classe "ApplicationTest" clicar com o botão direito do mouse dentro da classe, selecionar a opção "Run As" e clicar em "JUnit Test". Isso fará com que todos os testes sejam executados e abrirá uma janela no eclipse, mostrando se os testes foram realizados com sucesso ou não. Caso, algum teste não esteja correto, esse console mostrará o motivo do teste ter falhado.

