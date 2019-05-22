import { Injectable } from '@angular/core';
import { DataserviceService } from '../../services/consultantAPI/dataservice.service'
import { Resolve , ActivatedRouteSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResolveService implements Resolve<any>{

  constructor(private dataservice:DataserviceService) { }

  resolve(route: ActivatedRouteSnapshot){
      let id= route.paramMap.get("id");
      return this.dataservice.getData(id);
  }
}
