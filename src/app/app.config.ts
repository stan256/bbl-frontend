import {Injectable} from '@angular/core';

@Injectable()
export class AppConfig {
  accountApiUrl: string = "localhost" + ':9002/account'
}
