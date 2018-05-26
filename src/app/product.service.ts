import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  getJSON(): Observable<any> {
    return this.http.get("assets/data.json")
      .map((res: any) => res.json());
  }

}
