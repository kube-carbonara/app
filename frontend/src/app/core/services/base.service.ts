import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { ClusterResult, Clusters } from "../models/clusters";

export abstract class BaseService {
    constructor(protected router: Router) {

    }
    public clusterId = (): string => {
        if(!this.router.url || !this.router.url.includes("connections")){
            return ""
        }
        if (this.router.url) {
            const params = this.router.url.split("/").filter(p=> !!p)
            return params.length > 1 ? params[1] : ""
        }
        return ""
    }

    

    public NameSpacesId = (): string => {
        if(!this.router.url || !this.router.url.includes("connections")){
            return ""
        }
        if(this.router.url.includes("/namespaces")){
            if (this.router.url) {
                const params = this.router.url.split("/").filter(p=> !!p)
                return params.length > 3 ? params[3] : "all"
            }
        }
        return "all"
    }

    public DeploymentId = (): string => {
        if(!this.router.url || !this.router.url.includes("connections")){
            return ""
        }
        if(this.router.url.includes("/deployments")){
            if (this.router.url) {
                const params = this.router.url.split("/").filter(p=> !!p)
                return params.length > 5 ? params[5] : ""
            }
        }
        return ""
    }
}
