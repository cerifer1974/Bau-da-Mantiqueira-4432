# Baú da Mantiqueira — direção editorial

Home web responsiva, autoral e acolhedora. Premium pelo cuidado, pela fotografia verdadeira e por histórias concretas — não pela promessa de luxo.

## Linguagem visual
- Papel quente #f6f3eb, verde-musgo #303c31, terracota #9c563b, tinta #2c332b.
- Cormorant Garamond para títulos (regular e itálico), Manrope para leitura e navegação.
- Fotografias reais do Airbnb, sem imagens de banco ou geradas. Paisagem com Pedra do Baú abre a página; ambientes mostram a personalidade real.
- Margens amplas, composição editorial assimétrica, linhas finas, cantos retos e botões discretos. Nada de grades de benefícios genéricos.
- Animação de entrada suave, respeitando prefers-reduced-motion.

## Página e fluxos
- Home em pages/home.tsx, composição em pages/index.tsx.
- Âncoras: acomodações, histórias, avaliações, chegada e reservas.
- Seletor Casa/Loft mostra especificações e fotografia correta; galeria em diálogo com setas e teclado.
- Reservar abre o anúncio Airbnb correspondente. Nenhuma referência a preços.
- Contato usa telefone verificado no Maps; Instagram e rota nos links fornecidos.
- FAQ esclarece áreas externas compartilhadas e estrada mista, sem prometer isolamento total.

## Arquitetura
Apenas frontend web. Nenhuma nova rota API, autenticação ou tabela. Mantém o template Bun/Vite/React/Hono e analytics padrão. Projeto gerenciado criado com sucesso em /home/user/bau-mantiqueira-gerenciado, com provisionamento concluído via app_init. Código, imagens e fontes transferidos da home anterior; arquivos e configurações gerenciados preservados do novo projeto. Sem encaminhamento de portas: dev server na porta atribuída em __ports.cjs.

## Veracidade
Fontes: Airbnb Casa 6353169, Loft 20274293 e Google Maps fornecido. Consultados em 23/10/2026. Instagram retornou 429. Avaliações citadas literalmente e atribuídas. Capacidades: Casa 6 hóspedes/3 quartos/3 banheiros; Loft 4 hóspedes/1 quarto/1 banheiro. Há outras unidades e áreas comuns no sítio; deixar explícito.