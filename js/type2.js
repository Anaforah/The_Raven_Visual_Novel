import { Narrador_Introduction, initializeNarration, background, initializeFalas, Choice, analyzeAndPlayAudioFromJson, Personagem_Introduction } from './functions.js';

export const state = {
    isComplete: false, // Estado inicial indicando que a execução ainda não terminou
};

export async function type2(jsonPath, sceneKey, backgroundKey, persona,persona1) {
    try {
        state.isComplete = false; // Reinicia o estado no início da execução

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
            console.log("Dados disponíveis para verificação:", backgroundData);
            return;
        }

        // Narração e falas
        
        await initializeNarration(data, sceneKey, 2, 'texto_narrador', "Fala", Narrador_Introduction, persona);
        background(data, sceneKey, 1, "background", 'link2', isLoop);
        await initializeNarration(data, sceneKey, 3, 'texto_narrador', "narra", Narrador_Introduction, null);
        background(data, sceneKey, 1, "background", 'link3', isLoop);
     
        await initializeNarration(data, sceneKey, 4, 'texto_narrador', "Fala", Narrador_Introduction, persona1, 6);

        // Opções
        Choice(data, sceneKey, 5, "Opcao", (selected) => {
            console.log("Opção selecionada:", selected);
            state.isComplete = true; // Marca o state como completo após a escolha
        });

    } catch (error) {
        console.error("Erro ao executar type2:", error);
    }
}
