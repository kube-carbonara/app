import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { EventStream } from "../models/event-stream";
import { BaseResource } from "../models/resources.result";
import { WebSocketService } from "./ws.service";

@Injectable({providedIn:'root'})
export class RealTimeEventsService<T extends BaseResource>{
    private url: string = `${environment.ws}${environment.sockets.outbound}`
    public messages: Observable<EventStream<T>>

    constructor(private readonly wsService: WebSocketService<EventStream<T>>){
        this.messages = this.wsService.connect(this.url)
        .pipe(map(m=> {
            const data = JSON.parse(m.data) as EventStream<T>
            return data
        }))
    }
   
}