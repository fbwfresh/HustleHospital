import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import PatientClient from "../api/patientClient";

class PatientPage extends BaseClass {

    constructor() {
        super();
//        this.bindClassMethods(['onGetPatients', 'onCreate', 'renderPatients'], this);
//        this.bindClassMethods(['onCreate', 'renderPatients'], this);
        this.bindClassMethods(['onCreate', 'renderPatient', 'onGetPatients'], this);
        this.dataStore = new DataStore();
    }
    async mount() {
//        document.getElementById('get-by-id-form').addEventListener('submit', this.onGet);
        document.getElementById('create-patientForm').addEventListener('submit', this.onCreate);
        this.client = new PatientClient();

//        this.dataStore.addChangeListener(this.renderPatients)
        this.dataStore.addChangeListener(this.renderPatient)
        this.onGetPatients()
    }

    async renderPatient() {

        let patientArea = document.getElementById("result-info");
//      let patientArea = document.getElementById("patientTable");

        const patients = this.dataStore.get("patients");
        patientArea.innerHTML +=  `<ul>`

        if (patients) {
            for(let patient of patients) {
            patientArea.innerHTML += `
            <h4><li>${patient.patientId}</li></h4>
            <h3>${patient.name}</h3>
            <p>${patient.dob}</p>
            <p>${patient.insurance}</p>
            `
            }
            patientArea.innerHTML +=  `</ul>`

        } else {
            patientArea.innerHTML = "No Item";
        }

//        const table = document.getElementById("patientTable");
//        let tableContent = "";
//
//
//        const patients = this.dataStore.get("patients");
//        let patients_json = [];
//        patients_json.push(patients);


//        if (patients_json) {
//        patients_json.map(patients => {
//            tableContent +=
//             `<tr>
//            <td>${patients.patientId}</td>
//            <td>${patients.name}</td>
//            <td>${patients.dob}</td>
//            <td>${patients.insurance}</td>
//            </tr>`;
//
//        }
//        )
//                         table.innerHTML = `
//                         <tr>
//                         <th>Id</th>
//                         <th>Name</th>
//                         <th>DOB</th>
//                         <th>Insurance</th>
//                         </tr> ` + tableContent;
//
//            } else {
//                table.innerHTML = "No patient";
//            }
        }

    async onGetPatients() {
        // Prevent the page from refreshing on form submit
        let result = await this.client.getAllPatients(this.errorHandler);
        this.dataStore.set("patients", result);
        }

    async onCreate(event) {
        // Prevent the page from refreshing on form submit
        event.preventDefault();
//        this.dataStore.set("patient", null);

//      let patientId = document.getElementById("add-patientId-field").value;
        let name = document.getElementById("add-name-field").value;
        let dob = document.getElementById("add-dob-field").value;
        let insurance = document.getElementById("add-insurance-field").value;

        const createdPatient = await this.client.createPatient(name, dob, insurance, this.errorHandler);
//        this.dataStore.set("patient", createdPatient);


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