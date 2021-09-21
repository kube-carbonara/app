import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { BASE_URL_TOKEN } from "src/app/consts/config";
import { environment } from "src/environments/environment";
import {  ResourceResult, Secrets } from "../models/resources.result";
import { BaseService } from "./base.service";

@Injectable({providedIn:'root'})
export class SecretsService extends BaseService{
    public result$: BehaviorSubject<ResourceResult<Secrets>> = new BehaviorSubject(null)

 constructor(private http: HttpClient, protected router: Router, @Inject(BASE_URL_TOKEN) private baseUrl: string){
     super(router)
 }

 async get(): Promise<ResourceResult<Secrets>> {
    return this.http.get<ResourceResult<Secrets>>(`${this.baseUrl}${environment.api.k8s}/${this.clusterId()}/${this.NameSpacesId()}${environment.api.secrets}`)
    .pipe(map(res=> {
        this.result$.next(res)
      return res
    }))
      .toPromise()

  }
}