import words from './words-java.js';

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const container = document.querySelector('#container .current');
const nextContainer = document.querySelector('#container .next');
const previousContainer = document.querySelector('#container .previous');

let previousWord = [];
let nextWord = [];
let currentWord = [];
let currentIndex, errorSize;

const randomWord = () => words[Math.floor(Math.random() * words.length)].split('');

const buildLetterElement = (letter) => {
    const letterElement = document.createElement('span');
    letterElement.textContent = letter;
    return letterElement;
}

//绘制新的单词
const painNewWord = () => {
    currentIndex = 0;
    errorSize = 0;
    if (nextWord.length === 0) {
        nextWord = randomWord()
    }
    previousWord = currentWord;
    currentWord = nextWord;
    nextWord = randomWord();

    container.innerHTML = '';
    currentWord.forEach(letter => container.appendChild(buildLetterElement(letter)));

    nextContainer.innerHTML = '';
    nextWord.forEach(letter => nextContainer.appendChild(buildLetterElement(letter)));

    previousContainer.innerHTML = '';
    previousWord.forEach(letter => {
        const letterElement = buildLetterElement(letter);
        letterElement.classList.add('correct');
        previousContainer.appendChild(letterElement);
    });

    //动画

    container.classList.remove('animate');
    nextContainer.classList.remove('animate');
    previousContainer.classList.remove('animate');
    previousContainer.classList.remove('shaking');

    setTimeout(() => {
        container.classList.add('animate');
        nextContainer.classList.add('animate');
        previousContainer.classList.add('animate');
    }, 0);


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
            container.classList.add('shaking');
            setTimeout(() => {
                container.classList.remove('shaking');
            },100);
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
    // if (key === " " || key === "Enter") {
    //     if (currentIndex === currentWord.length && errorSize === 0) {
    //         painNewWord();
    //     }
    //     return;
    // }
    if (letters.indexOf(key.toLowerCase()) !== -1) {
        applyNewLetter(key)
        if (currentIndex === currentWord.length && errorSize === 0) {
            painNewWord();
        }
    }

});

painNewWord();