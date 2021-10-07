import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NotificationTypes } from 'src/app/core/models/notifications';
import { Ingresses, ResourceTypes } from 'src/app/core/models/resources.result';
import { RealTimeEventsService } from '../../../../app/core/services/events.realtime.service';
import { IngressesService } from 'src/app/core/services/ingresses.service';
import { NotificationService } from '../../../../app/core/services/notification.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-ingress-list',
  templateUrl: './ingress-list.component.html',
  styleUrls: ['./ingress-list.component.scss']
})
export class IngressListComponent implements OnInit {
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1)
  dataSource: any[] = []
  constructor(public service: IngressesService,
      private eventService: RealTimeEventsService<any>,
      private confirmationService: ConfirmationService,
      private notificationService: NotificationService,
      private auth: AuthService

     ) { }
  ngOnDestroy(): void {
    this.destroyed$.next(true)
   this.destroyed$.complete()
  }

  ngOnInit(): void {
    this.eventService.subscribe()
    this.eventService.messages
      .pipe(
        filter(e => !!e && (e.NameSpace == this.service.NameSpacesId() || this.service.NameSpacesId() == 'all')
          && e.Resource == ResourceTypes.RESOUCETYPE_INGRESS
        ),
        takeUntil(this.destroyed$)
      ).subscribe(e => {
        this.load()
      })
      this.load();
  }

  private load(): void{
    this.service.get()
    .then(res=> {
      this.dataSource = res.data.items
    })
  }

  public delete(model: Ingresses){
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete '${model.metadata.name}' ?`,
      accept: () => {
        const index = this.dataSource.findIndex(k=> k.metadata.name == model.metadata.name)
        this.dataSource[index].status.phase = "Deleting.."
         this.service.delete(model.metadata.namespace,model.metadata.name)
         .then(res=> {
           this.notificationService.Add({
            type: NotificationTypes.SUCCESS,
            message: `${model.metadata.name} has been deleted`
           })
         })
      }
  });
  }
  
}
