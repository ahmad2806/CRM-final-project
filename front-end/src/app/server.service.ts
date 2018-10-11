import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { User } from "./users/user.model";
@Injectable()
export class ServerService {

    url1 = 'https://stormy-plains-63553.herokuapp.com';
    url2 = 'http://localhost:3000';

    url = this.url1;
    constructor(private http: Http) {

    }

    addNewUser(user: User){
        return this.http.post(`${this.url}/user`, user);
    }
    getAllUsers(){
        return this.http.get(`${this.url}/allUsers`)
    }
    login(user){
        return this.http.post(`${this.url}/users/login`,user)
    }
    editUser(user) {
        return this.http.post(`${this.url}/edit/user`, user);
    }
    deleteUser(user) {
        return this.http.post(`${this.url}/delete/user`, user);
        //tried to use DELETE but it didnt work out... 
        //the request didnt even get to the server... 
        //angular delete api prob...so replaced it with post
        //and fixed that at the server
    }
    
    
    
    /////////Volunteers
    addNewVolunteer(volunteer) {
        return this.http.post(`${this.url}/volunteer`,volunteer);
    }
    
    getAllVolunteers() {
        return this.http.get(`${this.url}/volunteers`);
    }
    deleteVolunteer(volunteer) {
        return this.http.post(`${this.url}/delete/volunteer`, volunteer);
    }

    editVolunteer(volunteer) {
        return this.http.post(`${this.url}/edit/volunteer`, volunteer);
    }
    /////////////////Event

    addNewEvent(event) {
        return this.http.post(`${this.url}/event`, event);
    }
    getDonorEvents() {
        return this.http.get(`${this.url}/donor/events`);
    }
    getVolunteerEvents() {
        return this.http.get(`${this.url}/volunteer/events`);
    }

    editEvent(event) {
        return this.http.post(`${this.url}/edit/event`, event);
    }

    deleteEvent(event) {
        return this.http.post(`${this.url}/delete/event`, event);
    }
    /************************Donor */
    addNewDonor(donor) {
        return this.http.post(`${this.url}/donor`, donor);
    }

    getAllDonors() {
        return this.http.get(`${this.url}/allDonors`);
    }

    editDonor(donor) {
        return this.http.post(`${this.url}/edit/donor`, donor);
    }
    deleteDonor(donor) {
        return this.http.post(`${this.url}/delete/donor`, donor);
    }




}