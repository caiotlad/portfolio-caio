# Interações e continuidade — 11/11/2026

## Novas interações

A navegação ganhou busca de projetos e seções pelo botão com lupa no cabeçalho ou por Ctrl+K / Command+K. A busca ignora acentos, combina palavras, informa a quantidade de resultados e oferece estado vazio. Setas percorrem os resultados, Enter abre o primeiro resultado a partir do campo e Escape fecha. O diálogo usa foco modal nativo e devolve o foco ao acionador; âncoras da mesma página transferem o foco à seção escolhida.

O rodapé contém uma pista discreta sobre a paleta, com pequenas amostras verdes e sem antecipar o personagem. O clique revela Rayquaza em um diálogo com entrada, flutuação suave e órbitas. A descoberta não aparece na busca. Escape, botão de fechar ou clique no fundo fecham a revelação. A imagem só recebe `src` na primeira abertura; fechar interrompe as animações do diálogo.

A ilustração é oficial, obtida de https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/384.png e vinculada à [Pokédex oficial](https://www.pokemon.com/pokedex/rayquaza). É carregada remotamente e depende da disponibilidade desse endereço. Uma falha mostra uma mensagem e um link para o original. Sem JavaScript, a pista abre diretamente a ilustração. Não é uma criação visual própria do portfólio.

Também foram adicionados retorno ao topo com progresso circular, brilho de passagem nos botões principais e transições entre páginas nos navegadores com suporte a View Transitions. Os efeitos respeitam a preferência por movimento reduzido. Os controles auxiliares não aparecem na impressão.

Arquivos principais: `src/components/interactions.mjs`, `src/scripts/interactions.js`, `src/styles/global.css`, `src/scripts/site.js` e `src/components/layout.mjs`.

## Conferência desta rodada

| Verificação | Resultado observado |
| --- | --- |
| Revelação em desktop e 390 px | Imagem oficial carregada, conteúdo legível e fechamento disponível |
| Busca em 320 × 568 e 320 × 400 px | Ajustados título, área de resultados e posição do fechamento; sem corte horizontal do diálogo |
| Revelação em 320 × 400 px | Rolagem interna disponível, fechamento visível no topo |
| Cabeçalhos em 768 e 320 px | Lupa, navegação e marca couberam sem sobreposição |
| Busca por `curriculo`, termo inexistente e `olist` | Correspondência sem acento, estado vazio e navegação ao estudo de caso corretos |
| Setas, Enter e Escape | Resultado recebeu foco; seção `#sobre` recebeu foco após seleção; fechamento restaurou o acionador |
| Troca da surpresa para a busca com Ctrl+K | Fechamento da busca devolveu foco à pista do rodapé |
| Movimento reduzido | Imagem carregada com zero animações em execução no diálogo |
| Retorno ao topo | Rolagem voltou a zero e foco foi transferido a `main` |
| Respostas HTTP pelo navegador | Oito páginas responderam 200; rota inexistente respondeu 404; novo módulo respondeu JavaScript com HTTP 200 |
| `npm run check` e `npm run build` | Aprovados: oito páginas, 281 links/assets/âncoras locais |
| `npm test` | Nova tentativa falhou em `fetch failed` nas seis verificações; permanece a limitação de conexão do terminal descrita no registro 09 |

As capturas foram examinadas durante a sessão e não estão salvas como arquivos independentes. As alterações não modificam métricas, datas ou atribuições dos projetos. Não houve publicação do site.

## Continuar em outra máquina

Instale Git e Node.js 22.12 ou superior. Clone o repositório privado autenticado na sua conta e abra a pasta clonada. Não há dependências npm para instalar.

```sh
npm run check
npm run build
npm test
npm run dev
```

O desenvolvimento abre em http://127.0.0.1:4321/. Após editar, recarregue a página. O watcher acompanha `src/` e `public/`; mudanças no servidor exigem reiniciar o comando.

`dist/` é gerado pelo build. `.work/`, dependências, arquivos `.env` e o currículo PDF original não são versionados. O currículo revisado permanece disponível no código da página web. A documentação histórica continua em `docs/`; leia README e os registros 08–10 antes de retomar o trabalho.

Para registrar e enviar alterações futuras:

```sh
git add src public scripts tests docs README.md package.json
git commit -m "Descreva a alteração"
git push
```
