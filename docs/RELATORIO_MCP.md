# Relato breve - Atividade 02

## 1. O que foi analisado e melhorado

Analisamos a landing page do LootForge com foco em tres frentes: funcionamento da roleta (depositar, girar e pagar resgate), responsividade (375px, 768px e 1280px) e acessibilidade (estrutura semantica, foco por teclado e feedback para erros).

| Problema | Severidade | Correcao aplicada | Arquivos alterados |
| --- | --- | --- | --- |
| Deposito invalido sem feedback visivel | Alto | Adicionamos validacao explicita para valor vazio/zero/negativo, `noValidate` no form para evitar bloqueio nativo e mensagem com `role="alert"` + `aria-invalid`. | `src/features/roulette/ui/RouletteCta.jsx`, `src/features/roulette/ui/RouletteCta.module.css` |
| Botao Girar habilitado com resgate pendente | Medio | Desabilitamos o botao de giro quando existe skin pendente, com explicacao via `title`, `aria-describedby` e texto de apoio visivel. | `src/features/roulette/ui/RouletteCta.jsx` |
| Header quebrando em 375px | Medio | Criamos layout compacto para mobile estreito (ocultando links secundarios e mantendo CTA principal sem quebra ruim). | `src/pages/landing/ui/LandingPage.module.css` |
| Grids com item orfao em 768px | Baixo | Ajustamos breakpoint intermediario para 2 colunas em beneficios e skins. | `src/pages/landing/ui/LandingPage.module.css` |
| Falta de skip link | Baixo (A11y) | Incluimos link "Pular para o conteudo" com foco visivel apontando para o `<main>`. | `src/pages/landing/ui/LandingPage.jsx`, `src/pages/landing/ui/LandingPage.module.css` |
| Extra A11y: foco pouco visivel | Extra | Adicionamos `:focus-visible` consistente para links, botoes, input e summary. | `src/app/styles/global.css` |
| Extra A11y: reducao de movimento | Extra | Adicionamos regra `prefers-reduced-motion` para encurtar animacao de giro e remover transicoes de botoes no componente da roleta. | `src/features/roulette/ui/RouletteCta.module.css` |

## 2. MCP utilizado

Utilizamos o **Playwright MCP** para executar os testes no navegador real e gerar evidencias em imagem.

Trecho de configuracao no OpenCode (`opencode.json`):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "playwright": {
      "type": "local",
      "command": [
        "npx",
        "@playwright/mcp@latest"
      ],
      "enabled": true
    }
  }
}
```

## 3. Por que foi escolhido

Escolhemos Playwright MCP porque o fluxo principal do LootForge depende de interacoes de usuario em sequencia (depositar, girar, ganhar/perder e pagar resgate). So lendo codigo seria facil perder comportamentos de estado em tempo real, como mensagens na tela, habilitacao/desabilitacao de botoes e transicoes entre estados. Com o navegador real, conseguimos validar os fluxos do jeito que o jogador usa de fato, alem de testar breakpoints e navegar por teclado na propria interface final.

## 4. Como o MCP contribuiu

O MCP contribuiu em quatro pontos objetivos:

1. Executou os cenarios de roleta: deposito invalido, giro sem saldo, giro com saldo, resgate sem saldo e resgate com saldo.
2. Detectou e confirmou o bug de estado (giro habilitado com resgate pendente) e depois validou a correcao (`spinDisabledWithPending: true`).
3. Validou responsividade em 375/768/1280 com capturas antes/depois.
4. Validou navegacao por teclado e foco visivel (skip link, menu, CTA e input com `outline` aplicado).

No total, geramos **11 screenshots** para evidencias (`docs/evidencias/antes` e `docs/evidencias/depois`).

Comparacoes antes/depois:

### Responsividade

375px  
![antes 375](evidencias/antes/audit-landing-375.png)  
![depois 375](evidencias/depois/audit-landing-375.png)

768px  
![antes 768](evidencias/antes/audit-landing-768.png)  
![depois 768](evidencias/depois/audit-landing-768.png)

1280px  
![antes 1280](evidencias/antes/audit-landing-1280.png)  
![depois 1280](evidencias/depois/audit-landing-1280.png)

### Fluxo de deposito invalido

![antes deposito invalido](evidencias/antes/bug-deposito-invalido-antes.png)  
![depois deposito invalido](evidencias/depois/bug-deposito-invalido-depois.png)

### Fluxo com resgate pendente

![antes giro pendente](evidencias/antes/bug-girar-pendente-antes.png)  
![depois giro pendente](evidencias/depois/bug-girar-pendente-depois.png)

### Skip link visivel

![skip link visivel](evidencias/depois/skip-link-visivel-depois.png)

## 5. Avaliacao critica

O MCP ajudou de verdade a validar estados dinamicos da roleta e comportamentos responsivos que nao ficam evidentes em revisao estatica de codigo. Tambem foi util para confirmar foco por teclado e verificar a arvore de acessibilidade basica.

Limites e pontos que ele nao cobriu completamente:

- Nao fizemos medicao formal de contraste (WCAG) com ferramenta dedicada.
- Nao executamos teste com leitor de tela real (NVDA/JAWS/VoiceOver), apenas validacao por snapshot e atributos ARIA.
- O sorteio da roleta e aleatorio; por isso, os testes de "ganhar skin" exigiram repeticao automatizada para chegar ao estado de resgate.

## 6. Como reproduzir

```bash
npm install
npm run dev
```

Com o servidor rodando em `http://localhost:5173`, repetir auditoria manual:

1. Testar deposito invalido (`0`, vazio ou negativo) e conferir mensagem.
2. Testar giro sem saldo.
3. Depositar saldo e girar ate gerar premio.
4. Com premio pendente, confirmar que `Girar` fica desabilitado.
5. Testar resgate sem saldo e depois com saldo.
6. Validar Tab no inicio para exibir "Pular para o conteudo".
7. Capturar telas em 375, 768 e 1280.

## Arquivos criados

- `docs/RELATORIO_MCP.md`
- `docs/evidencias/antes/audit-landing-375.png`
- `docs/evidencias/antes/audit-landing-768.png`
- `docs/evidencias/antes/audit-landing-1280.png`
- `docs/evidencias/antes/bug-deposito-invalido-antes.png`
- `docs/evidencias/antes/bug-girar-pendente-antes.png`
- `docs/evidencias/depois/audit-landing-375.png`
- `docs/evidencias/depois/audit-landing-768.png`
- `docs/evidencias/depois/audit-landing-1280.png`
- `docs/evidencias/depois/bug-deposito-invalido-depois.png`
- `docs/evidencias/depois/bug-girar-pendente-depois.png`
- `docs/evidencias/depois/skip-link-visivel-depois.png`

## Resumo dos commits

- `e2e6f66` - Exibe erro de deposito invalido
- `28fbe1a` - Bloqueia giro com resgate pendente
- `6610e89` - Ajusta header para mobile 375px
- `b9e2284` - Reequilibra grids no breakpoint tablet
- `2e337a3` - Inclui skip link e reforcos de acessibilidade
