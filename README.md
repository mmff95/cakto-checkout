# Teste Front-End Cakto — [Marlon Felix]

Checkout de produto único com dados pessoais, escolha de forma de pagamento (PIX ou cartão em até 12x) e resumo do pedido com cálculo de taxas em tempo real.

---

## Decisões Técnicas

O projeto foi estruturado em **Next.js 16** (App Router) com componentes reutilizáveis em `src/components/ui/` (Button, Card, Input, Typography, Spinner, etc.) e blocos de negócio em `src/components/common/` (CheckoutForm, CheckoutProductCard, CheckoutPersonalDataCard, CheckoutPaymentCard, CheckoutOrderSummaryCard). Cada componente segue o padrão com arquivos de tipos (`.types.ts`), estilos (`.styles.ts` com Tailwind/tailwind-variants) e barrel `index.ts` para imports limpos.

A validação do formulário usa **React Hook Form** com **Zod** (`@hookform/resolvers`), centralizada no schema `checkoutFormSchema` em `src/schemas/checkout.ts`. O estado do formulário é controlado por um único `FormProvider` no `CheckoutForm`; os valores são observados com `watch()` para atualizar o resumo (taxa, valor líquido do produtor, economia no PIX) em tempo real sem re-submissão. A lógica de taxas (PIX 0%, cartão 1x 3,99%, parcelado 4,99% + 2% por parcela extra) e formatação em BRL ficam em `src/support/checkout-fees.ts` e `src/support/mask.ts`, facilitando testes unitários e manutenção.

O layout é responsivo (mobile-first, coluna única; em telas maiores, resumo e botão “Finalizar compra” fixos à direita). O preço exibido ao comprador é sempre o preço do produto; a taxa é calculada e descontada do valor repassado ao produtor, garantindo que o comprador pague apenas o valor fixo e as regras de negócio fiquem explícitas no código e nos testes.

---

## Transparência de Uso de IA

**Como usei IA:** 

Utilizei o Cursor como ferramenta de apoio durante o desenvolvimento. Com ele, obtive ajuda na escrita do código (componentes, formulário, integração com React Hook Form e Zod), na implementação das funções de máscara para utilização de CPF e nas regras de cálculo de taxas e parcelas (PIX, cartão à vista e parcelado). O Cursor também foi usado para sugerir mensagens de commit a partir do contexto do código e estruturar os testes (Jest e React Testing Library), incluindo validações do schema e da lógica de taxas.

**O que foi decisão ou ajuste manual meu:** 

O que foi decisão ou ajuste manual meu: A definição do contexto do projeto, da arquitetura (organização de pastas, separação entre UI e common, padrão de arquivos por componente), das regras de negócio (preço fixo para o comprador, taxa descontada do produtor) e dos padrões de código (nomenclatura, estrutura de tipos, uso de Tailwind e tailwind-variants) foi realizada por mim.

Toda a estilização dos componentes também foi construída de forma manual, seguindo fielmente o layout enviado, com o objetivo de evitar inconsistências visuais, reduzir riscos na estruturação e garantir maior previsibilidade na manutenção do design system.

Além disso, revisei e ajustei manualmente qualquer código gerado quando necessário, assegurando qualidade, consistência técnica e total aderência às regras de negócio. A definição dos testes e dos cenários de validação também foi uma decisão minha, baseada nas necessidades do projeto e nos possíveis pontos críticos da aplicação.

---

## Regras de Negócio

- **Comprador paga sempre o preço fixo do produto:** 
o valor exibido no resumo e cobrado do comprador é o preço do produto (ex.: R$ 100,00). Não há acréscimo para o comprador em nenhuma forma de pagamento.
- **Taxa descontada do produtor (repasse):** a taxa da plataforma (PIX 0%; cartão 1x 3,99%; cartão parcelado 4,99% + 2% por parcela extra) é aplicada sobre o mesmo preço do produto e descontada do valor repassado ao produtor. O produtor recebe o valor líquido (preço − taxa); o comprador não vê essa taxa no valor final.

Isso foi garantido na UI (resumo mostra “Você paga”, “Taxa” e “Valor líquido ao produtor”), na lógica em `checkout-fees.ts` (taxa e líquido calculados a partir do preço do produto) e nos testes (Jest) que validam fórmulas e schema do checkout.

---

## Como Executar

Siga os passos abaixo para rodar o projeto localmente.

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Testes

```bash
npm test
```

Modo watch (re-executa ao alterar arquivos):

```bash
npm run test:watch
```

---

## Resposta Bônus — Ideias para aumentar a conversão do checkout

- **Confiança:** selos de segurança, ícone de cadeado e texto “Pagamento seguro” próximo ao botão de finalizar.
- **Redução de fricção:** um único passo quando possível; campos opcionais (ex.: CPF) claramente marcados; máscaras e validação em tempo real para menos erros.
- **Clareza no valor:** destacar a economia no PIX (“Você economiza R$ X no PIX”) e o valor das parcelas no cartão (“3x de R$ X sem juros”).
- **Mobile:** botão “Finalizar compra” sempre visível (sticky) e campos grandes para toque; considerar autopreenchimento de e-mail/CPF quando seguro.
