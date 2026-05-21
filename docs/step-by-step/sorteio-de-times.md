# Sorteio de Times — Step by Step

## Etapa 1 — Projeto base

- **Comando:** `npx create-next-app@latest` com App Router, TypeScript, Tailwind e `src/`.
- **Dependência extra:** `lucide-react` para ícones.

## Etapa 2 — Estrutura criada

| Caminho | Função |
|---------|--------|
| `src/app/page.tsx` | Página única com lógica de sorteio, botões e resultado |
| `src/app/layout.tsx` | Metadados, fontes e script anti-flash de tema |
| `src/app/globals.css` | Tema claro/escuro, animações e variante `dark` |
| `src/components/TeamInput.tsx` | Card e textarea de times |
| `src/components/PlayerInput.tsx` | Card e textarea de jogadores |
| `src/components/ResultCard.tsx` | Card de par jogador ↔ time |
| `src/components/ThemeToggle.tsx` | Alternância claro/escuro |
| `src/components/ThemeScript.tsx` | Aplica tema antes da hidratação |
| `src/components/Toast.tsx` | Feedback “Resultado copiado” |
| `src/hooks/usePersistedLists.ts` | Persistência das listas no `localStorage` |
| `src/hooks/useTheme.ts` | Tema persistido e aplicado na `<html>` |
| `src/utils/shuffle.ts` | Embaralhamento Fisher-Yates |
| `src/utils/parseLines.ts` | Normalização de linhas (trim, vazias) |
| `src/utils/draw.ts` | Associação 1:1 após embaralhar |
| `src/utils/formatResult.ts` | Texto para copiar (`Jogador - Time`) |
| `src/types/index.ts` | Tipos compartilhados |

## Etapa 3 — Regras de negócio

1. Cada linha = um item; linhas vazias ignoradas; espaços extras removidos.
2. Jogadores não podem exceder a quantidade de times.
3. Sorteio embaralha times e jogadores e associa por índice (sem repetição).
4. Times sobrando não entram no resultado.
5. “Embaralhar novamente” reutiliza as mesmas listas digitadas.
6. “Limpar” zera textareas, resultado e `localStorage` das listas.

## Etapa 4 — Deploy

- Compatível com Vercel (`npm run build`).
- Sem backend; 100% frontend.

## Decisões arquiteturais

- **Sem biblioteca de UI:** apenas Tailwind para manter o bundle leve.
- **Hooks separados:** tema e listas isolados para reuso e testes futuros.
- **Client Components** apenas onde há estado (`page`, inputs, tema, toast).
