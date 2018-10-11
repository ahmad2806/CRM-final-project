import { Injectable } from '@angular/core';
import { DonorModel } from './donor.model';
import { EventModel } from '../event/event.model';
import { Donate } from './donate.model';

@Injectable()
export class DonorService {

  public Donor:DonorModel[]=[

  ];

  constructor() { }
  public get donor(){
    return this.Donor;
  }
  
   public add(don:DonorModel){
    this.Donor.push(don);
   }

}
