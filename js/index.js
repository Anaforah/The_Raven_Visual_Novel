import { 
  type0, 
  state as type0State 
} from './type0.js'; 

import { 
  type1 as externalType1, 
  state as type1State 
} from './type1.js'; 

import { 
  type2 as externalType2, 
  state as type2State 
} from './type2.js'; 

import { 
  clearDynamicElements, 
  switchType,
  initializeFalas
} from './functions.js';

import { analyzeAndPlayAudioFromJson } from './functions.js';
import { loadAudioJson } from './functions.js';


let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let sourceNode;
let audioBuffer;
let startTime = 0;

async function playSceneAudio(audioPath) {
    try {
        // Carrega o arquivo de áudio apenas uma vez, se ainda não tiver sido carregado
        if (!audioBuffer) {
            const response = await fetch(audioPath);
            const arrayBuffer = await response.arrayBuffer();
            audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        }

        // Se já houver um áudio tocando, pare e limpe os recursos
        if (sourceNode) {
            sourceNode.stop();
            sourceNode.disconnect();
        }

        // Cria um novo buffer source
        sourceNode = audioContext.createBufferSource();
        sourceNode.buffer = audioBuffer;
        sourceNode.connect(audioContext.destination);

        // Calcula o tempo atual no contexto de áudio para evitar silêncios
        startTime = audioContext.currentTime;
        sourceNode.start(startTime);

        // Reagenda o áudio manualmente antes que ele termine para evitar gaps
        sourceNode.stop(startTime + audioBuffer.duration);
        sourceNode.onended = () => {
            playSceneAudio(audioPath); // Reinicia antes de acabar
        };

    } catch (error) {
        console.error("Erro ao tocar áudio:", error);
    }
}



function clearPreviousScene() {
  clearDynamicElements();
  const choiceSections = document.querySelectorAll('.choice_section');
  choiceSections.forEach(section => section.remove());
}

document.getElementById('continue-button').addEventListener('click', () => {

// Execução inicial: Inicia o type0

type0('intro.json', 'intro', 'narra', 1, 'background', 'link', false, true, true, true, 0.5, 'voices/crickets.mp3');

// Verifica periodicamente a flag para trocar para o externalType1
const checkScreenChange = setInterval(() => {
  if (type0State.shouldChangeScreen) {
    clearInterval(checkScreenChange);
    console.log("Iniciando o primeiro type1 após mudança de tela.");

    clearPreviousScene();

    
    // Inicia o type1 para Cena1
      playSceneAudio('voices/fogo.mp3');
    switchType(
      externalType1,
      'Cena1.json', 'Cena1', 1, 'background', 'link1', false,
      true, true, true, 0.5,
      'Cena1', 3, 'Fala', 
      () => {
        console.log("Primeiro type1 concluído. Iniciando type1 para Cena2...");

        clearPreviousScene();

        // Inicia o type1 para Cena2
        switchType(
          externalType1,
          'Cena2.json', 'Cena2', 1, 'background', 'link1', true,
          true, true, true, 0.5,
          'Cena2', 3, 'Fala',
          () => {
            console.log("type1 para Cena2 concluído. Iniciando type1 para Cena3...");
            clearPreviousScene();

            // Inicia o type1 para Cena3
            switchType(
              externalType1,
              'Cena3.json', 'Cena3', 1, 'background', 'link1', true,
              true, true, true, 0.5,
              'Cena3', 3, 'Fala',
              () => {
                console.log("type1 para Cena3 concluído. Iniciando type1 para Cena4...");

                clearPreviousScene();

                // Inicia o type1 para Cena4
                switchType(
                  externalType1,
                  'Cena4.json', 'Cena4', 1, 'background', 'link1', true,
                  true, true, true, 0.5,
                  'Cena4', 3, 'Fala',
                  () => {
                    console.log("type1 para Cena4 concluído. Iniciando type2 para Cena5...");

                    clearPreviousScene();

                    // Inicia o type2 para Cena5
                    switchType(
                      externalType2,
                      'Cena5.json', 'Cena5', 'link1', "You", "Man"
                    );

                    // Verifica se o type2 foi concluído para iniciar Cena6
                    const checkType2Completion = setInterval(() => {
                      if (type2State.isComplete) {
                        clearInterval(checkType2Completion);
                        console.log("Cena5 concluída. Iniciando Cena6...");

                        clearPreviousScene();

                        // Inicia o type1 para Cena6
                        switchType(
                          externalType1,
                          'Cena6.json', 'Cena6', 1, 'background', 'link1', true,
                          true, true, true, 0.5, 
                          'Cena6', 3, 'Fala',    
                          () => {
                            console.log("Cena6 concluída. Iniciando Cena7...");

                            clearPreviousScene();

                            // Inicia o type2 para Cena7
                            switchType(
                              externalType2,
                              'Cena7.json', 'Cena7', 'link1', "You", "Man"
                            );

                            // Verifica se Cena7 foi concluída para iniciar Cena8
                            const checkCena7Completion = setInterval(() => {
                              if (type2State.isComplete) {
                                clearInterval(checkCena7Completion);
                                console.log("Cena7 concluída. Iniciando Cena8...");

                                clearPreviousScene();

                                // Inicia o type2 para Cena8
                                switchType(
                                  externalType2,
                                  'Cena8.json', 'Cena8', 'link1', "You", "Man"
                                );

                                // Verifica se Cena8 foi concluída para iniciar Cena9
                                const checkCena8Completion = setInterval(() => {
                                  if (type2State.isComplete) {
                                    clearInterval(checkCena8Completion);
                                    console.log("Cena8 concluída. Iniciando Cena9...");

                                    clearPreviousScene();

                                    // Inicia o type2 para Cena9
                                    switchType(
                                      externalType2,
                                      'Cena9.json', 'Cena9', 'link1', "You", "Man"
                                    );

                                    // Verifica se Cena9 foi concluída para iniciar Cena10
                                    const checkCena9Completion = setInterval(() => {
                                      if (type2State.isComplete) {
                                        clearInterval(checkCena9Completion);
                                        console.log("Cena9 concluída. Iniciando Cena10...");

                                        clearPreviousScene();

                                        // Inicia o type2 para Cena10
                                        switchType(
                                          externalType2,
                                          'Cena10.json', 'Cena10', 'link1', "You", "Man"
                                        );
                                        
                                        // Verifica se Cena10 foi concluída para iniciar Cena11
                                        const checkCena10Completion = setInterval(() => {
                                          if (type2State.isComplete) {
                                            clearInterval(checkCena10Completion);  // Limpa o intervalo de verificação
                                      
                                            console.log("Cena10 concluída. Iniciando Cena11...");
                                      
                                            clearPreviousScene();
                                      
                                            // Inicia o type2 para Cena11
                                            switchType(
                                              externalType2,
                                              'Cena11.json', 'Cena11', 'link1', "You", "Man"
                                            );
                                          }
                                        }, 100);  // Verifica a cada 100ms se a Cena10 foi concluída
                                      }
                                    }, 100);  // Verifica a cada 100ms se a Cena9 foi concluída
                                  }
                                }, 100);  // Verifica a cada 100ms se a Cena8 foi concluída
                              }
                            }, 100);  // Verifica a cada 100ms se a Cena7 foi concluída
                          }
                        );
                      }
                    }, 100);  // Verifica a cada 100ms se a Cena6 foi concluída
                  }
                );
              }
            );
          }
        );
      }
    );
  }
}, 100);  // Verifica a cada 100ms se o type0 deve trocar de tela
});


