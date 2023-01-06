import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import PatientClient from "../api/patientClient";

class PatientPage extends BaseClass {

    constructor() {
        super();

//        this.bindClassMethods(['onCreate', 'renderPatient', 'onGetPatients', 'onGetById'], this);

        this.bindClassMethods(['onCreate', 'renderPatients', 'onGetById', 'renderPatient'], this);
        this.dataStore = new DataStore();
    }
    async mount() {
        document.getElementById('createPatient').addEventListener('click', this.onCreate);
        document.getElementById('findPatient').addEventListener('click', this.onGetById);



        this.client = new PatientClient();

//        this.dataStore.addChangeListener(this.renderPatient)
        //this.onGetPatients()
    }

    async renderPatient() {
            const patientRetrieved = document.getElementById("doctorFoundByIdResult");
            //let content = "";
            const patientById = this.dataStore.get("patient");



            patientRetrieved.innerHTML +=
             `<tr>
            <td>${patientById.patientId}</td>
            <td>${patientById.name}</td>
            <td>${patientById.dob}</td>
            <td>${patientById.insurance}</td>
            </tr>`
    }


     async renderPatients() {

        const table = document.getElementById("result-info");

        const patients = this.dataStore.get("patients");

            table.innerHTML +=
             `<tr>
            <td>${patients.patientId}</td>
            <td>${patients.name}</td>
            <td>${patients.dob}</td>
            <td>${patients.insurance}</td>
            </tr>`
    }

//    async onGetPatients() {
//        let result = await this.client.getAllPatients(this.errorHandler);
//        this.dataStore.set("patients",result);
//        }

    async onGetById(event) {
        event.preventDefault();


        let patientId = document.getElementById("add-id-field").value;

        const result = await this.client.getPatient(patientId, this.errorHandler);


        this.dataStore.set("patient",result);


                if (result) {
                console.log(result);
                    this.showMessage(`"Successful"`)
                    this.renderPatient()
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
        this.dataStore.set("patients",createdPatient);

        if (createdPatient) {
        console.log(createdPatient);
            this.showMessage(`Created ${createdPatient.name}!`)
            this.renderPatients()
        } else {
            this.errorHandler("Error creating!  Try again...");
        }
//        this.onGetPatients()
    }
}
const main = async () => {
    const patientPage = new PatientPage();
    patientPage.mount();
};

    window.addEventListener('DOMContentLoaded', main);

//Modal Appointment Note code below

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    // console.log(e.key);

    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});
