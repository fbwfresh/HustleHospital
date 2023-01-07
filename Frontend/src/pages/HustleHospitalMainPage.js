import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import PatientClient from "../api/patientClient";

class HustleHospitalMainPage extends BaseClass {

    constructor() {
        super();
        this.bindClassMethods(['onCreate', 'renderPatient', 'onGetPatients', 'onGetById'], this);
        this.dataStore = new DataStore();
    }
    async mount() {
        document.getElementById('create-patientForm').addEventListener('submit', this.onCreate);
        document.getElementById('findById-patientForm').addEventListener('submit', this.onGetById);

        this.client = new PatientClient();

        this.dataStore.addChangeListener(this.renderPatient)
        //this.onGetPatients()
    }

     async renderPatient() {

        let patientRetrieved = document.getElementById("result-info");
        //let content = "";
        let patientById = this.dataStore.get("patient");
        if(patientById) {
        patientRetrieved.innerHTML = `${patientById.name}`;
        } else {
        patientRetrieved.innerHTML = "No Patient Found";

        }
        }

    async onGetPatients() {
        let result = await this.client.getAllPatients(this.errorHandler);
        this.dataStore.set("patients",result);
        }

    async onGetById(event) {
        //event.preventDefault();

        let patientId = document.getElementById("add-id-field").value;

        let result = await this.client.getPatient(patientId, this.errorHandler);

        this.dataStore.set("patient",result);

                if (result) {
                console.log(result);
                    this.showMessage(`"Successful"`)
                } else {
                    this.errorHandler("Error creating!  Try again...");
                }
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
    const HustleHospitalMainPage = new HustleHospitalMainPage();
    HustleHospitalMainPage.mount();
};

window.addEventListener('DOMContentLoaded', main);