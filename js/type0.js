
// Seleciona os elementos no DOM
const introContainer = document.getElementById('intro');
const interactiveContainer = document.getElementById('interactive');
let footer = document.querySelector('.Balao_fala');
let currentSentenceIndex = 0; // Controla qual frase será exibida
let narrationSentences = []; // Armazena as frases carregadas do JSON
let body = document.querySelector('body'); 

import { Narrador_Introduction,initializeNarration, background, initializeFalas, Choice, som,clearDynamicElements,switchType } from './functions.js';
export const state = {
  shouldChangeScreen: false,
};
// Define a função type0
// Define a função type0 como async
export async function type0(
  jsonPath, 
  sceneName, 
  narracao, 
  videoIndex, 
  videoObject, 
  loopState, 
  somAction, 
  somAutoplay, 
  somLoop, 
  somVolume, 
  voicePath
) {
  let dynamicContainer = document.getElementById('dynamic-container');
  if (!dynamicContainer) {
    dynamicContainer = document.createElement('div');
    dynamicContainer.id = 'dynamic-container';
    dynamicContainer.classList.add('dynamic'); 
    document.body.appendChild(dynamicContainer);
  }

  try {
    console.log("Carregando JSON...");
    const response = await fetch(jsonPath);

    if (!response.ok) {
      throw new Error('Erro ao carregar o JSON');
    }

    const data = await response.json();
    console.log('Dados JSON carregados:', data);

    // Configura o plano de fundo
    background(data, sceneName, videoIndex, videoObject, loopState);

    // Inicializa a narração
    try {
      const isNarrationComplete = await initializeNarration(data, sceneName, 2, 'texto_narrador', narracao, Narrador_Introduction, null);

      if (isNarrationComplete) {
        // Certifique-se de que a narração é exibida apenas uma vez
        if (data.Fala && data.Fala.frase) {
          const uniqueSentences = Array.from(new Set(data.Fala.frase.map(f => f.N1)));
          uniqueSentences.forEach(sentence => {
            console.log('Narração:', sentence);
            // Adicione lógica aqui para exibir as frases, se necessário.
          });
        }

        if (data.inter?.array1 && data.inter?.titulo) {
          const titleImageLink = data.inter.titulo[0].link;
          const titleDiv = document.createElement('div');
          titleDiv.id = 'title-container';
          titleDiv.classList.add('image-container', 'dynamic');
        
          const titleImage = document.createElement('img');
          titleImage.src = titleImageLink;
          titleDiv.appendChild(titleImage);
          dynamicContainer.appendChild(titleDiv);
          $(titleDiv).hide().fadeIn(1000);
        
          const buttonImageLink = data.inter.array1[0].link;
          const buttonDiv = document.createElement('div');
          buttonDiv.id = 'button-container';
          buttonDiv.classList.add('button-container', 'dynamic');
        
          const button = document.createElement('button');
          button.classList.add('start');
          buttonDiv.appendChild(button);
          dynamicContainer.appendChild(buttonDiv);
          $(buttonDiv).hide().fadeIn(1000);
        
          button.addEventListener('click', () => {
            state.shouldChangeScreen = true;
            console.log("Botão clicado. Flag ativada.");
          });
        }
      }
    } catch (narrationError) {
      console.error('Erro durante a narração:', narrationError);
    }

  } catch (error) {
    console.error('Erro ao carregar o JSON:', error);
  }
}
