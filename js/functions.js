/***********************FUNCTIONS ************************/
let footer = document.querySelector('.Balao_fala'); 
let body = document.querySelector('body'); 
let video = document.querySelector('video');


/***********************BACKGROUND VIDEO ************************/
// Função para adicionar o vídeo de fundo
  //DATA = Link do JSON
  //KEY = nome da cena
  //ORDEM = número do array do JSON (como foi dividido por cenas é sempre 1)
  //OBJETO = Valor no caso é sempre 'background' 
  //CHAVE = Escolher dentro dos vários links do background qual queres
  //STATE = Escolher se quer video em loop ou não (true|false)
  export function background(data, nome, ordem, objeto, chave, state) {
    if (
      data[nome] &&
      data[nome][ordem] &&
      data[nome][ordem][objeto] &&
      data[nome][ordem][objeto][chave]
    ) {
      const backgroundVideo = document.createElement('video');
      backgroundVideo.src = data[nome][ordem][objeto][chave];
      backgroundVideo.controls = false;
      backgroundVideo.autoplay = true;
      backgroundVideo.muted = true;
      backgroundVideo.loop = state;
  
      backgroundVideo.addEventListener('canplay', () => {
        console.log('Vídeo pronto para reprodução:', backgroundVideo.src);
        backgroundVideo.play();
      });
  
      backgroundVideo.addEventListener('ended', () => {
        if (state) backgroundVideo.play(); // Força loop caso necessário
      });
  
      document.body.appendChild(backgroundVideo);
      console.log('Vídeo adicionado ao DOM com loop:', backgroundVideo.loop);
    } else {
      console.error('Erro: O dado solicitado não existe ou está incorreto.');
    }
  }
  



/*********************** PERSONAGEM ************************/
export function initializeFalas(data, key, index, cssClass, narracao, callback, startText) {
  return new Promise((resolve, reject) => {
    console.log('Parâmetros recebidos:', { key, index, narracao });

    if (data[key] && data[key][index] && data[key][index][narracao]) {
      const narrationSentences = data[key][index][narracao].frase.map((sentence, i) => {
        return sentence[`Fala${i + 1}`] || sentence[`N${i + 1}`]; // Suporte a diferentes formatos
      });

      console.log('Sentenças extraídas:', narrationSentences);

      if (!Array.isArray(narrationSentences) || narrationSentences.length === 0) {
        console.error('Erro: Sentenças não disponíveis ou formato inválido.');
        reject('Erro: Sentenças não disponíveis ou formato inválido.');
        return;
      }

      let currentSentenceIndex = 0;
      const footer = document.querySelector('.Balao_fala');

      if (!footer) {
        console.error('Erro: Elemento .Balao_fala não encontrado.');
        reject('Erro: Elemento .Balao_fala não encontrado.');
        return;
      }

      function displaySentence(sentence) {
        if (typeof sentence !== 'string' || sentence.trim() === '') {
          console.error('Erro: Frase inválida:', sentence);
          return;
        }

        // Limpa o conteúdo anterior
        footer.innerHTML = '';

        if (startText) {
          const startSpan = document.createElement('span');
          startSpan.innerHTML = `<strong>${startText}</strong>`; // Aplica negrito ao startText
          startSpan.classList.add('texto_personagem'); // Classe para o texto inicial
          footer.appendChild(startSpan);
        }

        const sentenceContainer = document.createElement('div');
        sentenceContainer.classList.add(cssClass);
        footer.appendChild(sentenceContainer);

        // Divide o texto em caracteres, preservando a estrutura de HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = sentence;

        // Recria cada caractere como um `span` (preservando estrutura)
        function createSpanForElement(element) {
          if (element.nodeType === Node.TEXT_NODE) {
            // Texto simples: cria um span para cada caractere
            Array.from(element.textContent).forEach((char) => {
              const charSpan = document.createElement('span');
              charSpan.textContent = char;
              charSpan.style.opacity = '0';
              charSpan.style.transition = 'opacity 0.2s ease';
              sentenceContainer.appendChild(charSpan);

              // Anima o caractere com delay incremental
              setTimeout(() => (charSpan.style.opacity = '1'), 100 * Array.from(sentenceContainer.childNodes).indexOf(charSpan));
            });
          } else if (element.nodeType === Node.ELEMENT_NODE) {
            // Elemento HTML: recria o elemento preservando a estrutura
            const wrapperSpan = document.createElement('span');
            wrapperSpan.innerHTML = element.outerHTML;
            wrapperSpan.style.opacity = '0';
            wrapperSpan.style.transition = 'opacity 0.2s ease';
            sentenceContainer.appendChild(wrapperSpan);

            // Anima o elemento com delay incremental
            setTimeout(() => (wrapperSpan.style.opacity = '1'), 100 * Array.from(sentenceContainer.childNodes).indexOf(wrapperSpan));
          }
        }

        Array.from(tempDiv.childNodes).forEach(createSpanForElement);

        // Chama o callback após exibir o texto
        callback(footer.innerHTML, cssClass);
      }

      if (narrationSentences.length > 0) {
        displaySentence(narrationSentences[0]); // Mostra a primeira frase
        currentSentenceIndex++;
      }

      footer.addEventListener('click', function handleClick() {
        if (currentSentenceIndex < narrationSentences.length) {
          displaySentence(narrationSentences[currentSentenceIndex]);
          currentSentenceIndex++;
        } else {
          console.log('Todas as frases foram exibidas.');
          footer.removeEventListener('click', handleClick);
          resolve(true);
        }
      });
    } else {
      console.error('Erro: Dados não encontrados no JSON para os parâmetros fornecidos.');
      reject('Erro: Dados não encontrados no JSON para os parâmetros fornecidos.');
    }
  });
}


