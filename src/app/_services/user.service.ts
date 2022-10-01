import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

export interface Category {
  name: string,
  type: string,
  id?: string | undefined
}

export interface Record {
  categoryName: string,
  categoryType: string,
  categoryId?: string
  description: string,
  amount: number,
  balance?: number,
  createdOn?: Date | string,
  isDeleted?: boolean
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  readonly API_URL = 'http://localhost:4000/api/user/';
  httpOptions = {
    headers: new HttpHeaders({ 'token': `Bearer ${this.token.getToken()}` })
  };
  
  constructor(private http: HttpClient, private token: TokenStorageService) { }

  getDetails(): Observable<any> {
    return this.http.get(this.API_URL + 'details', this.httpOptions);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.API_URL + 'add-category', category, this.httpOptions).pipe(
      tap((newCategory: Category) => console.log(`added category with name=${newCategory.name}`)),
      catchError(this.handleError<Category>('addCategory'))
    )
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(this.API_URL + 'update-category', category, this.httpOptions).pipe(
      tap((updatedCategory: Category) => console.log(`updated category with name=${updatedCategory.name}`)),
      catchError(this.handleError<Category>('updatedCategory'))
    )
  }

  addRecord(record: Record): Observable<Record> {
    return this.http.post<Record>(this.API_URL + 'add-record', record, this.httpOptions).pipe(
      tap((newRecord: Record) => console.log(`added record with name=${newRecord.categoryName}`)),
      catchError(this.handleError<Record>('addRecord'))
    )
  }


    /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
     private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        console.log(`${operation} failed: ${error.message}`);
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}