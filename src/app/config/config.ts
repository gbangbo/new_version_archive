import {Injectable, OnInit} from '@angular/core';
import * as cryptojs from 'crypto-js';
import {iv, key} from "../core/config";

@Injectable({
  providedIn: 'root'
})
export class Configapp implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
  }

  setEncrypt(text: string, key: any) {
    return cryptojs.AES.encrypt(text, key).toString();
  }

  getDecrypt(ciphertext: any, passphrase: any) {
    let originalText: any;
    try {
      const bytes = cryptojs.AES.decrypt(ciphertext, passphrase);
      originalText = bytes.toString(cryptojs.enc.Utf8);
    } catch (error: any) {
      throw 'Error to decrypt request => ' + error.message;
    }
    return originalText;
  }
}

export function getDecr(ciphertext: any, passphrase: any) {
  let originalText: any;
  try {
    const bytes = cryptojs.AES.decrypt(ciphertext, passphrase);
    originalText = bytes.toString(cryptojs.enc.Utf8);
  } catch (error: any) {
    throw 'Error to decrypt request => ' + error.message;
  }
  return originalText;
}

export function decode64(text: string) {

  text = text.replace(/\s/g, "");

  if (!(/^[a-zàâäçdeéèêëiîïôöuùûü0-9\+\/\s]+\={0,2}$/i.test(text)) || text.length % 4 > 0) {
    throw new Error("Not a base64-encoded string.");
  }
  let digits = "AÂÄBCDEÊËFGHIÎÏJKLMNOÔÖPQRSTUÛÜVWXYZàâäabcçdeéèêëfghiîïjklmnoôöpqrstuùûüvwxyz0123456789+/",
    cur, prev = 0, digitNum, i = 0,
    result = [];

  text = text.replace(/=/g, "");

  while (i < text.length) {

    cur = digits.indexOf(text.charAt(i));
    digitNum = i % 4;

    switch (digitNum) {

      //case 0: first digit - do nothing, not enough info to work with
      case 1:
        //second digit
        result.push(String.fromCharCode(prev << 2 | cur >> 4));
        break;

      case 2:
        //third digit
        result.push(String.fromCharCode((prev & 0x0f) << 4 | cur >> 2));
        break;

      case 3:
        //fourth digit
        result.push(String.fromCharCode((prev & 3) << 6 | cur));
        break;
    }

    prev = cur;
    i++;
  }

  return result.join("");
}

export function encode64(text: any) {
  // if(/(^[0-9A-Za-zÀ-ÿ\ ,.\;'\-()\s\:\!\?\"])+/.test(text)){
  // if (/([^\u0000-\u00ffàâäçdeéèêëiîïôöuùûü])/i.test(text)) {
  //     throw new Error("Can't base64 encode non-ASCII characters.");
  // }

  var digits = "AÂÄBCDEÊËFGHIÎÏJKLMNOÔÖPQRSTUÛÜVWXYZàâäabcçdeéèêëfghiîïjklmnoôöpqrstuùûüvwxyz0123456789+/",
    // var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    i = 0,
    cur, prev, byteNum, result = [];

  while (i < text.length) {

    cur = text.charCodeAt(i);
    byteNum = i % 3;

    switch (byteNum) {
      case 0:
        //first byte
        result.push(digits.charAt(cur >> 2));
        break;

      case 1:
        //second byte
        result.push(digits.charAt((prev & 3) << 4 | (cur >> 4)));
        break;

      case 2:
        //third byte
        result.push(digits.charAt((prev & 0x0f) << 2 | (cur >> 6)));
        result.push(digits.charAt(cur & 0x3f));
        break;
    }

    prev = cur;
    i++;
  }

  if (byteNum == 0) {
    result.push(digits.charAt((prev & 3) << 4));
    result.push("==");
  } else if (byteNum == 1) {
    result.push(digits.charAt((prev & 0x0f) << 2));
    result.push("=");
  }

  return result.join("");
}

function encryptWithAES(text: string, passphrase: any) {
  return cryptojs.AES.encrypt(text, passphrase).toString();
}

