# Teste Dextra
Este repositório contém o projeto desenvolvido para solucionar o teste técnico Dextra.

O projeto foi desenvolvido com JavaEE, Java 8, servidor de aplicação Wildfly e Apache Maven para gerenciar as dependências e automatizar builds.

No frontend foi utilizado HTML, CSS, Bootstrap (como na descrição do projeto não foi mencionado a restrição do uso desse framework, foi decidido utilizá-lo para criar uma interface mais amigável) e jQuery/Javascript.

### Estrutura do projeto
- DexSandwich (Ráiz do projeto)
  - DexSandwich-ear (Contém o ear gerado após compilação, para ser deployado no servidor de aplicação)
  - DexSandwich-ejb (Camada de negócio)
    - Classes com a implementação dos serviços chamados na camada web
  - DexSandwich-jar (Contém as entidades criadas)
    - Classes que definem as entidades criadas
  - DexSandwich-war (Camada web)
    - Arquivos html, js, css e os serviços
    
### Serviços
GET - http://localhost:8080/dexsandwich-war/rest/application/getsandwichesinfo (responsável por obter as informações dos lanches do cardápio)
GET - http://localhost:8080/dexsandwich-war/rest/application/getingredientsinfo (responsável por obter as inforamações dos ingredientes para montagem de lanches)

