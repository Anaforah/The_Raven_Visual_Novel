window.onload = function() {
    loadResources();
};

function loadResources() {
    const videoFolderPath = 'videos/';  // Caminho da pasta de vídeos
    const spriteFolderPath = 'sprites/';
    const imageFolderPath = 'Images/';
    const soundFolderPath = 'voices/';
    const videoFiles = [
        '1cena.mp4',   // Lista de arquivos de vídeo (adicione mais conforme necessário)
        'busto_background.mp4',
        'busto_background_corvo1.mp4',
        'busto_background_corvo2.mp4',
        'final_background.mp4',
        'frame1.mp4',
        'ilustracao_porta.mp4',
        'janela_background_sprite1.mp4',
        'janela_background_sprite2.mp4',
        'janela_background_sprite6.mp4',
        'janela_background_sprite7.mp4',
        'janela_background_sprite8.mp4',
        'janela_background.mp4',
        'lareira_background_sprite1.mp4',
        'lareira_background_sprite2.mp4',
        'lareira_background_sprite3.mp4',
        'lareira_background_sprite4.mp4',
        'lareira_background_sprite5.mp4',
        'lareira_background.mp4',
    ];

    const SpriteFiles = [
        'sprite1.png',
        'sprite2.png',
        'sprite3.png',
        'sprite4.png',
        'sprite5.png',
        'sprite6.png',
        'sprite7.png',
        'sprite8.png',
        'sprite_corvo1.png',
        'sprite_corvo2.png',
    ];

    const ImageFiles = [
        'Ativo 10.png',
        'botao.png',
        'Corvo.png',
        'Corvo2.png',
        'IL1.jpg',
        'ilust_homemporta.png',
        'titulo.png',
    ];

    const SoundFiles = [
        'cena1/voice1.mp3',
        'cena1/voice2.mp3',
        'cena1/voice3.mp3',
        'cena2/voice4.mp3',
        'cena2/voice5.mp3',
        'cena2/voice6.mp3',
        'cena3/voice7.mp3',
        'cena3/voice8.mp3',
        'cena3/voice9.mp3',
        'cena3/voice10.mp3',
        'cena3/voice11.mp3',
        'cena4/voice12.mp3',
        'cena5/voice13.mp3',
        'cena5/voice14.mp3',
        'cena5/voice15.mp3',
        'cena5/voice16.mp3',
        'cena6/voice17.mp3',
        'cena6/voice18.mp3',
        'cena6/voice19.mp3',
        'cena7/voice20.mp3',
        'cena7/voice21.mp3',
        'cena8/voice22.mp3',
        'cena8/voice23.mp3',
        'cena8/voice24.mp3',
        'cena8/voice25.mp3',
        'cena8/voice26.mp3',
        'cena8/voice27.mp3',
        'cena8/voice28.mp3',
        'cena8/voice29.mp3',
        'cena8/voice30.mp3',
        'cena9/voice31.mp3',
        'cena9/voice32.mp3',
        'cena9/voice33.mp3',
        'cena9/voice34.mp3',
        'cena9/voice35.mp3',
        'cena10/voice36.mp3',
        'cena10/voice37.mp3',
        'cena10/voice38.mp3',
        'cena10/voice39.mp3',
        'cena10/voice40.mp3',
        'cena10/voice41.mp3',
        'cena11/voice42.mp3',
        'cena11/voice43.mp3',
        'cena11/voice44.mp3',
        'cena11/voice45.mp3',
        'cena11/voice46.mp3',
        'crickets.mp3',
        'fogo.mp3',
    ];

    let loadedResources = 0;
    const totalResources = videoFiles.length + SpriteFiles.length + ImageFiles.length + SoundFiles.length;

    // Esconde a seção desktop até que os recursos sejam carregados
    document.querySelector('.desktop').style.display = 'none';
    // Esconde o botão de continuar inicialmente
    const continueButton = document.getElementById('continue-button');
    continueButton.style.display = 'none';

    const resourceLoaded = () => {
        loadedResources++;
        if (loadedResources === totalResources) {
            enableContinueButton();
        }
    };

    // Carregar vídeos
    videoFiles.forEach(videoFile => {
        const videoPath = videoFolderPath + videoFile;
        loadVideo(videoPath, resourceLoaded);
    });

    // Carregar sprites
    SpriteFiles.forEach(SpriteFile => {
        const spritePath = spriteFolderPath + SpriteFile;
        loadImage(spritePath, resourceLoaded);
    });

    // Carregar imagens
    ImageFiles.forEach(ImageFile => {
        const imagePath = imageFolderPath + ImageFile;
        loadImage(imagePath, resourceLoaded);
    });

    // Carregar sons
    SoundFiles.forEach(SoundFile => {
        const soundPath = soundFolderPath + SoundFile;
        loadSound(soundPath, resourceLoaded);
    });
}

function loadVideo(url, callback) {
    const video = document.createElement('video');
    video.src = url;
    video.onloadeddata = callback;
    video.onerror = () => console.error('Erro ao carregar vídeo:', url);
}

function loadImage(url, callback) {
    const image = document.createElement('img'); // Corrigir de 'image' para 'img'
    image.src = url;
    image.onload = callback; // Corrigir de 'onloadeddata' para 'onload'
    image.onerror = () => console.error('Erro ao carregar imagem:', url);
}

function loadSound(url, callback) {
    const audio = new Audio(); // Corrigir de 'sound' para 'Audio'
    audio.src = url;
    audio.onloadeddata = callback;
    audio.onerror = () => console.error('Erro ao carregar som:', url);
}

function enableContinueButton() {
    const continueButton = document.getElementById('continue-button');
    continueButton.disabled = false; // Habilita o botão
    continueButton.style.display = 'block'; // Mostra o botão
    // Adiciona evento para tocar som ao clicar no botão
    const soundToPlay = new Audio('voices/crickets.mp3'); // Substitua pelo som desejado
    continueButton.addEventListener('click', () => {
        soundToPlay.play();
        hideLoadingScreen();
    });
}

function hideLoadingScreen() {
    // Esconde a tela de carregamento
    document.getElementById('loading-screen').style.display = 'none';
    // Exibe a seção desktop
    document.querySelector('.desktop').style.display = 'block';
}