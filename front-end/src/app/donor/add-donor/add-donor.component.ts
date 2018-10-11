import { Component, OnInit, ViewChild } from '@angular/core';
import { DonorService } from '../donor.service';
import { NgForm, FormControl } from '@angular/forms';
import { DonorModel } from '../donor.model';
import { Router } from '@angular/router';
import { EventService } from '../../event/event.service';
import { EventModel } from '../../event/event.model';
import { Donate } from '../donate.model';
import { ServerService } from '../../server.service';

@Component({
  selector: 'app-add-donor',
  templateUrl: './add-donor.component.html',
  styleUrls: ['./add-donor.component.css']
})
export class AddDonorComponent implements OnInit {

  name = "";
  donateDate=new Date(2016,2,2);
  id = "";
  address = "";
  phone = "";
  email;
  extraphone = "";
  birthday: Date;
  amount;
  discription = "";
  date2: Date;
  donate = [];

  Foundation = false;
  private = false;
  constructor(private donor: DonorService, private newEvent: EventService,private serverService: ServerService) { }

  ngOnInit() {
  }

  radioChoice(choice: string) {
    if (choice == 'Foundation') {
      this.Foundation = true;
      this.private = false;
    }
    if (choice == 'private') {
      this.private = true;
      this.Foundation = false;
    }
  }
  reset() {
    this.name = "";
    this.donateDate=new Date();;
    this.id = "";
    this.address = "";
    this.phone = "";
    this.email=undefined;
    this.extraphone = "";
    this.birthday;
    this.amount = "";
    this.discription = "";
    this.private = false;
    this.Foundation = false;
  }

  save(exit) {
    let newDonor: DonorModel;
    this.donateDate=new Date(this.donateDate);
    
    newDonor = new DonorModel(this.name,this.donateDate, this.id, this.birthday, this.address, this.phone, this.extraphone, this.email, "קרן", this.amount, [], this.discription, [new Donate(this.amount,this.date2)]);
    if (this.Foundation == true) {
      this.date2 = new Date();
      this.date2.setDate(this.donateDate.getDate() + 365);
      this.donor.donor.push(newDonor);
    }
    if (this.private == true) {
      newDonor = new DonorModel(this.name,this.donateDate, this.id, this.birthday, this.address, this.phone, this.extraphone, this.email, "פרטי", this.amount, [], this.discription, [new Donate(this.amount,this.date2)]);
      this.date2 = new Date();
      this.date2.setDate(this.donateDate.getDate() + 365);
      
    }
    this.serverService.addNewDonor(newDonor)
    .subscribe((res) => {
      this.donor.donor.push(newDonor);
        // console.log(res);//*ibrahim***donor is added to the database.. make sure that newDonor has the new donor to add and if you want to mae any checks when the response come add here
        this.newEvent.add(new EventModel("לתרום שוב", "donor-Model", this.date2, "האם רוצה לתרום שוב", [newDonor], [], [newDonor]), "donor");
        newDonor.hisEvent.push(new EventModel("לתרום שוב", "donor-Model", this.date2, "האם רוצה לתרום שוב", [newDonor], [], [newDonor]));
      }, (e) => alert(e))
    this.reset();
    exit.click();
  }
}

