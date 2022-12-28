'use strict';

import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import DoctorClient from "../api/doctorClient";

class DoctorPage extends BaseClass {

    constructor() {
        super();
        this.bindClassMethods(['onGetDoctors', 'onCreate', 'renderDoctors'],this);
        this.dataStore = new DataStore();
        }

        //once page loads, set up the event handlers

        async mount() {
            document.getElementById('create-doctorForm').addEventListener('submit',this.onCreate);
            this.client = new DoctorClient();

            this.dataStore.addChangeListener(this.renderDoctors)
            this.onGetDoctors();
            }

        async renderDoctors(){
            let resultArea = document.getElementById("result-info");

            const doctors = this.dataStore.get("doctors");
            resultArea.innerHTML += `<ul>`
                if(doctors){
                    for(let doctor of doctors){
                      resultArea.innerHTML += `
                        <h3><li>${doctor.name}</li></h3>
                        `
                        }

                      resultArea.innerHTML += `</ul>`
                      } else {
                        resultArea.innerHTML = "No Doctor";
                      }
        }

       //Event Handlers

       async onGetDoctors() {
        let result = await this.client.getAllDoctors(this.errorHandler);
        this.dataStore.set("doctors",result);
       }

       async onCreate(event){
        event.preventDefault();

        let name = document.getElementById("add-doctor-name-field").value;
        let dob = document.getElementById("add-doctor-dob-field").value;
        //let isActive = document.getElementById("active").value;

        const createdDoctor = await this.client.createDoctor(name,dob,this.errorHandler);
        if (createdDoctor) {
            this.showMessage(`Created a Doctor!`)
} else {
this.errorHandler("Error creating! Try again... ");
}
this.onGetDoctors();
}
}

const main = async () => {
    const doctorPage = new DoctorPage();
    doctorPage.mount();
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