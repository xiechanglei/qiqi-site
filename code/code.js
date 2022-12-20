import words from './words.js';

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const container = document.querySelector('#container');

let currentWord = [];
let currentIndex, errorSize;

//绘制新的单词
const painNewWord = () => {
    currentIndex = 0;
    errorSize = 0;
    currentWord = words[Math.floor(Math.random() * words.length)].split('');
    container.innerHTML = '';
    currentWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.textContent = letter;
        container.appendChild(letterElement);
    });
}

const removeLetter = () => {
    if (currentIndex === 0) {
        return;
    }
    currentIndex--;
    container.children[currentIndex].classList.remove('correct');
    container.children[currentIndex].classList.remove('incorrect');
    errorSize = container.querySelectorAll('.incorrect').length;
}

const applyNewLetter = (key) => {
    if (currentIndex < currentWord.length) {
        if (key === currentWord[currentIndex]) {
            container.children[currentIndex].classList.add('correct');
        } else {
            container.children[currentIndex].classList.add('incorrect');
        }
        currentIndex++;
        errorSize = container.querySelectorAll('.incorrect').length;
    }
}


document.addEventListener('keydown', e => {
    let { key } = e
    if (key === 'Backspace') {
        removeLetter();
        return;
    }
    if (key === " " || key === "Enter") {
        if (currentIndex === currentWord.length && errorSize === 0) {
            painNewWord();
        }
        return;
    }
    if (letters.indexOf(key) !== -1) {
        applyNewLetter(key)
    }

});

painNewWord();