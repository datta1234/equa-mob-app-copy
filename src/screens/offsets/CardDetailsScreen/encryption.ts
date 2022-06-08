import CryptoJS from 'crypto-js';

export const encryptCardDetails = (cardDetails, key, iv) => {
  // const CryptoJS = require('crypto-js');
  // const keyHex = CryptoJS.enc.Hex.parse(key);
  // const ivHex = CryptoJS.enc.Hex.parse(iv);
  // const keyWords = CryptoJS.lib.WordArray.create(key);
  // const ivWords = CryptoJS.lib.WordArray.create(iv);
  // const keyUT = CryptoJS.enc.Utf8.parse(key);
  // const ivUT = CryptoJS.enc.Utf8.parse(iv);
  const keyBase = CryptoJS.enc.Base64.parse(key);
  const ivBase = CryptoJS.enc.Base64.parse(iv);

  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(cardDetails), keyBase, {
    iv: ivBase,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const cipherText = encrypted.toString();
  return cipherText;
};
