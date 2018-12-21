import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public apiUrl: string = "https://my-json-server.typicode.com/banshilaldangi/ecommerce/";

  constructor(private http: HttpClient, private spinnerService: Ng4LoadingSpinnerService ) { }

  public get (url: string, loader: boolean = true) :Observable<any> {
    this.spinnerService.show();
    return this.http.get<any>(this.apiUrl+url).pipe(
      map(result => {
        this.spinnerService.hide();
        return result;
      })
    );
  }
}
