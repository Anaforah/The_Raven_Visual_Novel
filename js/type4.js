/*import { Narrador_Introduction, initializeNarration, background, initializeFalas, Choice, som } from './functions.js';
import { ilustracao, switchType } from './functions.js';

export async function type4(jsonPath, sceneKey, backgroundKey, persona, persona1) {
    try {
        console.log("Carregando JSON...");
        const response = await fetch(jsonPath);
        const isLoop = true;

        if (!response.ok) {
            throw new Error(`Erro ao carregar JSON: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("JSON carregado com sucesso:", data);

        console.log("Verificando dados do fundo...");
        const backgroundData = data[sceneKey]?.[1]?.background;

        if (backgroundData && backgroundData[backgroundKey]) {
            console.log(`Dados de fundo encontrados (${backgroundKey}):`, backgroundData[backgroundKey]);
            background(data, sceneKey, 1, "background", backgroundKey, isLoop);
        } else {
            console.error(`Erro: Nenhum dado encontrado para o fundo (${backgroundKey}).`);
            return;
        }

        // Verificando se a estrutura de 'narrationData' e 'frase' existe antes de acessar
        const narrationData = data[sceneKey]?.[2]?.texto_narrador;
        if (narrationData && narrationData.frase) {
            await initializeNarration(data, sceneKey, 2, 'texto_narrador', "Fala", Narrador_Introduction, persona);
        } else {
            console.error("Erro: Dados de narração ou 'frase' não encontrados.");
        }

        background(data, sceneKey, 1, "background", 'link2', isLoop);
        await initializeNarration(data, sceneKey, 3, 'texto_narrador', "narra", Narrador_Introduction, null);

        // Exibindo ilustrações (passando jsonPath e caminho do array de imagens)
        const imageArrayPath = ['Cena12', 4, 'ilus'];  // Caminho do array de imagens no JSON
        await ilustracao(jsonPath, imageArrayPath);

        // Opções ou próxima ação
        console.log("Processamento completo!");

    } catch (error) {
        console.error("Erro ao executar type4:", error);
    }
}*/

