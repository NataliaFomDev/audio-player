const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const backButton = document.getElementById('back');
const forthButton = document.getElementById('forth');
const progress = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');

// Список песен
const songs = [
    {
        title: 'Psychosocial',
        src: 'assets/audio/psychosocial.mp3',
        singer: 'Slipknot',
        wallpaper: 'assets/img/psychosocial.jpeg'
    },
    {
        title: 'Bury Me Alive',
        src: 'assets/audio/burymealive.mp3',
        singer: 'We Are The Fallen',
        wallpaper: 'assets/img/burymealive.jpeg'
    },
    {
        title: 'Not Strong Enough',
        src: 'assets/audio/notstrongenough.mp3',
        singer: 'Apocalyptica',
        wallpaper: 'assets/img/NotStrongEnough.jpeg'
    },
    { 
        title: 'Seven Nation Army',
        src: 'assets/audio/sevennationarmy.mp3',
        singer: 'The White Stripes',
        wallpaper: 'assets/img/SevenNationArmy.jpeg'
    }
];
let currentSongIndex = 0;

function updateSongInfo() {
    const currentSong = songs[currentSongIndex];
    const singerElement = document.querySelector('.singer');
    const songElement = document.querySelector('.song');
    const singerWallpaper = document.getElementById('wallpaper');
    const singerCover = document.getElementById('cover');
    
    singerElement.textContent = currentSong.singer; // Обновляем исполнителя
    songElement.textContent = currentSong.title; // Обновляем название песни
    singerWallpaper.style.backgroundImage = `url(${currentSong.wallpaper})`; // Обновляем фон
    singerCover.style.backgroundImage = `url(${currentSong.wallpaper})`; // Обновляем обложку
}

function loadAndPlayCurrentSong() {
    const currentSong = songs[currentSongIndex];
    audio.src = currentSong.src;
    audio.play();
    updateSongInfo();
}

// Функция для обновления времени при воспроизведении
function updateTimeDisplay() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    // Преобразование времени в удобный формат (минуты:секунды)
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    currentTimeDisplay.textContent = formatTime(currentTime);

    if (!isNaN(duration)) {
        durationDisplay.textContent = formatTime(duration);
    }
}

audio.addEventListener('loadedmetadata', () => {
    const duration = audio.duration;
    if (!isNaN(duration)) {
        durationDisplay.textContent = formatTime(duration);
    }
});

// Обновляем время при изменении currentTime аудиоплеера
audio.addEventListener('timeupdate', updateTimeDisplay);
// Устанавливаем начальное время (0:00)
updateTimeDisplay();

// Обработчик события изменения положения бегунка прогресса
progress.addEventListener('input', () => {
    const newTime = (progress.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

// Обработчик события клика по кнопке "Play"
playButton.addEventListener('click', () => {
    audio.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
});

// Обработчик события клика по кнопке "Pause"
pauseButton.addEventListener('click', () => {
    audio.pause();
    pauseButton.style.display = 'none';
    playButton.style.display = 'inline-block';
});

// Обработчик события начала воспроизведения
audio.addEventListener('play', () => {
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
});

// Обработчик события завершения воспроизведения
audio.addEventListener('ended', () => {
    pauseButton.style.display = 'none';
    playButton.style.display = 'inline-block';
});

// Обработчик события перехода к следующей композиции
forthButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadAndPlayCurrentSong();
    updateTimeDisplay();
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
    progress.value = 0;
})

// Обработчик события перехода к предыдущей композиции
backButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadAndPlayCurrentSong();
    updateTimeDisplay();
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
    progress.value = 0;
});