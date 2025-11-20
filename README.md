# Sistema de Recomendação RD Station

Este projeto demonstra um sistema simples de recomendação de produtos. O foco é aplicar conceitos fundamentais de sistemas de recomendação em um cenário limitado da relação das caracteristicas dos produtos da RD station.

## Objetivo

Dado um conjunto de produtos com listas de preferências e funcionalidades, o sistema calcula quais produtos melhor atendem aos critérios selecionados pelo usuário.

## Tipos de Recomendação

- SingleProduct: retorna apenas 1 produto com maior pontuação (score). Em caso de empate, o último produto que atingiu o maior score é retornado.
- MultipleProducts: retorna todos os produtos com score > 0 ordenados de forma decrescente pelo score. Empates mantêm a ordem relativa original.

## Cálculo do Score

Para cada produto:

- score = (nº de preferências que casam) + (nº de features que casam)
- Preferências e features ausentes no formulário são tratadas como arrays vazios.
- Produtos com score 0 são descartados no modo MultipleProducts.

## Regras de Empate

- SingleProduct: prioridade ao último produto avaliado com o maior score.
- MultipleProducts: todos os empatados permanecem e são exibidos na ordem original após ordenação estável por score.

## Estrutura Principal

- `src/services/recommendation.service.js`: contém a função `getRecommendations(formData, products)` que implementa a lógica principal.
- `src/services/recommendation.service.test.js`: testes que validam cenários de pontuação, empates, fallback e casos extremos.

## Fluxo Simplificado

1. Usuário seleciona preferências e/ou funcionalidades.
2. Form gera `formData` com:
   - selectedPreferences
   - selectedFeatures
   - selectedRecommendationType
3. Serviço calcula scores e aplica regras conforme o tipo.
4. Retorno é usado para renderizar lista ou item recomendado.
