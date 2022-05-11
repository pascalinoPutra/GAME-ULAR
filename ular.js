// kotak batas ular
var ukuranKotak = 32;
var baris = 20;
var kolom = 30;
var papan;
var context;

// tembok
// var tembokX = 1 * ukuranKotak;
// var tembokY = 1 * ukuranKotak;

// ular
var ularX = ukuranKotak * 5;
var ularY = ukuranKotak * 5;

// kecepatan ular
var kecX = 0;
var kecY = 0;

var tubuhUlar = [];

// apel
var apelX;
var apelY;

var gameBerakhir = false;

window.onload = function () {
    papan = document.getElementById("papan");
    papan.height = baris * ukuranKotak;
    papan.width = kolom * ukuranKotak;
    context = papan.getContext("2d");

    letakApel();
    document.addEventListener("keyup", kontroler);
    setInterval(dataUlar, 1000 / 10);
}

function dataUlar() {
    if (gameBerakhir) {
        return;
    }
    context.fillStyle = "AntiqueWhite";
    context.fillRect(0, 0, papan.width, papan.height);

    context.fillStyle = "maroon";
    context.fillRect(apelX, apelY, ukuranKotak, ukuranKotak)

    if (ularX == apelX && ularY == apelY) {
        tubuhUlar.push([apelX, apelY]);
        letakApel();
    }

    for (let i = tubuhUlar.length - 1; i > 0; i--) {
        tubuhUlar[i] = tubuhUlar[i - 1];
    }

    if (tubuhUlar.length) {
        tubuhUlar[0] = [ularX, ularY];
    }

    context.fillStyle = "green";
    ularX += kecX * ukuranKotak;
    ularY += kecY * ukuranKotak;
    context.fillRect(ularX, ularY, ukuranKotak, ukuranKotak);
    for (let i = 0; i < tubuhUlar.length; i++) {
        context.fillRect(tubuhUlar[i][0], tubuhUlar[i][1], ukuranKotak, ukuranKotak)
    }

    if (ularX < 0 || ularX > kolom * ukuranKotak || ularY < 0 || ularY > baris * ukuranKotak) {
        gameBerakhir = true;
        alert("Game Over");
    }
    for (let i = 0; i < tubuhUlar.length; i++) {
        if (ularX == tubuhUlar[i][0] && ularY == tubuhUlar[i][1]) {
            gameBerakhir = true;
            alert("Game Over");
        }
    }
}

function kontroler(e) {
    if (e.code == "ArrowUp" && kecY != 1) {
        kecX = 0;
        kecY = -1;
    }
    else if (e.code == "ArrowDown" && kecY != -1) {
        kecX = 0;
        kecY = 1;
    }
    else if (e.code == "ArrowRight" && kecX != -1) {
        kecX = 1
        kecY = 0;
    }
    else if (e.code == "ArrowLeft" && kecX != 1) {
        kecX = -1;
        kecY = 0;
    }
}

function letakApel() {
    apelX = Math.floor(Math.random() * kolom) * ukuranKotak;
    apelY = Math.floor(Math.random() * baris) * ukuranKotak;
}