export function requestEncode(request: any, key_crypt: any) {
  return {request: encryptWithAES(request, key_crypt)}
}

export function cryptSession(session_string: string, key_crypt: any) {
  return encryptWithAES(session_string, key_crypt)
}

export function postDataCrypte(data: any): string {
  const dataString = JSON.stringify(data); // Convertir les données en chaîne JSON
  const encrypted = cryptojs.AES.encrypt(dataString, key, {
    iv: iv,
    mode: cryptojs.mode.CBC,
    padding: cryptojs.pad.Pkcs7
  });

  return encrypted.toString(); // Renvoie la chaîne chiffrée
}

export function decryptData(encryptedData: any) {
  const decrypted = cryptojs.AES.decrypt(encryptedData, key, {
    iv: iv,
    mode: cryptojs.mode.CBC,
    padding: cryptojs.pad.Pkcs7
  });
  const decryptedData = decrypted.toString(cryptojs.enc.Utf8);
  // Tenter de parser seulement si les données sont valides
  try {
    let data = JSON.parse((decryptedData));
    return data;  // Cette étape peut échouer si ce n'est pas du JSON valide
  } catch (error: any) {
    console.error('Erreur lors du parsing JSON:', error.message);
    throw new Error('Données décryptées non valides pour le parsing JSON');
  }
}

export function convertirEnLettres(montant: any) {
  const unites = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
  const dizaines = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];
  const exceptions: { [key: string]: string } = {
    11: 'onze',
    12: 'douze',
    13: 'treize',
    14: 'quatorze',
    15: 'quinze',
    16: 'seize',
    71: 'soixante et onze',
    91: 'quatre-vingt-onze'
  };

  function convertirNombre(nombre: number): any {
    if (String(nombre) in exceptions) return exceptions[String(nombre)];
    // if (nombre in exceptions) return exceptions[nombre];
    if (nombre < 10) return unites[nombre];
    if (nombre < 20) return dizaines[1] + '-' + unites[nombre % 10];
    if (nombre < 70) {
      return dizaines[Math.floor(nombre / 10)] + (nombre % 10 ? '-' + unites[nombre % 10] : '');
    }
    if (nombre < 80) {
      return dizaines[6] + (nombre % 10 ? '-' + convertirNombre(nombre % 10 + 10) : '');
    }
    return dizaines[Math.floor(nombre / 10)] + (nombre % 10 ? '-' + unites[nombre % 10] : '');
  }

  function convertirGroupe(nombre: any) {
    const centaines = Math.floor(nombre / 100);
    const reste = nombre % 100;
    let resultat = '';

    if (centaines) {
      resultat += (centaines > 1 ? unites[centaines] + ' ' : '') + 'cent' + (centaines > 1 && !reste ? 's' : '') + ' ';
    }

    if (reste) {
      resultat += convertirNombre(reste);
    }

    return resultat.trim();
  }

  const parties = montant.toFixed(2).split('.');
  let entier = parseInt(parties[0]);
  const decimales = parseInt(parties[1]);

  if (entier === 0) return 'zéro ' + (decimales ? ' ' + convertirNombre(decimales) + ' centime' + (decimales > 1 ? '' : '') : '');

  let resultat = '';
  const milliards = Math.floor(entier / 1000000000);
  entier %= 1000000000;
  const millions = Math.floor(entier / 1000000);
  entier %= 1000000;
  const milliers = Math.floor(entier / 1000);
  entier %= 1000;

  if (milliards) {
    resultat += convertirGroupe(milliards) + ' milliard' + (milliards > 1 ? '' : '') + ' ';
  }
  if (millions) {
    resultat += convertirGroupe(millions) + ' million' + (millions > 1 ? '' : '') + ' ';
  }
  if (milliers) {
    resultat += convertirGroupe(milliers) + ' mille ';
  }
  if (entier) {
    resultat += convertirGroupe(entier) + ' ';
  }

  resultat += (parties[0] > 1 ? '' : '');

  if (decimales) {
    resultat += ' et ' + convertirNombre(decimales) + ' centime' + (decimales > 1 ? '' : '');
  }

  return resultat.trim();
}

