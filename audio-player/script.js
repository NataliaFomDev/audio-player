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
        wallpaper: 'assets/img/BuryMeAlive.jpeg'
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

// Обновляем время при изменении currentTime аудиоплеера
audio.addEventListener('timeupdate', updateTimeDisplay);
// Устанавливаем начальное время (0:00)
updateTimeDisplay();

// Обработчик события изменения положения бегунка прогресса
progress.addEventListener('input', () => {
    const newTime = (progress.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

// Обновляем положение бегунка прогресса при событии timeupdate
audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    
    if (!isNaN(duration)) {
        // Обновляем значение бегунка прогресса в соответствии с текущим временем
        progress.value = (currentTime / duration) * 100;
    }
});

// Обработчик события клика по кнопке "Play"
playButton.addEventListener('click', () => {
    audio.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
    cover.classList.add('playing');
});

// Обработчик события клика по кнопке "Pause"
pauseButton.addEventListener('click', () => {
    audio.pause();
    pauseButton.style.display = 'none';
    playButton.style.display = 'inline-block';
    cover.classList.remove('playing');
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
})

// Обработчик события перехода к предыдущей композиции
backButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadAndPlayCurrentSong();
    updateTimeDisplay();
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
});

window.onload = function() {
    console.log("Оценка за задание: 60 из 60\nВёрстка (10 / 10) \nвёрстка аудиоплеера: есть кнопка Play/Pause, кнопки 'Вперёд' и 'Назад' для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека (5 / 5) \nв футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс (5 / 5) \nКнопка Play/Pause (10 / 10) \nесть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека (5 / 5) \nвнешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек (5 / 5) \nПри кликах по кнопкам 'Вперёд' и 'Назад' переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый (10 / 10)\nПри смене аудиотрека меняется изображение - обложка аудиотрека (10 / 10)\nПрогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека (10 / 10)\nОтображается продолжительность аудиотрека и его текущее время проигрывания (10 / 10)\nОчень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения (10 / 10)\nвысокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо");
};
