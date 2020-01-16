const songs = [
    "media/Kendrick Lamar - Swimming Pools (Drank).mp3", 
    "media/Yung Lean - Gatorade.mp3", 
    "media/It's Ok, You're Ok - Bonjr.mp3", 
    "media/Niki Kiniza - Gassed up.mp3", 
    "media/Post Malone - White Iverson.mp3",
    "media/$UICIDEBOY$ - New Chains, Same Shackles.mp3",
    "media/HOME - Resonance.mp3",
    "media/Kodak Black - Too Many Years (feat. PNB Rock).mp3",
    "media/A$AP Ferg - Work REMIX (Explicit).mp3",
    "media/YNW Melly - Murder on my Mind (Slowed + Reverb).mp3"
];

const poster = [
    'media/1.jpg', 
    'media/9.jpg', 
    'media/2.jpg', 
    'media/3.png', 
    'media/4.jpg',
    'media/5.jpg',
    'media/6.jpg',
    'media/7.jfif',
    'media/8.jpg',
    "media/10.jpg"
];

const title = document.getElementById('song-title');
const author = document.getElementById('song-author');
let fillBar = document.getElementById('fill');
const currentTime = document.getElementById('currentTime');

document.getElementById('next').addEventListener('click', nextSong);
document.getElementById('pre').addEventListener('click', preSong);
document.getElementById('play').addEventListener('click', playOrPause);
document.getElementById('replay').addEventListener('click', replaySong);
document.getElementById('progress').addEventListener('click', updateBar);

let currentSong = 0;
document.onkeydown = function(e) {
    e.preventDefault();
    if(e.keyCode == '39'){
        song.currentTime += 5;
    }
    if(e.keyCode == '37'){
        song.currentTime -= 5;
    }
    if(e.keyCode == '32' && song.paused){
        song.play()
        $("#play img").attr("src", "media/pause.png");
    } else if(e.keyCode == '32' && song.play()){
        song.pause()
        $("#play img").attr("src", "media/play.jpg");
    }
    if(e.keyCode == '38'){
        nextSong()
    }
    if(e.keyCode == '40'){
        preSong()
    }
    if(e.keyCode == '82'){
        replaySong()
    }
};

const song = new Audio();


window.onload = playSong;

let replay = false;
song.loop = false;

function replaySong(){ 
    if(replay == false){
        replay = true;
        song.loop = true;
        $('#replay').css('background', "rgba(255, 255 ,255, .65)")
    } 
    else if(replay == true){
        replay = false;
        song.loop = false;
        $('#replay').css('background', "transparent")
    }
}

function playSong () {
    song.src = songs[currentSong];
    let name = songs[currentSong].split(' - ');
    title.innerHTML = name[0].substring(6);
    author.innerHTML = name[1].replace('.mp3', '');   
    song.play();
}

function playOrPause(){  
   if(song.paused){
       $("#play img").attr("src","media/pause.png");
       song.play();
   }
   else {
       song.pause();
       $("#play img").attr("src","media/play.jpg");
   }
}

song.addEventListener('timeupdate', function(){
    let position = song.currentTime / song.duration;
    fillBar.style.width = position * 100 + '%';
    convertTime(Math.round(song.currentTime));
    if(song.ended){
        nextSong();
    }
});

function convertTime(seconds){
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;

    sec = (sec < 10) ? `0${sec}` : sec;
    currentTime.innerHTML = `${min}:${sec}`;

    totalTime(Math.round(song.duration))
}

function totalTime(seconds){
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;

    sec = (sec < 10) ? `0${sec}` : sec;
    currentTime.innerHTML += ` / ${min}:${sec}`;
}

function nextSong(){
    currentSong++;
    if(currentSong >= songs.length){        
        currentSong = 0;
    }

    playSong();
    $("#play img").attr("src", "media/pause.png");
    $(".main img").attr("src", poster[currentSong]);
    $(".bg img").attr("src", poster[currentSong]);
}

function preSong(){
    currentSong--;
    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    playSong();
    $("#play img").attr("src","media/pause.png");
    $(".main img").attr("src",poster[currentSong]);
    $(".bg img").attr("src",poster[currentSong]);
}

function updateBar(e){
    if(!song.ended){
        let mouseX = e.pageX;
        let newTime = mouseX * song.duration / screen.width; 
        song.currentTime = newTime;
        fillBar.style.width = mouseX;       
    }
}