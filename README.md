# Teste Dextra
Este repositório contém o projeto desenvolvido para solucionar o teste técnico Dextra.

O projeto foi desenvolvido com JavaEE, Java 8, servidor de aplicação Wildfly e Apache Maven para gerenciar as dependências e automatizar builds.

No frontend foi utilizado HTML, CSS, Bootstrap (como na descrição do projeto não foi mencionado a restrição do uso desse framework, foi decidido utilizá-lo para criar uma interface mais amigável) e jQuery/Javascript.

### Estrutura do projeto
- DexSandwich (Ráiz do projeto)
  - DexSandwich-ear (Contém o ear gerado após compilação, para ser deployado no servidor de aplicação)
  - DexSandwich-ejb (Camada de negócio)
  - DexSandwich-jar (Contém as entidades criadas)
  - DexSandwich-war (Camada web)

