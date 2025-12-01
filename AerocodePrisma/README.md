# AerocodePrisma — Medição de Métricas

Este repositório contém uma API em Node.js (Express) com persistência via Prisma e um pequeno script cliente para medir três métricas de desempenho:

- tempoProcessamento: tempo medido no servidor (controller) e retornado via endpoint `/metricas`;
- tempoResposta: tempo total do pedido (round-trip) medido no cliente com `performance.now()`;
- latência: estimativa do tempo de rede/overhead, calculada como `tempoResposta - tempoProcessamento`.

O objetivo é permitir medições simples para 1, 5 e 10 usuários simultâneos (script `src/metricasTest.js`).

**Observação:** este README descreve como preparar o banco de dados (MySQL), gerar o cliente Prisma, iniciar a API e executar os testes de métrica localmente.

## Tecnologias

- Node.js
- Express
- Prisma (ORM)
- MySQL (exemplo de banco)
- Vite + React (frontend do projeto, em `src/`)
- Ferramentas: `npm`, `npx`, `git`

## Pré-requisitos

- Git
- Node.js (recomendado >= 16)
- npm (ou yarn)
- MySQL (local)

## Passo a passo — Instalação e execução (Windows PowerShell)

1) Clone o repositório

```powershell
git clone <URL-DO-REPO>
cd <nome-do-diretório-clonado>
```

2) Instale dependências do projeto

```powershell
cd c:\Users\LG\Desktop\AV3pristeste\AV3\AerocodePrisma
npm install
```

3) Preparar o banco de dados

Opção A — MySQL local (já instalado)

- Inicie o serviço do MySQL (se necessário) e crie a base:

```sql
-- no cliente MySQL (ou MySQL Workbench):
CREATE DATABASE aerocode;
```

(O projeto espera um MySQL local; use sua instalação local para seguir os passos abaixo.)

4) Configurar variáveis de ambiente

- Crie um arquivo `.env` na raiz do projeto `AerocodePrisma` com a URL do banco (ajuste usuário/senha/porta conforme sua opção):

```env
DATABASE_URL="mysql://aerouser:aeropass@localhost:3306/aerocode"
```

Se você usou MySQL local, substitua `aerouser:aeropass` pelas suas credenciais.

Credenciais padrão do sistema (para testes)

- Usuário: `admin@`
- Senha: `admin@`

Use estas credenciais apenas em ambiente de desenvolvimento/avaliação.

5) Gerar cliente Prisma e aplicar migrations

```powershell
npx prisma generate
npx prisma migrate dev --name init
```

> Se for só testar sem persistência, você pode pular as migrations, mas o projeto usa Prisma nas rotas.

6) Iniciar a API (backend)

```powershell
# roda o servidor express definido em server.js
npm run start:api
# ou alternativamente
node server.js
```

Por padrão o `server.js` no projeto escuta a porta 4000 (ver mensagem no terminal ao iniciar).

7) Iniciar o frontend (opcional)

O frontend está configurado com Vite. Em outro terminal, na mesma pasta do projeto:

```powershell
npm run dev
```

Abra a URL que o Vite mostrar no terminal (ex.: `http://localhost:5173`).

8) Executar o script de métricas

Com a API rodando, execute:

```powershell
node src/metricasTest.js
```

O script fará três execuções: 1, 5 e 10 requisições paralelas ao endpoint `/metricas` e imprimirá as médias e detalhes em tabelas no console.

Se o servidor estiver em outra porta, edite `BASE` em `src/metricasTest.js` para `http://localhost:<porta>`.

## Comandos úteis (resumo)

```powershell
# instalar dependências
npm install

# preparar prisma
npx prisma generate
npx prisma migrate dev --name init

# iniciar API
npm run start:api

# iniciar frontend (vite)
npm run dev

# rodar testes de métrica
node src/metricasTest.js
```

## Detalhes sobre as métricas

- `tempoProcessamento`: medido no servidor com `performance.now()` dentro do controller e retornado via JSON.
- `tempoResposta`: medido no cliente (script) entre o envio da requisição e o recebimento completo da resposta.
- `latencia`: estimativa de tempo de rede/overhead, calculada como `tempoResposta - tempoProcessamento`.

Cada execução do script mostra os valores individuais por requisição e a média por cenário (1, 5 e 10). Recomenda-se repetir cada cenário algumas vezes e usar a média das execuções para reduzir ruído.

## Problemas comuns

- Erro de conexão com o DB: verifique `DATABASE_URL` no `.env` e se o MySQL está aceitando conexões na porta correta.
- `prisma migrate` pede senha: confirme as credenciais e que o banco foi criado.

## Observações sobre a interface (GUI)

- O botão `Salvar` localizado na `Sidebar` do frontend é o botão que grava/atualiza alterações realizadas na interface diretamente no banco de dados. Sempre utilize esse botão após criar/editar registros para persistir as mudanças.
