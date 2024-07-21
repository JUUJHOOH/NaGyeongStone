const audio = new Audio('music/Ballerina_QuincasMoreira.mp3');
const Mplayer = document.querySelector('.Mplayer');
const audioPlay = document.querySelector('.Mplay');
const audioPause = document.querySelector('.Mpause');

audio.loop = true;
audio.volume = 0.5;

audio.addEventListener('canplaythrough',function(){
    Mplayer.style.display = 'block';
})

audioPlay.addEventListener('click',function(){
    audio.play();
    audioPlay.style.display = 'none';
    audioPause.style.display = 'block';
})
audioPause.addEventListener('click',function(){
    audio.pause();
    audioPlay.style.display = 'block';
    audioPause.style.display = 'none';
})