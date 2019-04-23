#!/usr/bin/env node
'use strict';

const style = require('barrkeep/style');
const random = require('./random');

const colors = [
  '#01508B',
  '#01508B',
  '#0198CD',
  '#0198CD',
  '#C6C6C6',
  '#878787',
  '#1ACB69',
  '#498024',
  '#498024',
  '#3b661d'
];

const [ width, height ] = process.stdout.getWindowSize();

const prng = new random.MersenneTwister(5);

const whitenoise = random.generateWhiteNoise(width, height, prng);

// for (let rows = 0; rows < 20; rows++) {
//   for (let cols = 0; cols < 20; cols++) {
//     const index = (rows * width) + cols;
//     whitenoise[index] = 0;
//   }
// }

let noise = random.generatePerlinNoise(width, height, {
  octaveCount: 5,
  persistence: 0.2,
  amplitude: 0.5,
  prng,
  whitenoise
});

for (let i = 0; i < noise.length; i++) {
  const value = Math.floor(noise[i] * 10);
  noise[i] = style(value, `fg: ${ colors[value] }`);
}

console.log(noise.join(''));
