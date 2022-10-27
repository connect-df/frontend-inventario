# InventarioConnect tecnologias

- Este projeto foi desenvolvido com [Angular CLI](https://github.com/angular/angular-cli) version 14.2.6.
- Para o designer foi usado a biblioteca PrimeNG [PrimeFaces](https://primefaces.org/primeng/setup).

## Servidor de Desenvolvimento

- Use `ng serve` para acessar o servidor de desenvolvimento. Vá para `http://localhost:4200/`. 
- O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.

## Codigo estrutural

-Use `ng generate component component-name` para gerar o novo componente. Você também pode usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Construtor

- Use `ng build` para construir o Projeto. A build é armazenada no `dist/`.

## Testes Unitários

- Use `ng test` para executar testes unitários via [Karma](https://karma-runner.github.io).

## Git
- Ao clonar esse projeto você precisará, antes de qualqueer coisa dar um `npm install` para assim ser possível usar todas as dependêcias e bibliotecas. 

===========================================================================================================================

## Sobre o projeto

- É um sistema de inventário básico.

- Em sua primeira versão será possivel:
  - Cadastrar itens atribuindo, código (Que será o QRcode), local, responsável, valor, tipo de produto e o estado (novo, usado) em que ele se encontra. 
  -Ler QRcode, se já houver o código, editar o item ou conferir os dados, se não houver, cadastra-lo. 