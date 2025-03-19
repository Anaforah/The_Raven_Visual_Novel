let footer = document.querySelector('.Balao_fala'); 
let body = document.querySelector('body'); 

import { Narrador_Introduction, initializeNarration, background, initializeFalas, Choice, clearDynamicElements, switchType, analyzeAndPlayAudioFromJson, Personagem_Introduction } from './functions.js';

export const state = {
  shouldChangeScreenType1: false,
};

/*********************** TYPE1 ************************/
export async function type1(
  jsonPath, sceneName, videoIndex, videoObject, chave, loopState,
  somAction, somAutoplay, somLoop, somVolume,
  newkey, newindex, newnarracao, onComplete // Adicionamos o callback onComplete
) {
  try {
    console.log("Carregando JSON...");
    const response = await fetch(jsonPath);

    if (!response.ok) {
      throw new Error('Erro ao carregar o JSON');
    }

    const data = await response.json();
    console.log('Dados JSON carregados:', data);
    console.log('Chave:', newkey, 'Índice:', newindex, 'Narração:', newnarracao);

    // Adiciona o vídeo de fundo
    console.log('Valor de loopState antes de chamar background:', loopState);
    background(data, sceneName, videoIndex, videoObject, chave, loopState);

    // Inicializa a primeira narração e espera a conclusão
    const isFirstNarrationComplete = await initializeNarration(data, sceneName, 2, 'texto_narrador', 'narra', Narrador_Introduction, null);

    console.log('Primeira narração concluída, valor de bool:', isFirstNarrationComplete);

    // Verifica se a primeira narração foi concluída
    if (isFirstNarrationComplete) {
      background(data, sceneName, videoIndex, 'background', 'link2', true);

      // Inicializa a nova narração (a próxima após a primeira)
      //analyzeAndPlayAudioFromJson(jsonPath);
      const isNewNarrationComplete = await initializeNarration(data, newkey, newindex, 'texto_narrador', newnarracao, Narrador_Introduction, "Man", 6);
      if (isNewNarrationComplete) {
        console.log('Nova narração concluída.');

        // Não repita a narração se o índice for o mesmo
        if (newindex !== 4) {
          await initializeNarration(data, newkey, 4, 'texto_narrador', newnarracao, Narrador_Introduction, "Man", 7);
          console.log('Narração finalizada. Adicionando escolhas...');
        }

        // Adiciona as opções de escolha
        Choice(data, sceneName, 5, 'Opcao', (clicked) => {
          console.log('Escolha foi clicada!', clicked);
          state.shouldChangeScreenType1 = true;

          if (onComplete) {
            onComplete();
          }
        });
      }
    }
  } catch (error) {
    console.error('Erro na execução de type1:', error);
  }
}
