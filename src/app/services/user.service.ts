import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Observable, Subject, catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user.model';
import { Category } from '../shared/models/category.model';
import { Record } from '../shared/models/record.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'authorization': `Bearer ${this.token.getToken()}`
    })
  }
  private userSubject: Subject<any> = new Subject<any>();
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private token: TokenStorageService) { }

  getUser(): void {
    this.http.get<User>(environment.USER_API + 'details', this.httpOptions).subscribe(res => {
      this.userSubject.next(res);
    });
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(environment.USER_API + 'add-category', category, this.httpOptions)
      .pipe(
        tap((newCat: Category) => console.log(`added category with name=${newCat.name}`)),
        catchError(this.handleError<Category>('add category'))
      )
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(environment.USER_API + 'update-category', category, this.httpOptions)
      .pipe(
        tap((updatedCat: Category) => console.log(`updated category with name=${updatedCat.name}`)),
        catchError(this.handleError<Category>('updated category'))
      )
  }

  addRecord(record: Record): Observable<Record> {
    return this.http.post<Record>(environment.USER_API + 'add-record', record, this.httpOptions)
      .pipe(
        tap((newRecord: Record) => console.log(`added record with name=${newRecord.categoryName}`)),
        catchError(this.handleError<Record>('add record'))
      )
  }

  updateRecord(record: Record): Observable<Record> {
    return this.http.put<Record>(environment.USER_API + 'update-record', record, this.httpOptions)
      .pipe(
        tap((newRecord: Record) => console.log(`updated record with name=${newRecord.categoryName}`)),
        catchError(this.handleError<Record>('update record'))
      )
  }

  deleteRecord(record: Record): Observable<Record> {
    return this.http.put<Record>(environment.USER_API + 'delete-record', record, this.httpOptions)
      .pipe(
        tap((newRecord: Record) => console.log(`deleted record with name=${newRecord.categoryName}`)),
        catchError(this.handleError<Record>('add record'))
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
