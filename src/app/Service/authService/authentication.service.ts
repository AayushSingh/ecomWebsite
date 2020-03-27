import {Injectable} from '@angular/core';
import * as dummyJSON from '../../../dummy.json';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() {
  }

  /**
   * @param credentials
   * @returns {{success: boolean; result: any[]}}
   */
  authenticate(credentials: any) {

    const response = {success: false, result: []};
    console.log(dummyJSON);
    if (!environment.production) {
      dummyJSON.users.forEach((user) => {
        if (user.email === credentials.email && user.password === credentials.password) {
          response.success = true;
          response.result.push({name: user.name, email: user.email});
        }
      });
    }
    return response;
  }

}
