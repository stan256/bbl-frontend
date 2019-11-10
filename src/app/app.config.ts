import {Injectable} from '@angular/core';

@Injectable()
export class AppConfig {
  url: "localhost";

  accountApiUrl: string = this.url + ':9002/account'
}
