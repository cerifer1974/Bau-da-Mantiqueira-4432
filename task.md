# Migração para projeto gerenciado
- [x] app_init concluído com sucesso (novo projeto).
- [x] Home, CSS, HTML, fotografias, fontes e fontes de conteúdo transferidos sem alterações visuais.
- [x] Configurações, .env e arquivos gerenciados preservados do novo projeto; sem copiar proxy da prévia antiga.
- [x] Build/lint concluídos. Build tem apenas aviso de chunk >500kB do runtime gerenciado.
- [x] Servidores antigos desta home e proxy 8080 parados; novo projeto iniciado via bun run dev na porta atribuída 4200. kill:port não estava disponível por falta de lsof, mas Vite iniciou normalmente com strictPort.
- [x] Health endpoint retorna status ok. Testes em 1440/768/390/375px, links corretos, galeria modal/setas/escape, menu mobile e FAQ aprovados; sem overflow, imagens quebradas ou erros de console.
- [ ] Entregar novo artefato gerenciado. Não afirmar disponibilidade do botão Publicar sem confirmação na interface do usuário.