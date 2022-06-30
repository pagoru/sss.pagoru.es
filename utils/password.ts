// https://github.com/pagoru/super-secret-settings/blob/master/index.ts

// https://github.com/emn178/js-sha512
declare const sha512: Function;
import * as randomSeed from './random-seed.js'

const CHARACTERS = "ABCDFGHIJKLMNOPQRSTUVWXYZabdfghijklmnopqrstuvwxyz1234567890";

export function getPassword(password: string, service: string, length: number = 12, alphabet: string = CHARACTERS) {
  let generatedPassword = "";
  
  const hexadecimalSeed = sha512(password + sha512(service));
  const random = randomSeed.create(hexadecimalSeed);
  
  for (let i = 0; i < length; i++)
    generatedPassword += alphabet[random(alphabet.length)];
  
  return generatedPassword;
}

export function getCssColor(text: string, s: number = 75, l: number = 75) {
  const seed = sha512(text);
  const random = randomSeed.create(seed);
  const h = random.intBetween(0, 360);
  
  // HSL: https://www.w3schools.com/colors/colors_hsl.asp
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}