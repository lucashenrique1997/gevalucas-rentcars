import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { User } from "../models/User";
import {Category} from "../models/Category";
import {Car} from "../models/Car";

@Injectable({
  providedIn: "root",
})
export class BackendService {
  private url = "http://localhost:3000";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient
  ) {}

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(this.url + '/login', { username, password }, this.httpOptions);
  }

  listCategories() {
    return this.http.get<Category[]>(this.url + '/category');
  }

  listCarsByCategory(categoryId: number) {
    return this.http.get<Car[]>(this.url + '/car?categoryId=' + categoryId);
  }

  // post(item: Partial<Grocery>): Observable<any> {
  //   return this.http
  //     .post<Partial<Grocery>>(this.url, item, this.httpOptions);
  // }
  //
  // update(grocery: Grocery): Observable<any> {
  //   return this.http
  //     .put<Grocery>(this.url, grocery, this.httpOptions);
  // }
  //
  // delete(id: number): Observable<any> {
  //   const url = `http://localhost:3000/groceries/${id}`;
  //
  //   return this.http
  //     .delete<Grocery>(url, this.httpOptions);
  // }
}