/*********************** TEXT PERSONAGEM ************************/

export function Personagem_Introduction(text, css) {
  const footer = document.querySelector('.Balao_fala'); // Certifique-se de que este elemento existe
  if (!footer) {
    console.error('Erro: Elemento .Balao_fala não encontrado.');
    return;
  }

  footer.innerHTML = ""; // Limpa o conteúdo anterior do footer

  // Cria o parágrafo e aplica a classe CSS
  const paragraph = document.createElement('p');
  paragraph.classList.add(css);
  footer.appendChild(paragraph);

  // Divide o texto em linhas usando <br> (já interpretado como HTML)
  const lines = text.split(/<br\s*\/?>/g);

  let totalDelay = 0; // Controle do atraso acumulado para cada linha

  lines.forEach((line, lineIndex) => {
    // Cria um contêiner para cada linha
    const lineContainer = document.createElement('div');
    paragraph.appendChild(lineContainer);

    // Anima os caracteres da linha atual
    Array.from(line).forEach((char, charIndex) => {
      const span = document.createElement('span');

      // Usa innerHTML para interpretar tags como <strong>
      span.innerHTML = char;
      span.style.opacity = '0'; // Invisível inicialmente
      lineContainer.appendChild(span);

      // Adiciona animação com atraso cumulativo
      setTimeout(() => {
        span.style.opacity = '1'; // Aparece
        span.style.transition = 'opacity 0.2s ease'; // Anima a transição
      }, totalDelay + 100 * charIndex);
    });

    // Atualiza o totalDelay com base na duração da linha
    totalDelay += 100 * line.length;

    // Adiciona atraso extra para a próxima linha (opcional)
    if (lineIndex < lines.length - 1) {
      totalDelay += 500; // Pausa entre as linhas
    }
  });
}







  /*********************** TEXTO ************************/
  //DATA = Link do JSON
  //KEY = nome da cena
  //INDEX = número do array do JSON (como foi dividido por cenas é sempre 1)
  //CSSCLASS = class CSS (default 'texto_narrador')
  //CALLBACK = Função para mostrar a brase (default é a Narrador_Introduction)
  export function initializeNarration(data, key, index, cssClass, narracao, callback, persona, audioindex) {
    return new Promise((resolve, reject) => {
        let bool = false;

        if (!data[key]) {
            console.error(`Erro: Cena '${key}' não encontrada no JSON.`);
            reject(`Erro: Cena '${key}' não encontrada.`);
            return;
        }
        if (!data[key][index]) {
            console.error(`Erro: Índice ${index} não encontrado na cena '${key}'.`);
            reject(`Erro: Índice ${index} não encontrado.`);
            return;
        }
        if (!data[key][index][narracao]) {
            console.error(`Erro: Narração '${narracao}' não encontrada no índice ${index} da cena '${key}'.`);
            reject(`Erro: Narração '${narracao}' não encontrada.`);
            return;
        }

        const narrationData = data[key][index][narracao];
        const narrationSentences = narrationData.frase.map((sentence, i) => sentence[`N${i + 1}`]);

        // Obtém apenas o bloco de áudio correto
        const audioBlock = data[key][audioindex];
        let audioFiles = [];

        if (audioBlock?.audio?.faxa) {
            audioFiles = audioBlock.audio.faxa
                .flatMap(faxa => Object.values(faxa))
                .filter(audio => audio.trim() !== ""); // Remove áudios vazios
        } else {
            console.warn(`Aviso: Nenhum áudio encontrado no índice '${audioindex}' da cena '${key}'.`);
        }

        console.log('Áudios correspondentes ao índice', audioindex, ':', audioFiles.length > 0 ? audioFiles : "Nenhum áudio válido encontrado.");
        console.log('Frases encontradas:', narrationSentences);

        let currentSentenceIndex = 0;

        if (narrationSentences.length > 0) {
            callback(narrationSentences[currentSentenceIndex], cssClass, persona);

            if (persona === "Man" && audioFiles.length > currentSentenceIndex) {
                let audioToPlay = audioFiles[currentSentenceIndex];
                console.log(`Tocando áudio ${currentSentenceIndex + 1}:`, audioToPlay);

                setTimeout(() => {
                    playVoiceAudio(audioToPlay);
                }, 200);
            }
            currentSentenceIndex++;
        }

        footer.addEventListener('click', function handleFooterClick() {
            if (currentSentenceIndex < narrationSentences.length) {
                callback(narrationSentences[currentSentenceIndex], cssClass, persona);

                if (persona === "Man" && audioFiles.length > currentSentenceIndex) {
                    let audioToPlay = audioFiles[currentSentenceIndex];
                    console.log(`Tocando áudio ${currentSentenceIndex + 1}:`, audioToPlay);

                    setTimeout(() => {
                        playVoiceAudio(audioToPlay);
                    }, 200);
                }

                currentSentenceIndex++;
            } else {
                console.log('Todas as frases foram exibidas.');
                bool = true;
                footer.removeEventListener('click', handleFooterClick);
                resolve(bool);
            }
        });
    });
}

