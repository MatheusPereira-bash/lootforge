# LootForge

## Integrantes

- Matheus Pereira
- Otavio Augusto

LootForge é uma landing page inspirada em MMOs: uma roleta de skins satírica.

No produto, o usuário deposita saldo, paga para girar e pode perder tudo no giro. Se ganhar uma skin, ainda precisa pagar o valor de resgate dela. A ideia é representar uma mecânica propositalmente injusta, com foco em experiência visual e navegação.

A roleta tem 20 casas, sendo 7 com skin, o que dá 35% de chance de prêmio por giro. O resultado é sorteado e a roda é animada até a casa sorteada.

> Projeto acadêmico: nenhuma cobrança ou transação real é processada. Todo o fluxo de depósito, giro e resgate acontece apenas no navegador.

## Arquitetura escolhida

Foi utilizada a arquitetura **FSD (Feature-Sliced Design)**, separando o projeto por camadas e responsabilidade:

- `app`: composição principal da aplicação e estilos globais.
- `pages`: tela da landing page.
- `features`: funcionalidade da roleta (roda animada, depósito, giro e pagamento de resgate).
- `entities`: componentes de domínio (card de skin).
- `shared`: dados, configurações e utilitários reutilizáveis.

## Jornada de construção

### Ideia inicial

A ideia inicial era criar uma landing page de venda de skin premium com CTA de compra.

Durante o planejamento, o conceito evoluiu para uma proposta mais criativa: uma roleta que cobra no giro e no resgate, em tom de sátira sobre monetização agressiva em jogos.

Alternativas consideradas:

- Loja direta de skins;
- Cobrança de itens;
- Roleta de itens com risco e perda de saldo (escolha final).

### Pesquisa e referências

Foram analisadas referências de:

- Landing pages de jogos com destaque para hero section forte;
- Interfaces de loja in-game;
- Estruturas de páginas de conversão com FAQ e prova social.

Elementos aproveitados:

- Hero com título grande e CTA claro;
- Cards para benefícios e skins;
- Bloco de oferta/preço;

### Ferramentas utilizadas

- React
- Vite
- CSS Modules
- VS Code / OpenCode
- GitHub

### Uso de IA

Modelos utilizados:

- GPT 5.3 (via OpenCode)
- Claude

Como foi utilizado:

- Estruturação inicial do projeto em FSD;
- Organização das seções da landing page;
- Lógica do CTA funcional (depositar, girar, perder/ganhar, pagar resgate);
- Roleta animada em SVG;
- Revisão de texto, acentuação e pontuação.

### Evolução da solução

Mudanças entre a ideia inicial e a versão final:

- Mudança de uma página de venda tradicional para uma proposta satírica;
- Inclusão de uma roleta interativa como CTA principal;
- Roleta com roda animada e probabilidade coerente com as casas;
- Ajuste de paleta para estilo fantasy/arcade (azul escuro + dourado);
- Reorganização da narrativa da página: proposta -> benefícios -> skins -> funcionamento -> prova social -> oferta -> CTA -> FAQ;
- Separação do código por camadas FSD para melhor manutenção.

### Resultado final

O resultado final atende aos requisitos da atividade:

- Identidade visual definida;
- Produto e proposta apresentados;
- Hero section;
- Benefícios e diferenciais;
- Representação visual de skins;
- Explicação de funcionamento;
- Avaliações de jogadores;
- Oferta/preço;
- FAQ;
- CTA funcional com roleta animada.

Se houvesse mais tempo, os próximos passos seriam:

- adicionar sons e partículas ao giro;
- criar variações de estado visual para raridade de skin;

## Como executar

```bash
npm install
npm run dev
```
