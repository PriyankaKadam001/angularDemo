import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerService {
    constructor(private http: HttpClient) { }

    getCustomersMedium() {
        return this.http.get<any>('assets/test.json')
            .toPromise()
            .then(res => <any[]>res.data)
            .then(data => { return data; });
    }
}