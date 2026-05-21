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

1. Importe o repositório em [vercel.com/new](https://vercel.com/new)
2. **Framework:** Next.js (detectado automaticamente)
3. **Root Directory:** `.` (raiz do repositório)
4. **Build Command:** `npm run build` (padrão)
5. Nome do projeto: use `sorteio-de-times` (o domínio `eafc.vercel.app` já pertence a outro app)

```bash
npx vercel
```

### Erro 404 NOT_FOUND na Vercel

Esse erro costuma significar que **não existe deploy** na URL acessada (link antigo, preview expirado ou projeto errado).

- Abra o [dashboard da Vercel](https://vercel.com/dashboard) → seu projeto → **Deployments** → clique no deploy **Ready** → use a URL gerada (ex.: `sorteio-de-times.vercel.app`)
- Confirme que o repositório `eduardovfo/eafc` está conectado e o último deploy passou no build
- Não use `eafc.vercel.app` — é outro site (EAFC24)
