import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import DoctorClient from "../api/doctorClient";

class DoctorPage extends BaseClass {

    constructor() {
        super();
        this.bindClassMethods(['onCreate', 'renderDoctors','onFindById','renderDoctorById'],this);
        this.dataStore = new DataStore();
        }

        //once page loads, set up the event handlers

         mount() {
            document.getElementById('create-doctorForm').addEventListener('submit', this.onCreate);
            document.getElementById('findButton').addEventListener('click', this.onFindById);
            //document.getElementById('updateButton').addEventListener('click', this.onUpdate);
           // document.getElementById('deleteButton').addEventListener('click',this.onDelete);
            this.client = new DoctorClient();
            this.dataStore.addChangeListener(this.renderDoctorById)
            }

        async renderDoctorById(){
             const doctorFoundTable = document.getElementById("doctorFoundByIdResult");
                               const doctor = this.dataStore.get("doctor");

                                    doctorFoundTable.innerHTML += `
                                                         <div><td>${doctor.doctorId}</td> </div>
                                                          <div><td>${doctor.name}</td></div>
                                                          <div><td>${doctor.dob}</td></div>
                                                          <div><td>${doctor.isActive}</td></div>
                                                              `
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

//         async renderUpdatedDoctors(){
//                    const table = document.getElementById("updatedResult-info");
//                    const doctors = this.dataStore.get("doctor");
//                                      table.innerHTML += `
//                                  <div><td>${doctors.doctorId}</td> </div>
//                                   <div><td>${doctors.name}</td></div>
//                                   <div><td>${doctors.dob}</td></div>
//                                   <div><td>${doctors.isActive}</td></div>
//                                       `
//                }

       //Event Handlers

       async onFindById(event){
        event.preventDefault();
        event.stopImmediatePropagation();
        let doctorId = document.getElementById("add-id-field").value;
        const foundDoctor = await this.client.getDoctor(doctorId, this.errorHandler);
        this.dataStore.set("doctor",foundDoctor);
        console.log(foundDoctor);
        if(foundDoctor){
        this.showMessage("Found Doctor!")
        } else{
        this.errorHandler("Error creating! Try again... ");
        }
       }

       async onCreate(event){
        //console.log(event);
        event.preventDefault();
        event.stopImmediatePropagation();
        let name = document.getElementById("add-doctor-name-field").value;
        let dob = document.getElementById("add-doctor-dob-field").value;
//this is where the doctor gets created on the page by inputting the information we saved into variables
        const createdDoctor = await this.client.createDoctor(name, dob, this.errorHandler);
        //Setting updating the value in doctors to be the new created doctor
        this.dataStore.set("doctors",createdDoctor);
        console.log(createdDoctor);
        if (createdDoctor) {
            this.showMessage(`Created a Doctor!`)
            this.renderDoctors()
} else {
this.errorHandler("Error creating! Try again... ");
    }
}

//        async onUpdate(event){
//            event.preventDefault();
//            let name = document.getElementById("update-doctor-name-field").value;
//            let dob = document.getElementById("update-doctor-dob-field").value;
//            let doctorId = document.getElementById("doctor-IdField").value;
//
//            const updatedDoctor = await this.client.updateDoctor(name,dob,doctorId, this.errorHandler);
//
//            this.dataStore.set("doctor", updatedDoctor);
//            console.log(updatedDoctor);
//            if(updatedDoctor){
//            this.showMessage("Updated A Doctor!")
//            this.renderUpdatedDoctors()
//            }
//            else{
//            this.errorHandler("Error updating Doctor!")
//            }
//
//        }

//    async onDelete(event){
//        event.preventDefault();
//                let doctorId = document.getElementById("delete-id-field").value;
//              const deletedDoctor = await this.client.deleteDoctor(doctorId, this.errorHandler);
//                //not sure if i need to set the dataStore
//                this.dataStore.set("doctor",deletedDoctor);
//                console.log(deletedDoctor);
//                if(deletedDoctor){
//                this.showMessage("Deleted Doctor!")
//
//                }
//
//    }
}

const main = async () => {
    const doctorPage = new DoctorPage();
    doctorPage.mount();
    };
    window.addEventListener('DOMContentLoaded', main);
