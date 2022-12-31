import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import PatientClient from "../api/patientClient";

class PatientPage extends BaseClass {

    constructor() {
        super();
//        this.bindClassMethods(['onCreate', 'renderPatient', 'onGetPatients', 'onGetById'], this);
        this.bindClassMethods(['onCreate', 'renderPatient', 'onGetPatients'], this);
        this.dataStore = new DataStore();
    }
    async mount() {
        document.getElementById('create-patientForm').addEventListener('submit', this.onCreate);
//        document.getElementById('findById-patientForm').addEventListener('submit', this.onGetById);

        this.client = new PatientClient();

        this.dataStore.addChangeListener(this.renderPatient)
        //this.onGetPatients()
    }

     async renderPatient() {

//        let patientRetrieved = document.getElementById("result-info");
//        //let content = "";
//        let patientById = this.dataStore.get("patient");
//
//
//        patientRetrieved.innerHTML = `${patientById.name}`;


        const table = document.getElementById("patientTable");
        let tableContent = "";

        const patients = this.dataStore.get("patients");

        if (patients) {
        for(let patient of patients){

            tableContent +=
             `<tr>
            <td>${patient.patientId}</td>
            <td>${patient.name}</td>
            <td>${patient.dob}</td>
            <td>${patient.insurance}</td>
            </tr>`
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

//    async onGetById(event) {
//        event.preventDefault();
//
//        let patientId = document.getElementById("add-id-field").value;
//
//        let result = await this.client.getPatient(patientId, this.errorHandler);
//
//        this.dataStore.set("patient",result);
//
//                if (result) {
//                console.log(result);
//                    this.showMessage(`"Successful"`)
//                } else {
//                    this.errorHandler("Error creating!  Try again...");
//                }
//        }

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