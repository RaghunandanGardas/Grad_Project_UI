import { Component } from '@angular/core';
import * as abc from '../../node_modules/jssha/src/sha.js';
import * as aes from '../../node_modules/crypto-js'
//import sha256 from '../../node_modules/crypto-js/sha256.js';
declare var require: any

//declare var jsSHA: any;
declare var jsAES: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //shaObj: any;
  aesObj: any;
  hash: string;
  public listUsers = [];
  title = 'app';
  public name = "FromParentApp"
  constructor() {
    //-------PART 1-------------------
    // var CryptoJS = require("crypto-js");
    // var originalKey = "ssshhhhhhhhhhh!!!!";
    // var password = "highjack@1";
    // this.shaObj = new jsSHA("SHA-1", "TEXT");
    // this.shaObj.update(password);
    // var hashedPassword = this.shaObj.getHash("B64");
    // var userInput = "demoUserAngular1" + ":" + hashedPassword;
    // var encryptedUserInput = CryptoJS.AES.encrypt(userInput, originalKey);
    // console.log("Encrypted Message: " + encryptedUserInput);
    // console.log("====================================")
    // this.shaObj = new jsSHA("SHA-256", "TEXT");
    // this.shaObj.update("password");
    // this.hash = this.shaObj.getHash("B64");

    // var aesjs = require('aes-js');
    // var AES = require("crypto-js/aes");
    // var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    // // Convert text to bytes
    // var text = 'TextMustBe16Byte';
    // var textBytes = aesjs.utils.utf8.toBytes(text);

    // var aesEcb = new aesjs.ModeOfOperation.ecb(key);
    // var encryptedBytes = aesEcb.encrypt(textBytes);

    // // To print or store the binary data, you may convert it to hex
    // var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    // console.log("Encrypted Hex:" + encryptedHex);
    // // "a7d93b35368519fac347498dec18b458"
    // /*
    // * ssshhhhhhhhhhh!!!!
    // */
    // // When ready to decrypt the hex string, convert it back to bytes
    // var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

    // // Since electronic codebook does not store state, we can
    // // reuse the same instance.
    // //var aesEcb = new aesjs.ModeOfOperation.ecb(key);
    // var decryptedBytes = aesEcb.decrypt(encryptedBytes);

    // // // Convert our bytes back into text
    // // var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    // // console.log("Decrypted:" + decryptedText);
    // //jsSHA = require("jssha");
    // var originalKey = "ssshhhhhhhhhhh!!!!";
    // require(["crypto-js/aes", "crypto-js/sha1"], function (AES, SHA1) {
    //   console.log("HEYYYYYYYYY:" + SHA1(originalKey));
    // });
    // var CryptoJS = require("crypto-js");

    // //this.shaObj = new jsSHA("SHA-256", "TEXT");
    // //this.shaObj.update(originalKey);
    // //var hashedKey = this.shaObj.getHash("B64");
    // var plain = "highjack@1";
    // var encrypted = CryptoJS.AES.encrypt(plain, "[B@70dea4e");
    // //var encrypted = CryptoJS.AES.encrypt("Message", hashedKey,
    // //j{ mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    // //console.log("HashedKey:" + hashedKey);
    // console.log("Plain message: " + plain + ",Encrypted Message: " + encrypted);
    // //var hash = CryptoJS.SHA256("password");
    // //console.log("HASh in cryptoJS:"+hash);
    // //console.log("CryptoJS:"+CryptoJS.HmacSHA1("password", "Key"));
    // //var cryptoJS = require("crypto-js");
    // console.log("--------------------------------------------------")
    // var CryptoJS = require("crypto-js");

    // // Encrypt
    // var ciphertext = CryptoJS.AES.encrypt('message', 'M2n5vafOPcM/vzSA+ilkvQ==');
    // console.log('Cipher is:' + ciphertext.toString());
    // // Decrypt
    // var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), 'ssshhhhhhhhhhh!!!!');
    // var plaintext = bytes.toString(CryptoJS.enc.Utf8);

    // console.log(plaintext);
    // this.hashPassword();
    //console.log("-----------------------------------------");

    var cryptoJS = require("crypto-js");
    let hashedKey = cryptoJS.SHA1("key");
    console.log(hashedKey);
    require(["crypto-js/aes", "crypto-js/sha256"], function (AES, SHA256) {
      console.log(SHA256("highjack@1"));
      var plaintext = SHA256("highjack@1").toString(cryptoJS.enc.Utf8);
      console.log("HASHED HIGHJACK@!:")
    });
    var url = "Hello World";
    var data = [];
    for (var i = 0; i < url.length; i++) {
      data.push(url.charCodeAt(i));
    }
    // var strBytes = new Uint8Array(hashedKey);
    // var array = new Uint8Array(16);
    // for (var i = 0; i < 16; i++) {
    //   array[i] = strBytes[i];
    // }
    console.log(data);
    this.encryptString("helllofromtheotherside");

    // let whatToEncryptAsUtf8 = Crypto.charenc.UTF8.stringToBytes
    //   ("demoUserAngular1:YC/PwzC+regTBz0e6xWb7Q==");
    // let keyAsUtf8 = Crypto.charenc.UTF8.stringToBytes("ssshhhhhhhhhhh!!!!");
    // let encrypted = Crypto.AES.encrypt(whatToEncryptAsUtf8, keyAsUtf8);
    // console.log("Plain:" + whatToEncryptAsUtf8);
    // console.log("Key:" + keyAsUtf8);
    // console.log("Encrypted:" + encrypted);
    // console.log("-----------------------------------------");
  }

  encryptString(stringToEncrypt) {
    console.log("-----------------------------------------");
    var CryptoJS = require("crypto-js");
    var text = "demoUserAngular1:YC/PwzC+regTBz0e6xWb7Q==";
    var secret = "ssshhhhhhhhhhh!!!!";
    var encrypted = CryptoJS.AES.encrypt(text, secret);
    encrypted = encrypted.toString();
    console.log("Cipher text: " + encrypted);
    console.log("-----------------------------------------");
  }
}
