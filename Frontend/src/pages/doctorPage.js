import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import DoctorClient from "../api/doctorClient";

class DoctorPage extends BaseClass {

    constructor() {
        super();
        this.bindClassMethods(['onCreate', 'renderDoctors'],this);
        this.dataStore = new DataStore();
        }

        //once page loads, set up the event handlers

        async mount() {
            document.getElementById('create-doctorForm').addEventListener('submit',this.onCreate);
            this.client = new DoctorClient();

            this.dataStore.addChangeListener(this.renderDoctors)

            }

        async renderDoctors(){

            const table = document.getElementById("result-info");

            const doctors = this.dataStore.get("doctors");

                              table.innerHTML += `
                          <div><td>${doctors.doctorId}</td> </div>
                           <div><td>${doctors.name}</td></div>
                           <div><td>${doctors.dob}</td></div>
                           <div><td>${doctors.isActive}</td></div>
                               `
        }

       //Event Handlers

//       async onGetDoctors() {
//        let result = await this.client.getAllDoctors(this.errorHandler);
//        this.dataStore.set("doctors",result);
//       }

       async onCreate(event){
        event.preventDefault();

//this is where you are getting the information from the html
        let name = document.getElementById("add-doctor-name-field").value;
        let dob = document.getElementById("add-doctor-dob-field").value;
        //let isActive = document.getElementById("active").value;
        //this would probably be where i would add an if statement for the boolean isActive

//this is where the doctor gets created on the page by inputting the information we saved into variables
        const createdDoctor = await this.client.createDoctor(name, dob, this.errorHandler);
        //Setting updating the value in doctors to be the new created doctor
        this.dataStore.set("doctors",createdDoctor);
        console.log(createdDoctor);

        if (createdDoctor) {
            this.showMessage(`Created a Doctor!`)
} else {
this.errorHandler("Error creating! Try again... ");
}
//this.onGetDoctors();
}
}

const main = async () => {
    const doctorPage = new DoctorPage();
    doctorPage.mount();
    };
    window.addEventListener('DOMContentLoaded', main);
