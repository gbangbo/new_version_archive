import {HttpHeaders} from "@angular/common/http";
import * as cryptojs from 'crypto-js';
import {environment} from '../../environments/environment';

// export const _ = require('lodash')

export const HEADER_OPTIONS = new HttpHeaders({
  // 'Authorization': 'Basic '+environment.key_crypt,
  'Access-Control-Allow-Origin': '*',
  //'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Authorization, X-Requested-With',
  'Content-Type': 'application/json',
  //'no-encoded-request': 'true'
  // 'Access-Control-Request-Private-Network': 'true'
});

export const API_URL = environment.production ? "http://192.168.2.254:3000/endpoint-adc/:" : "http://62.171.169.100:3000/endpoint-adc/:"
export const HOST = environment.production ? "http://192.168.20.221:2085" : "http://localhost:2085"
export const key = cryptojs.enc.Utf8.parse('1234567890123456')
export const iv = cryptojs.enc.Utf8.parse('1234567890123456');
