"use strict";
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton() {
  button.disabled = !button.disabled;
};

async function tellJoke(joke) {
  VoiceRSS.speech({
    key: '5b8496293aee432f993e225c00697c80',
    src: joke,
    hl: 'en-us',
    v: 'John',
    r: -1,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
};

async function getJokes() {
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    tellJoke(joke);

    toggleButton();

  } catch (error) {
    console.log('something wrong', error);
  }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);