import { Component, OnInit, ViewChild } from '@angular/core';
import { DonorService } from '../donor.service';
import { DonorModel } from '../donor.model';
import { NgForm } from '@angular/forms';
import { Donate } from '../donate.model';
import { EventService } from '../../event/event.service';
import { EventModel } from '../../event/event.model';
import { ServerService } from '../../server.service';

@Component({
  selector: 'app-donor-list',
  templateUrl: './donor-list.component.html',
  styleUrls: ['./donor-list.component.css']
})
export class DonorListComponent implements OnInit {
  @ViewChild('f') newDonorForm: NgForm;
  i: number;
  name = "";
  id = "";
  address = "";
  phone = "";
  email = "";
  extraphone = "";
  birthday: Date;
  amount: number;
  privateDonor = false;
  FoundationDonor = false;
  description = "";
  donate: Donate[] = [];
  hisEvent: Event[] = [];
  newAmount;
  newAmountDate;
  constructor(private donorList: DonorService, private donorEveints: EventService, private serverService: ServerService) {

  }

  ngOnInit() {
    this.donorList.Donor = [];
    this.serverService.getAllDonors()
      .subscribe((res) => {
        // console.log(res.json());
        this.donorList.donor.push.apply(this.donorList.donor, res.json())
      }, (e) => alert(e));
  }

  saveNewAmount() {
    let newDonate: Donate = new Donate(0, new Date);
    let date2 = new Date(this.newAmountDate);

    newDonate.donateAmount = this.newAmount;
    newDonate.donateDate = this.newAmountDate;
    date2.setDate(date2.getDate() + 365);

    this.donorList.donor[this.i].donate.push(newDonate);
    this.donorEveints.add(new EventModel("לתרום שוב", "donor-Model", date2, "האם רוצה לתרום שוב", [this.donorList.donor[this.i]], [], [this.donorList.donor[this.i]]), "donor");
    this.donorList.donor[this.i].hisEvent.push(new EventModel("לתרום שוב", "donor-Model", date2, "האם רוצה לתרום שוב", [this.donorList.donor[this.i]], [], [this.donorList.donor[this.i]]));

    this.newAmount = "";
    this.newAmountDate = "";
  }

  edit(item) {
    this.i = this.donorList.donor.indexOf(item);
    this.name = item.name;
    this.id = item.id;
    this.address = item.address;
    this.phone = item.phone;
    this.email = item.email;
    this.extraphone = item.homePhone;
    this.donate = item.donate;
    // for (let i = 0; i < item.donate.length; i++) {
    //   this.amount += item.donate.donateAmount[i];
    // }
    this.description = item.description;
    this.donate = item.donate;
    if (item.donorType === 'פרטי') {
      this.privateDonor = true;
      this.FoundationDonor = false;
    }
    if (item.donorType === 'קרן') {
      this.privateDonor = false;
      this.FoundationDonor = true;
    }

  }
  disc(item) {
    this.i = this.donorList.donor.indexOf(item);

    // this.description = "";
    // this.donate = [];
    // this.hisEvent=[];
    this.hisEvent = item.hisEvent;
    this.description = item.description;
    this.donate = item.donate;


  }

  save() {

    this.donorList.donor[this.i].name = this.name;
    this.donorList.donor[this.i].id = this.id;
    this.donorList.donor[this.i].phone = this.phone;
    this.donorList.donor[this.i].email = this.email;
    this.donorList.donor[this.i].homePhone = this.extraphone;
    this.donorList.donor[this.i].amount += this.amount;
    this.donorList.donor[this.i].birthday = this.birthday;
    this.donorList.donor[this.i].address = this.address;
    this.donorList.donor[this.i].description = this.description;

    this.serverService.editDonor(this.donorList.donor[this.i])
      .subscribe((res) => {
        console.log(res.json());////*ibrahim*///////////add the element you want to edit and if you want to do anything after the edit do it here
      }, (e) => alert(e));
  }

  delete(item) {
    const index = this.donorList.donor.indexOf(item);
    this.serverService.deleteDonor(this.donorList.donor[index])
      .subscribe((res) => {
        this.donorList.donor.splice(index, 1);
      }, (e) => alert(e));
  }

}
