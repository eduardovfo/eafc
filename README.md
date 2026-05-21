# Sorteio de Times

Webapp para sortear jogadores em times de forma justa — 100% no frontend, pronto para deploy na [Vercel](https://vercel.com).

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- lucide-react

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Build de produção

```bash
npm run build
npm start
```

## Funcionalidades

- Cole times e jogadores (um por linha)
- Sorteio com embaralhamento sem repetição
- Validação: jogadores ≤ times
- Copiar resultado para a área de transferência
- Modo claro / escuro
- Listas salvas automaticamente no `localStorage`

## Deploy na Vercel

Conecte o repositório Git ou use a CLI:

```bash
npx vercel
```
