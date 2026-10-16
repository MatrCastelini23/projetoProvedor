# Projeto para controle de revendedores de linhas, A.K.A provedores.


## Propósito:

Este projeto surgiu da necessidade da operadora para controlar seus parceiros provedores, os mesmo revendem as linhas de telefone fixo (DID) através das nossas rotas SIP. <br>
Então o próposito deste projeto é apenas o cadastro de provedores, seus clientes com seus DIDs e os planos que eles contrataram para que haja transparencia no fechamentos mensais.

## Workflow:

O fluxo de trabalho do sistema é simples: 

> Cadastro do provedor -> Cadastro de seus cliente + DID(s) -> Relatório mensal com descritivo.

Todo provedor precisar seguir um plano, caso o plano não exista, há possibilidade de adicionar o plano seguindos: 

> Planos -> Cadastrar Novo Plano

Caso o provedor queira novo plano ou renegociação terá a possibilidade de edita-lo na pagina de detalhes do provedor (em breve).

## Conclusão:

O Sistema é simples e extremamente personalizado para o cenário que me encontro atualmente. Então as regras de negócio, as decições de arquitetura e os fluxos de trabalho possivelmente podem parecer amador aos olhos de quem vê de fora (e possivelmente eu também acredite nisso quando finalizar o sistema). Mas até o momento, por mais que seja overEngineering da minha parte, o sistema está se torando um ótimo quebra galho. 