// Função para tocar áudio
function playVoiceAudio(audioPath) {
    if (!audioPath || audioPath.trim() === "") return; // Evita erro se o áudio for vazio
    const audio = new Audio(audioPath);
    audio.play().catch(err => console.error('Erro ao tocar o áudio:', err));
}




/*********************** TEXT ************************/

export function Narrador_Introduction(text, css, persona) {
  footer.innerHTML = ""; // Limpa o conteúdo anterior do footer

  if (persona != null) {
    const paragraphtitle = document.createElement('p');
    paragraphtitle.classList.add('texto_personagem'); // Adiciona a classe CSS fornecida
    
    // Converte a string "persona" em um nó de texto
    const textNode = document.createTextNode(persona); // Cria um nó de texto com o valor de persona
    paragraphtitle.appendChild(textNode); // Adiciona o nó de texto ao parágrafo
    
    // Adiciona uma quebra de linha
    const breakLine = document.createElement('br'); // Cria um elemento de quebra de linha
    paragraphtitle.appendChild(breakLine); // Adiciona a quebra de linha ao parágrafo
    
    footer.appendChild(paragraphtitle); // Adiciona o parágrafo ao footer
  }
  // Cria o parágrafo e aplica a classe CSS
  const paragraph = document.createElement('p');
  paragraph.classList.add(css);
  footer.appendChild(paragraph);

  // Divide o texto em linhas usando <br> (já interpretado como HTML)
  const lines = text.split(/<br\s*\/?>/g);

  let totalDelay = 0; // Controle do atraso acumulado para cada linha

  lines.forEach((line, lineIndex) => {
      // Cria um contêiner para cada linha
      const lineContainer = document.createElement('div');
      paragraph.appendChild(lineContainer);

      // Anima os caracteres da linha atual
      Array.from(line).forEach((char, charIndex) => {
          const span = document.createElement('span');

          // Usa innerHTML para interpretar tags como <strong>
          span.innerHTML = char;
          span.style.opacity = '0'; // Invisível inicialmente
          lineContainer.appendChild(span);

          // Adiciona animação com atraso cumulativo
          setTimeout(() => {
              span.style.opacity = '1'; // Aparece
              span.style.transition = 'opacity 0.2s ease'; // Anima a transição
          }, totalDelay + 100 * charIndex);
      });

      // Atualiza o totalDelay com base na duração da linha
      totalDelay += 10 * line.length;

      // Adiciona atraso extra para a próxima linha (opcional)
      if (lineIndex < lines.length - 1) {
          totalDelay += 4000; // Pausa entre as linhas
      }
  });
}

  



