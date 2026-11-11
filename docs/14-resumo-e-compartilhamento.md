# Resumos dos casos e compartilhamento — 11/11/2026

Os quatro estudos de caso agora começam com uma visão rápida do desafio, da contribuição e da decisão central. O conteúdo resume informações já presentes nos casos, sem acrescentar resultados ou atribuir entregas coletivas apenas ao autor. O texto completo, os limites e as evidências continuam disponíveis abaixo. Os resumos são gerados em português e inglês e permanecem legíveis sem JavaScript.

Dois atalhos levam ao problema e às evidências. Um botão copia a rota do caso, priorizando o endereço canônico quando configurado e removendo busca e fragmento. A página anuncia o resultado no idioma atual. Se o navegador recusar ou não oferecer a área de transferência, o endereço aparece como texto selecionável. O botão fica oculto sem JavaScript e impede solicitações de cópia simultâneas.

O item Stack do cabeçalho também passa a acompanhar a seção de tecnologias, pelo mesmo mecanismo usado nas demais seções.

## Validação

`npm run build`, `npm run check` e `npm test` passaram. O build verificou 16 páginas, 880 referências locais/âncoras e 1.722 textos e atributos para tradução. Os dez testes incluem os seis testes HTTP existentes e quatro cenários de compartilhamento: rota e idioma, endereço canônico, recusa/ausência de clipboard e cliques simultâneos.

A prévia HTTP iniciou, mas o navegador remoto retornou `ERR_CONNECTION_REFUSED` ao acessar o endereço local deste ambiente. A inspeção visual e os cliques reais desta rodada não foram concluídos. O CSS novo contém uma coluna no celular, três em telas maiores e ações com quebra de linha; esse comportamento ainda precisa de conferência visual. Os testes de compartilhamento são testes unitários com dependências simuladas e não substituem a permissão real do navegador.
