import { EmailValidator } from "@angular/forms";
import { FreeDayes } from "./free-days.model";
import { EventModel } from "../event/event.model";

export class VolunteerModel {
    constructor(public name: string, public id: string,
        public birthday: Date, public address: string,
        public phone: string, public telePhone: string,
        public homePhone: string,
        public email: string,
        public volunteerType: string,
        public freeDays, public hasCar: boolean,
        public agreeToLeft: boolean, public job: string,public avatar, public myEvents: EventModel[]) {

    }
}