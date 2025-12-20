import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, Subject, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {HEADER_OPTIONS} from './config'
import {decryptData, postDataCrypte} from "../config/config";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private HEADER_OPTIONS = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'no-encoded-request': 'true'
    // 'Access-Control-Request-Private-Network': 'true'
  });
  cache: any[] = [];
  cacheSubject = new Subject<any>();

  constructor(
    public http: HttpClient
  ) {
  }

  emitCache() {
    this.cacheSubject.next(this.cache);
  }

  postData(url: string, data: any, token: string): Observable<HttpResponse<any>> {
    const body = JSON.stringify(data);
    let headers = token ? this.HEADER_OPTIONS.set('Authorization', 'Bearer ' + token) : this.HEADER_OPTIONS;

    return this.http.post(url, {data: postDataCrypte(data)}, {
      headers: headers,
      observe: 'response',
    }).pipe(
      map((res: any) => {
        let rep = decryptData(res.body.data)
        res.body = rep
        return (res);
      }),
      catchError((error) => {
        let errorMessage
        switch (error.status) {
          case 422:
            errorMessage = ""
            break;
          case 401:
            document.location.href = "public/expire"
            break;
          default:
            errorMessage = {message: error.statusText, err: error.error}
            break;
        }
        return throwError({
          status: error.status,
          ok: error.ok,
          statusText: error.statusText,
          error: errorMessage
        });
      })
    );
  }

  putData(url: string, data: any): Observable<HttpResponse<any>> {
    const body = JSON.stringify(data);

    return this.http.put(url, body, {
      headers: HEADER_OPTIONS,
      observe: 'response'
    }).pipe(
      map(res => {
        const response = JSON.parse(JSON.stringify(res.body)).response
        if (!HEADER_OPTIONS.has('no-encoded-request'))
          res = res.clone({
            body: response
          })
        return res
      }),
      catchError((error) => {
        let errorMessage
        switch (error.status) {
          // case 201 || 200 || 400 || 422:
          //     errorMessage = responseDecode(error.error.response, this.env.environment.config.exchange_key)
          //   break;
          case 201:
            errorMessage = ""
            break;
          case 200:
            errorMessage = ""
            break;
          case 400:
            errorMessage = ""
            break;
          case 422:
            errorMessage = ""
            break;
          case 401:
            document.location.href = "public/expire"
            break;
          default:
            errorMessage = {message: error.statusText}
            break;
        }
        return throwError({
          status: error.status,
          ok: error.ok,
          statusText: error.statusText,
          error: errorMessage
        });
      })
    );
  }

  deleteData(url: string): Observable<HttpResponse<any>> {

    return this.http.delete(url, {
      headers: HEADER_OPTIONS,
      observe: 'response'
    }).pipe(
      map(res => {
        const response = JSON.parse(JSON.stringify(res.body)).response
        if (!HEADER_OPTIONS.has('no-encoded-request'))
          res = res.clone({
            body: response
          })
        return res
      }),
      catchError((error) => {
        let errorMessage
        switch (error.status) {
          // case 201 || 200 || 400 || 422:
          //     errorMessage = responseDecode(error.error.response, this.env.environment.config.exchange_key)
          //   break;
          case 201:
            errorMessage = ""
            break;
          case 200:
            errorMessage = ""
            break;
          case 400:
            errorMessage = ""
            break;
          case 422:
            errorMessage = ""
            break;
          case 401:
            document.location.href = "public/expire"
            break;
          default:
            errorMessage = {message: error.statusText}
            break;
        }
        return throwError({
          status: error.status,
          ok: error.ok,
          statusText: error.statusText,
          error: errorMessage
        });
      })
    );
  }

  getData(url: string, useCache = false, token: string): Observable<HttpResponse<any>> {
    //console.log(this.cache);
    // if(this.cache[url] != undefined && useCache){
    //   //console.log('the cache exist, so no request to server');
    //   return of(this.cache[url])
    // }
    const HEADER_OPTIONSs = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Access-Control-Allow-Origin': '*',
      //'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Authorization, X-Requested-With',
      'Content-Type': 'application/json',
      // 'no-encoded-request': 'true'
      // 'Access-Control-Request-Private-Network': 'true'
    });
    return this.http.get(url, {
      headers: HEADER_OPTIONSs,
      observe: 'response'
    }).pipe(
      map((res: any) => {
        const response = JSON.parse(JSON.stringify(res.body)).response
        if (!HEADER_OPTIONSs.has('no-encoded-request'))
          res = res.clone({
            body: response
          })
        // this.cache[url] = res
        // this.emitCache()
        let rep = decryptData(res.body.data)
        res.body = rep
        return res
      }),
      retry(3),
      catchError((error) => {
        let errorMessage
        switch (error.status) {
          // case 201 || 200 || 400 || 422:
          //     errorMessage = responseDecode(error.error.response, this.env.environment.config.exchange_key)
          //   break;
          case 201:
            errorMessage = ""
            break;
          case 200:
            errorMessage = ""
            break;
          case 400:
            errorMessage = ""
            break;
          case 422:
            errorMessage = ""
            break;
          case 401:
           // document.location.href = "public/expire"
            break;
          default:
            errorMessage = {message: error.statusText}
            break;
        }
        return throwError({
          status: error.status,
          ok: error.ok,
          statusText: error.statusText,
          error: errorMessage
        });
      })
    );
  }

  get(url: string, token: string, options?: { key: string, value: string }[]): Observable<HttpResponse<any>> {
    //console.log(this.cache);
    // if (this.cache[url] != undefined) {
      //console.log('the cache exist, so no request to server');
      // return of(this.cache[url])
    // }
    // let Header = HEADER_OPTIONS
    // if(options?.length){
    //   options.forEach(h => {
    //     console.log('set header => ',h)
    //     Header = Header.set(h.key, h.value)
    //   })
    // }
    const HEADER_OPTIONSs = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Access-Control-Allow-Origin': '*',
      //'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Authorization, X-Requested-With',
      'Content-Type': 'application/json',
      // 'no-encoded-request': 'true'
      // 'Access-Control-Request-Private-Network': 'true'
    });
    return this.http.get(url, {
      headers: HEADER_OPTIONSs,
      // headers: Header.set('no-encoded-request', 'true'),
      observe: 'response'
    }).pipe(
      catchError((error) => {
        let errorMessage
        switch (error.status) {
          // case 201 || 200 || 400 || 422:
          //     errorMessage = responseDecode(error.error.response, this.env.environment.config.exchange_key)
          //   break;
          case 201:
            errorMessage = ""
            break;
          case 200:
            errorMessage = ""
            break;
          case 400:
            errorMessage = ""
            break;
          case 422:
            errorMessage = ""
            break;
          case 401:
            //document.location.href = "public/expire"
            break;
          default:
            errorMessage = {message: error.statusText}
            break;
        }
        return throwError({
          status: error.status,
          ok: error.ok,
          statusText: error.statusText,
          error: errorMessage
        });
      })
    );
  }

  post(url:string, payload:any, token:string, options?: { key: string, value: string }[]): Observable<HttpResponse<any>> {
    const body = JSON.stringify(payload)
    // if(options?.length){
    //   options.forEach(h => {
    //     console.log('set header')
    //     Header = {...HEADER_OPTIONS.set(h.key, h.value)}
    //   })
    // }
    let headers = token ? this.HEADER_OPTIONS.set('Authorization', 'Bearer ' + token) : this.HEADER_OPTIONS;
    return this.http.post(url, {data: postDataCrypte(payload)}, {
      headers: headers,
      observe: 'response',
    }).pipe(
      catchError((error) => {
        let errorMessage
        let errorData
        console.log("capter msg ::", error)
        switch (error.status) {
          case 401:
            errorMessage = "Identifiants invalides, réessayez svp !"
            document.location.href = "public/expire"
            break;
          default:
            errorMessage = error?.error
            break;
        }
        return throwError({
          status: error.status,
          ok: error.ok,
          statusText: error.statusText,
          error: errorMessage,
        });
      })
    );
  }

  // put(url, payload, options?: { key: string, value: string }[]): Observable<HttpResponse<any>> {
  //   if (options) {
  //     options.forEach(h => {
  //       HEADER_OPTIONS.set(h.key, h.value)
  //     })
  //   }
  //   const body = JSON.stringify(payload)
  //   return this.http.put(url, body, {
  //     headers: HEADER_OPTIONS,
  //     observe: 'response',
  //   }).pipe(
  //     catchError((error) => {
  //       let errorMessage
  //       switch (error.status) {
  //         // case 201 || 200 || 400 || 422:
  //         //     errorMessage = responseDecode(error.error.response, this.env.environment.config.exchange_key)
  //         //   break;
  //         case 201:
  //           errorMessage = ""
  //           break;
  //         case 200:
  //           errorMessage = ""
  //           break;
  //         case 400:
  //           errorMessage = ""
  //           break;
  //         case 422:
  //           errorMessage = ""
  //           break;
  //         case 401:
  //           document.location.href = "public/expire"
  //           break;
  //         default:
  //           errorMessage = {message: error.statusText}
  //           break;
  //       }
  //       return throwError({
  //         status: error.status,
  //         ok: error.ok,
  //         statusText: error.statusText,
  //         error: errorMessage
  //       });
  //     })
  //   );
  // }

  cleanCache(interval: number) {
    setInterval(() => {
      this.cache = []
      this.emitCache()
    }, interval)
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message)
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(`Backend returned code ${error.status}, ` +
      // `body was: ${JSON.stringify(error.error)}`)
    }
    // return an observable with a user-facing error message
    // return throwError(
    //   'Something bad happened; please try again later.');
    return throwError({
      status: error.status,
      ok: error.ok,
      statusText: error.statusText,
      // error: responseDecode(error.error.response, this.core.config.exchange_key)
    });
  };

  postDataNoCrypt(url: string, data: any): Observable<HttpResponse<any>> {

    const HEADER_OPTIONSs = new HttpHeaders({
      // 'Authorization': 'Bearer ' + AUTHORIZATION.apwParam.token,
      'Access-Control-Allow-Origin': '*',
      //'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Authorization, X-Requested-With',
      'Content-Type': 'application/json',
      // 'no-encoded-request': 'true'
      // 'Access-Control-Request-Private-Network': 'true'
    });
    return this.http.post(url, data, {
      headers: HEADER_OPTIONSs,
      observe: 'response',
    }).pipe(
      map(res => {
        return res;
      }),
      catchError((error) => {
        // console.log(error)
        let errorMessage
        switch (error.status) {
          // case 201 || 200 || 400 || 422:
          //     errorMessage = responseDecode(error.error.response, this.env.environment.config.exchange_key)
          //   break;
          case 201:
            errorMessage = ""
            break;
          case 200:
            errorMessage = ""
            break;
          case 400:
            errorMessage = ""
            break;
          case 422:
            errorMessage = ""
            break;
          case 401:
            break;
          default:
            errorMessage = {message: error.statusText, err: error}
            break;
        }
        return throwError({
          status: error.status,
          ok: error.ok,
          statusText: error.statusText,
          error: errorMessage
        });
      })
    );
  }
}
