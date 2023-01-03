import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import PatientClient from "../api/patientClient";

class PatientPage extends BaseClass {

    constructor() {
        super();
//        this.bindClassMethods(['onGetPatients', 'onCreate', 'renderPatients'], this);
//        this.bindClassMethods(['onCreate', 'renderPatients'], this);
        this.bindClassMethods(['onCreate', 'renderPatient'], this);
        this.dataStore = new DataStore();
    }
    async mount() {
//        document.getElementById('get-by-id-form').addEventListener('submit', this.onGet);
        document.getElementById('create-patientForm').addEventListener('submit', this.onCreate);
        this.client = new PatientClient();

//        this.dataStore.addChangeListener(this.renderPatients)
        this.dataStore.addChangeListener(this.renderPatient)
//        this.onGetPatients()
    }
//    async renderPatients() {
    async renderPatient() {
        let resultArea = document.getElementById("result-info");

        const patient = this.dataStore.get("patient");

        if (patient) {
                         resultArea.innerHTML = `
                             <div>ID: ${patient.patientId}</div>
                             <div>Name: ${patient.name}</div>
                         `

//            const patients = this.dataStore.get("patients");
//                    resultArea.innerHTML +=  `<ul>`
//            if (patients) {
//                        for(let patient of patients) {
//                        resultArea.innerHTML += `
//                        <h4><li>${patient.name}</li></h4>
////                        <h3>By: ${comment.title}</h3>
////                        <p>${comment.content}</p>
//                        `
//                        }
//                        resultArea.innerHTML +=  `</ul>`
            } else {
                resultArea.innerHTML = "No patient";
            }
        }
//    async onGet(event) {
//        // Prevent the page from refreshing on form submit
//        event.preventDefault();
//
//        let id = document.getElementById("id-field").value;
//        this.dataStore.set("example", null);
//
//        let result = await this.client.getExample(id, this.errorHandler);
//        this.dataStore.set("example", result);
//        if (result) {
//            this.showMessage(`Got ${result.name}!`)
//        } else {
//            this.errorHandler("Error doing GET!  Try again...");
//        }
//    }
//    async onGetPatients() {
//            // Prevent the page from refreshing on form submit
////                event.preventDefault();
////
////                let patientId = document.getElementById("id-field").value;
////                this.dataStore.set("example", null);
//
//        let result = await this.client.getAllPatients(this.errorHandler);
//        this.dataStore.set("patients", result);
////                if (result) {
////                    this.showMessage(`Got ${result.name}!`)
////                } else {
////                    this.errorHandler("Error doing GET!  Try again...");
////                }
//    }
    async onCreate(event) {
        // Prevent the page from refreshing on form submit
        event.preventDefault();
        this.dataStore.set("patient", null);

//        let patientId = document.getElementById("add-patientId-field").value;
        let name = document.getElementById("add-name-field").value;

        const createdPatient = await this.client.createPatient(name, this.errorHandler);
        this.dataStore.set("patient", createdPatient);

        if (createdPatient) {
            this.showMessage(`Created ${createdPatient.name}!`)
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
