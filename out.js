/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//właściwa treść zadania - zamknięta w funkcji, ponieważ na dole są warunki do wywołania
function allGame() {

    //konstruktor Furry
    function Furry() {
        this.x = 0;
        this.y = 0;
        this.direction = 'right';
    }
    //konstruktor Monety
    function Coin() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }

    //setInteraval na Furrego - jesli zrobie go w Game() to nie wiem jak sie do niego odniść aby go poźniej zatrzymać
    var idSetInterval = setInterval(function () {
        newGame.moveFurry();
    }, speed); //predkosc wybiera sobie użytkownik - zdefiniowana na dole

    //konstruktor gry
    function Game() {
        this.board = document.querySelectorAll('section#board div');
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
        this.index = function (x, y) {
            return x + y * 10;
        };
        this.hideVisibleFurry = function () {
            var classFurry = document.querySelector('.furry');
            if (classFurry) {
                classFurry.classList.remove('furry');
            }
        };
        this.showFurry = function () {
            this.hideVisibleFurry();
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
        };
        this.showCoin = function () {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        };
        this.moveFurry = function () {
            if (this.furry.direction === "right") {
                this.furry.x = this.furry.x + 1;
            } else if (this.furry.direction === "left") {
                this.furry.x = this.furry.x - 1;
            } else if (this.furry.direction === 'up') {
                this.furry.y = this.furry.y - 1;
            } else if (this.furry.direction == "down") {
                this.furry.y = this.furry.y + 1;
            };
            this.gameOver();
            this.showFurry();
            this.checkCoinCollision();
        };
        this.startGame = function () {
            idSetInterval;
        };
        this.turnFurry = function (event) {
            switch (event.which) {
                case 37:
                    this.furry.direction = 'left';
                    break;
                case 38:
                    this.furry.direction = 'up';
                    break;
                case 39:
                    this.furry.direction = 'right';
                    break;
                case 40:
                    this.furry.direction = 'down';
                    break;
            }
        };
        this.checkCoinCollision = function () {
            if (this.furry.x == this.coin.x && this.furry.y == this.coin.y) {
                var classCoin = document.querySelector('.coin');
                if (classCoin) {
                    classCoin.classList.remove('coin');
                    this.score++;
                    var scoreValue = document.querySelector('#score div strong');
                    scoreValue.innerText = this.score;
                    var newCoin = new Coin();
                    this.coin = newCoin;
                    this.showCoin();
                }
            }
        };
        this.gameOver = function () {
            if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
                clearInterval(idSetInterval);
                this.hideVisibleFurry();
                var _sectionAlert = document.querySelector('#over');
                _sectionAlert.classList.remove('invisible');
                var _messageAlert = document.createElement("p");
                //dodatkowo
                var restartButton = document.createElement('p');
                restartButton.innerText = "Spróbuj ponownie - kliknij tutaj";
                restartButton.classList.add('btnRestart');

                _messageAlert.innerText = "Twój wynik to: " + this.score;
                _sectionAlert.appendChild(_messageAlert);
                _sectionAlert.appendChild(restartButton);
                //przeładowanie strony
                restartButton.addEventListener('click', function () {
                    location.reload();
                });
            }
        };
    }

    //uruchomienie
    var newGame = new Game();
    newGame.showFurry();
    newGame.showCoin();
    newGame.startGame();
    document.addEventListener('keydown', function (event) {
        newGame.turnFurry(event);
    });
}

//dodatek upiększający formę gry
var sectionAlert = document.querySelector('#over');
sectionAlert.classList.remove('invisible');
var newDivWelcome = document.createElement('div');
var messageAlert = document.createElement("p");
var newButton1 = document.createElement('button');
var newButton2 = document.createElement('button');
var newButton3 = document.createElement('button');
var newButton4 = document.createElement('button');

messageAlert.innerText = ' Wybierz poziom trudności';
newButton1.innerText = 'Easy';
newButton2.innerText = 'Medium';
newButton3.innerText = 'Hard';
newButton4.innerText = 'Proffesional';

sectionAlert.appendChild(newDivWelcome);
newDivWelcome.appendChild(messageAlert);
newDivWelcome.appendChild(newButton1);
newDivWelcome.appendChild(newButton2);
newDivWelcome.appendChild(newButton3);
newDivWelcome.appendChild(newButton4);

sectionAlert.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
newDivWelcome.style.width = '100%';
newDivWelcome.style.textAlign = 'center';
var allButton = document.querySelectorAll('button');
var speed = 0;

for (var i = 0; i < allButton.length; i++) {
    var el = allButton[i];
    el.classList.add('btnStart');
    el.addEventListener('click', function () {
        if (this.innerText === 'Easy') {
            speed = 450;
            newDivWelcome.parentElement.removeChild(newDivWelcome);
            sectionAlert.classList.add('invisible');
            allGame();
        } else if (this.innerText == 'Medium') {
            speed = 250;
            newDivWelcome.parentElement.removeChild(newDivWelcome);
            sectionAlert.classList.add('invisible');
            allGame();
        } else if (this.innerText == 'Hard') {
            speed = 150;
            newDivWelcome.parentElement.removeChild(newDivWelcome);
            sectionAlert.classList.add('invisible');
            allGame();
        } else if (this.innerText == 'Proffesional') {
            speed = 50;
            newDivWelcome.parentElement.removeChild(newDivWelcome);
            sectionAlert.classList.add('invisible');
            allGame();
        }
    });
};

/***/ })
/******/ ]);