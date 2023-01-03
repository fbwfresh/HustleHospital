'use strict';

import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import AppointmentClient from "../api/appointmentClient";

class AppointmentPage extends BaseClass {

    constructor() {
        super();
        this.bindClassMethods(['onGetAppointments', 'onCreate', 'renderAppointments'],this);
        this.dataStore = new DataStore();
    }

    //once page loads, set up the event handlers

    async mount() {
        document.getElementById('create-AppointmentForm').addEventListener('submit',this.onCreate);
        this.client = new AppointmentClient();

        this.dataStore.addChangeListener(this.renderAppointments)
        await this.onGetAppointments();
    }

    async renderAppointments(){
        let resultArea = document.getElementById("result-info");

        const appointments = this.dataStore.get("appointments");
        resultArea.innerHTML += `<ul>`
        if(appointments){
            for(let appointments of appointments){
                resultArea.innerHTML += `
                        <h3><li>${appointments.patientId}</li></h3>
                        `
            }

            resultArea.innerHTML += `</ul>`
        } else {
            resultArea.innerHTML = "No Appointment";
        }
    }

    //Event Handlers

    async onGetAppointments() {
        let result = await this.client.getAllAppointments(this.errorHandler);
        this.dataStore.set("appointments",result);
    }

    async onCreate(event){
        event.preventDefault();

        let patientId = document.getElementById("add-patient-Id-field").value;
        let dob = document.getElementById("add-patient-dob-field").value;

        const createdAppointment = await this.client.createAppointment(patientId,dob,this.errorHandler);
        if (createdAppointment) {
            this.showMessage(`Created an Appointment!`)
        } else {
            this.errorHandler("Error creating! Try again... ");
        }
        await this.onGetAppointments();
    }
}

const main = async () => {
    const appointmentPage = new AppointmentPage();
    await appointmentPage.mount();
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
