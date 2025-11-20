import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('recommendationService', () => {
  test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  test('Retorna apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('Retorna o último match em caso de empate para SingleProduct', () => {
    const formData = {
      selectedPreferences: [
        'Automação de marketing',
        'Integração com chatbots',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna lista vazia quando não há matches', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(0);
  });

  test('Retorna produtos ordenados por score em MultipleProducts, incluindo empates', () => {
    const formData = {
      selectedPreferences: [
        'Automação de marketing',
        'Integração com chatbots',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations.map((p) => p.name)).toEqual(
      ['RD Station Marketing', 'RD Conversas'].filter(Boolean)
    );

    const names = recommendations.map((p) => p.name);
    expect(names).toContain('RD Station Marketing');
    expect(names).toContain('RD Conversas');
  });

  test('SingleProduct retorna corretamente o produto com maior score (ou o último em caso de empate)', () => {
    const formData1 = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Chat ao vivo e mensagens automatizadas',
      ],
      selectedRecommendationType: 'SingleProduct',
    };
    const recommendations1 = recommendationService.getRecommendations(
      formData1,
      mockProducts
    );
    expect(recommendations1).toHaveLength(1);
    expect(recommendations1[0].name).toBe('RD Conversas');

    const formData2 = {
      selectedPreferences: [
        'Automação de marketing',
        'Integração com chatbots',
      ],
      selectedRecommendationType: 'SingleProduct',
    };
    const recommendations2 = recommendationService.getRecommendations(
      formData2,
      mockProducts
    );
    expect(recommendations2).toHaveLength(1);
    expect(recommendations2[0].name).toBe('RD Conversas');
  });

  test('Usa MultipleProducts como padrão quando selectedRecommendationType está ausente ou inválido', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
    };
    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations.map((p) => p.name)).toEqual(
      expect.arrayContaining(['RD Station Marketing'])
    );
  });

  test('Calcula score corretamente apenas com base nas preferências', () => {
    const formData = {
      selectedPreferences: [
        'Integração com chatbots',
        'Personalização de funis de vendas',
      ],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((p) => p.name)).toEqual(
      expect.arrayContaining(['RD Conversas', 'RD Station CRM'])
    );
  });

  test('Calcula score corretamente apenas com base nas features', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: [
        'Chat ao vivo e mensagens automatizadas',
        'Rastreamento de interações com clientes',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((p) => p.name)).toEqual(
      expect.arrayContaining(['RD Conversas', 'RD Station CRM'])
    );
  });
});
