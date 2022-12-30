import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import PatientClient from "../api/patientClient";

class PatientPage extends BaseClass {

    constructor() {
        super();
        this.bindClassMethods(['onCreate', 'renderPatient', 'onGetPatients'], this);
        this.dataStore = new DataStore();
    }
    async mount() {
        document.getElementById('create-patientForm').addEventListener('submit', this.onCreate);
        this.client = new PatientClient();

        this.dataStore.addChangeListener(this.renderPatient)
        //this.onGetPatients()
    }

    async renderPatient() {

//        let patientArea = document.getElementById("result-info");
//
//        const patients = this.dataStore.get("patients");
//        patientArea.innerHTML +=  `<ul>`
//
//        if (patients) {
//            for(let patient of patients) {
//            patientArea.innerHTML += `
//            <h4><li>${patient.patientId}</li></h4>
//            <h3>${patient.name}</h3>
//            <p>${patient.dob}</p>
//            <p>${patient.insurance}</p>
//            `
//            }
//            patientArea.innerHTML +=  `</ul>`
//
//        } else {
//            patientArea.innerHTML = "No Item";
//        }

        const table = document.getElementById("patientTable");
        let tableContent = "";


        const patients = this.dataStore.get("patients");
//        let patients_json = [];
//        patients_json.push(patients);


        if (patients) {
        for(let patient of patients){
//        patients_json.map(patient => {
            tableContent +=
             `<tr>
            <td>${patient.patientId}</td>
            <td>${patient.name}</td>
            <td>${patient.dob}</td>
            <td>${patient.insurance}</td>
            </tr>`
//           }
//            )
        }


                         table.innerHTML = `
                         <tr>
                         <th>Id</th>
                         <th>Name</th>
                         <th>DOB</th>
                         <th>Insurance</th>
                         </tr> ` + tableContent;

            } else {
                table.innerHTML = "No patient";
            }
        }

    async onGetPatients() {
        let result = await this.client.getAllPatients(this.errorHandler);
        this.dataStore.set("patients",result);
        }

    async onCreate(event) {
        event.preventDefault();

        let name = document.getElementById("add-name-field").value;
        let dob = document.getElementById("add-dob-field").value;
        let insurance = document.getElementById("add-insurance-field").value;

        const createdPatient = await this.client.createPatient(name, dob, insurance, this.errorHandler);

        if (createdPatient) {
        console.log(createdPatient);
            this.showMessage(`Created ${createdPatient.name}!`)
        } else {
            this.errorHandler("Error creating!  Try again...");
        }
        this.onGetPatients()
    }
}
const main = async () => {
    const patientPage = new PatientPage();
    patientPage.mount();
};

window.addEventListener('DOMContentLoaded', main);