/*********************** ECRÃ DE ESCOLHAS ************************/
// Função para exibir as escolhas a partir do JSON
export function Choice(data, key, index, narracaoKey, callback) {
  const choice_section = document.createElement('section');

  // Verifique se o caminho para 'Opcao' e 'escolha' está correto
  const choices = data[key][index]?.[narracaoKey]?.escolha;

  // Variável para armazenar se houve clique
  let clicked = false;

  if (choices && Array.isArray(choices)) {
    choices.forEach((item, idx) => {
      const choiceButton = document.createElement('button'); // Cria o botão para a escolha
      choiceButton.innerHTML = item[`Esc${idx + 1}`]; // Adiciona o texto da escolha (Esc1, Esc2, etc.)
      choiceButton.classList.add('choice_paragraph');
      choice_section.appendChild(choiceButton);

      // Adiciona um "or" entre as escolhas (se houver mais de uma)
      if (idx === 0 && choices.length > 1) {
        const or = document.createElement('p');
        or.innerHTML = 'or';
        or.classList.add('choice_or');
        choice_section.appendChild(or);
      }

      // Adiciona um evento de clique para registrar o clique
      choiceButton.addEventListener('click', () => {
        if (!clicked) { // Garante que o clique é registrado uma única vez
          clicked = true;
          console.log("Escolha clicada:", item[`Esc${idx + 1}`]);

          // Chama o callback passando a escolha clicada
          callback(item[`Esc${idx + 1}`]);

          // Desabilita todos os botões após um clique
          choice_section.querySelectorAll('button').forEach(button => {
            button.disabled = true;
          });
        }
      });
    });

    choice_section.classList.add('choice_section');
    document.body.appendChild(choice_section);

    // Torna a seção visível com uma animação
    requestAnimationFrame(() => {
      choice_section.classList.add('visible');
    });
  } else {
    console.log('Erro: Não há escolhas disponíveis no JSON.');
  }
}




/*********************** SOM ************************/

export function som(boleana, autoplay, loop, volume, mp3url) {
  if (boleana) {
    // Cria um novo objeto Howl
    const sound = new Howl({
      src: [mp3url], // URL do arquivo de áudio
      autoplay: autoplay, // Tenta reprodução automática
      loop: loop, // Define se o áudio será reproduzido em loop
      volume: volume, // Define o volume inicial (entre 0 e 1)
      mute: true, // Começa mudo para evitar bloqueios automáticos
      onplayerror: function () {
        // Lida com erros de reprodução automática
        console.error('Erro ao reproduzir som automaticamente. Aguarde interação do usuário.');
        sound.once('unlock', function () {
          sound.play();
        });
      },
    });

    // Aguarda interação do usuário para ativar o som
    document.body.addEventListener(
      'click',
      () => {
        sound.mute(false); // Ativa som
        sound.play(); // Reproduz o som
        console.log('Som ativado após interação do usuário.');
      },
      { once: true } // Remove o evento após ativação
    );
  }
}

export function analyzeAndPlayAudioFromJson(jsonPath, sceneKeyPrefix = 'Cena', falaKey = 'Fala', audioKey = 'audio') {
  fetch(jsonPath)
      .then(response => response.json())
      .then(sceneData => {
          // Itera sobre todas as cenas disponíveis no JSON
          Object.keys(sceneData).forEach(sceneKey => {
              if (sceneKey.startsWith(sceneKeyPrefix)) {
                  const scene = sceneData[sceneKey]; // Obtém os dados da cena atual

                  const audioBlocks = scene.filter(block => block[audioKey]); // Filtra blocos de áudio

                  if (audioBlocks.length > 0) {
                      // Presume que o áudio estará no último bloco de "audio" no JSON
                      const audioPaths = audioBlocks[audioBlocks.length - 1][audioKey].faxa.map(faxa => {
                          return faxa.link1 || faxa.link2 || faxa.link3 || faxa.link4 || faxa.link5 || faxa.link6 || faxa.link7 || faxa.link8 || faxa.link9; // Obtém o link de áudio, se disponível
                      });

                      const audioCount = audioPaths.length; // Número de faixas de áudio na cena
                      console.log(`Cena ${sceneKey} possui ${audioCount} faixas de áudio.`);

                      // Reproduz todas as faixas de áudio
                      let currentDelay = 0; // Contador de atraso acumulado

                      audioPaths.forEach((audioPath, index) => {
                          if (audioPath) {
                              setTimeout(() => {
                                  console.log(`Reproduzindo áudio ${index + 1} da cena ${sceneKey}: ${audioPath}`);
                                  playVoiceAudio(audioPath);
                              }, currentDelay);

                              // Incrementa o atraso para a próxima faixa
                              currentDelay += 5000; // Ajuste o intervalo conforme necessário
                          } else {
                              console.warn(`Faixa ${index + 1} da cena ${sceneKey} não possui um link válido.`);
                          }
                      });
                  } else {
                      console.warn(`Cena ${sceneKey} não possui blocos de áudio válidos.`);
                  }
              }
          });
      })
      .catch(err => console.error("Erro ao carregar JSON para análise de áudio:", err));
}


