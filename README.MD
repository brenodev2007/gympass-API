#App

Gympass style App

## RFs (Requesitos funcionais)

- [x] deve ser possível criar uma conta
- [x] deve ser possível fazer login
- [x] deve ser possível obter o perfil de um usuário logado
- [x] deve ser possível obter o número de check-ins realizados pelo usuário logado
- [x] deve ser possível o usuário obter seu histórico de check-ins
- [x] deve ser possível o usuário buscar academias próximas
- [x] deve ser possível o usuário buscar academias pelo nome
- [x] deve ser possível o usuário realizar check-in em uma academia
- [] deve ser possível validar o check-in do usuário
- [x] deve ser possível cadastrar uma academia

## RNs (Regras de Negócio )

- [x] o usuário não deve poder se cadastrar com o email duplicado
- [x] o usuário não pode fazer mais de 2 check-ins por dia
- [x] o usuário não pode fazer check-in se não estiver perto (100m) da academia
- [] o check-in só pode ser validado até 20 minutos após criado
- [] o check-in só pode ser validado por administradores
- [] a academia só pode ser cadastrada por administradores

## RNFs (Requesitos não funcionais)

- [x] A senha do usuário precisa estar criptografada
- [x] os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [x] Todas as listas de dados precisam estar páginas com 20 itens por páginas
- [] o usuário deve ser indentificado por um JWT token
