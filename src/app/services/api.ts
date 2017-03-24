import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
// Add observable to use it in http requests
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';


@Injectable()
export class ApiService {

  private options = new RequestOptions({
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  });
  // options: Headers = new Headers({
  //   'Content-Type': 'application/json',
  //   Accept: 'application/json'
  // });

  api_url: string = 'http://localhost:3000';


  // ES6 constructor is used in typescript and angular2 for dependecy injection
  constructor(private http: Http){
  }

  private getJson(resp: Response) {
    return resp.json();
  }
  
  // default response is Response....  
  private checkForError(resp:Response): Response {
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    } else {
      const error = new Error(resp.statusText);
      error['response'] = resp;
      console.error(error);
      throw error;
    }
  }

  private setParams(search:{}) {
    let params: URLSearchParams = new URLSearchParams();
    for (let key in search) {
      if (search.hasOwnProperty(key)) {
        params.set(key, search[key]);
        this.options.search = params;
      }
    }
  }

  get(path: string, search: {}): Observable<any> {
    this.setParams(search);

    return this.http.get(`${this.api_url}${path}`,  this.options)
    // Because it is Observable this is an array and map and catch use it. 
    // map and catch in the meaning of Observable are available in rxjs library
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }

  post(path: string, body): Observable<any> {
    return this.http.post(
      `${this.api_url}${path}`,
      JSON.stringify(body),
      {headers: this.options}
    )
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${this.api_url}${path}`, this.options)
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }

  //Method to update headers to add auth token
  setHeaders(headers) {
    Object.keys(headers)
    .forEach(header => this.options.set(header, headers[header]))
  }
}