export function loadAudioJson(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching JSON: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Audio JSON loaded:', data);
            // Process the audio data
        })
        .catch(error => {
            console.error('Error processing JSON audio:', error);
            // Optionally display a user-friendly message
        });
}

/*********************** ILUSTRAÇAO ************************/

/*********************** ILUSTRAÇAO ************************/

export async function ilustracao(jsonPath, imageArrayPath) {
  try {
      // Carregar o ficheiro JSON
      const response = await fetch(jsonPath);
      const data = await response.json();

      // Navegar até o array de imagens especificado
      const imageLinks = imageArrayPath.reduce((obj, key) => obj && obj[key], data);

      if (!imageLinks || typeof imageLinks !== "object") {
          console.error("Array de imagens não encontrado no JSON.");
          return;
      }

      // Iterar sobre as imagens (valores no objeto)
      const images = Object.values(imageLinks);

      for (const imageLink of images) {
          // Criar elemento de imagem
          const img = document.createElement('img');
          img.src = imageLink;
          img.style.position = 'absolute';
          img.style.opacity = '0';
          img.style.transition = 'opacity 2s ease-in-out';
          img.style.Width = 'auto';
          img.style.maxHeight = '100%';
          img.style.zIndex = '9999'; // Garante que a imagem fique acima do vídeo

          // Adicionar a imagem ao body
          document.body.appendChild(img);

          // Exibir a imagem suavemente
          setTimeout(() => {
              img.style.opacity = '1';
          }, 100);

          // Esperar 5 segundos antes de remover a imagem
          await new Promise(resolve => setTimeout(resolve, 5000));

          // Suavizar a saída da imagem
          img.style.opacity = '0';
          await new Promise(resolve => setTimeout(resolve, 2000));

          // Remover a imagem do DOM
          document.body.removeChild(img);
      }

      console.log("Transição concluída!");
  } catch (error) {
      console.error("Erro ao carregar o JSON ou exibir as imagens:", error);
  }
}



/*********************** LIMPAR ELEMENTOS ANTERIORES E TROCAR ECRÃS ************************/
// Função para limpar elementos dinâmicos
// Função para limpar elementos dinâmicos
export function clearDynamicElements() {
  const dynamicElements = document.querySelectorAll('.dynamic'); // Seleciona todos os elementos com a classe 'dynamic'
  dynamicElements.forEach(element => element.remove());
  console.log("Todos os elementos dinâmicos foram removidos.");
}


// Função para trocar entre tipos
export function switchType(typeFunction, ...args) {
  console.log("Limpando elementos dinâmicos...");
  clearDynamicElements(); // Remove Choice e outros elementos dinâmicos do DOM
  
  console.log("Iniciando novo tipo...");
  typeFunction(...args); // Chama o próximo tipo com os argumentos fornecidos
}


/*********************** choice ************************/
export function createChoice(data, sceneName, choiceIndex, elementClass, callback) {
  const choiceContainer = document.createElement('div');
  choiceContainer.className = `choice-container dynamic`;
  document.body.appendChild(choiceContainer);

  data.choices[choiceIndex].forEach(option => {
    const choice = document.createElement('button');
    choice.textContent = option.text;
    choice.className = `choice-button dynamic`;
    choice.addEventListener('click', () => {
      callback(option.id);
    });
    choiceContainer.appendChild(choice);
  });
}
