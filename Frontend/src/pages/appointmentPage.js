import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import AppointmentClient from "../api/appointmentClient";

class AppointmentPage extends BaseClass {

    constructor() {
        super();
//        this.bindClassMethods(['onCreate', 'renderPatient', 'onGetPatients', 'onGetById'], this);
        this.bindClassMethods(['onCreate', 'renderAppointment', 'onGetById', 'renderAppointments', 'onGetAppointments'], this);
        this.dataStore = new DataStore();
    }
    async mount() {
        document.getElementById('create-appointmentForm').addEventListener('submit', this.onCreate);
        document.getElementById('findById-appointmentForm').addEventListener('submit', this.onGetById);

        this.client = new AppointmentClient();

        this.dataStore.addChangeListener(this.renderAppointment)
        this.dataStore.addChangeListener(this.renderAppointments)
        //this.onGetPatients()
    }

    async renderAppointments() {
            const table = document.getElementById("appointmentTable");
            let tableContent = "";

            const appointments = this.dataStore.get("appointments");

            if (appointments) {
            for(let appointment of appointments){

                tableContent +=
                 `<tr>
                <td>${appointment.patientId}</td>
                <td>${appointment.doctorId}</td>
                <td>${appointment.date}</td>
                <td>${appointment.appointmentDescription}</td>
                </tr>`
            }

                             table.innerHTML = `
                             <tr>
                             <th>Patient Id</th>
                             <th>Doctor Id</th>
                             <th>Date</th>
                             <th>Appointment Description</th>
                             </tr> ` + tableContent;

                } else {
                    table.innerHTML = "No Appointment";
                }
    }

     async renderAppointment() {

        let appointmentRetrieved = document.getElementById("result-info");
        let patientById = this.dataStore.get("appointment");

        appointmentRetrieved.innerHTML = `
        <p>Patient Id:${patientById.patientId}</p>
        <p>Doctor Id:${patientById.doctorId}</p>
        <p>Date:${patientById.date}</p>
        <p>Appointment Description:${patientById.appointmentDescription}</p>
        `;
        }

    async onGetAppointments() {
        let result = await this.client.getAllAppointments(this.errorHandler);
        this.dataStore.set("appointments",result);
        }

    async onGetById(event) {
        event.preventDefault();

        let patientId = document.getElementById("add-id-field").value;

        let result = await this.client.getAppointment(patientId, this.errorHandler);

        this.dataStore.set("appointment",result);

                if (result) {
                console.log(result);
                    this.showMessage(`"Successful"`)
                } else {
                    this.errorHandler("Error creating!  Try again...");
                }
        }

    async onCreate(event) {
        event.preventDefault();

        let patientId = document.getElementById("add-patientId-field").value;
        let doctorId = document.getElementById("add-doctorId-field").value;
        let date = document.getElementById("add-date-field").value;
        let appointmentDescription = document.getElementById("add-appointmentDescription-field").value;

        const createdAppointment = await this.client.createAppointment(patientId, doctorId, date, appointmentDescription, this.errorHandler);

        if (createdAppointment) {
        console.log(createdAppointment);
            this.showMessage(`Created Appointment!`)
//            this.onGetAppointments()
        } else {
            this.errorHandler("Error creating!  Try again...");
        }
        this.onGetAppointments()
    }
}
const main = async () => {
    const appointmentPage = new AppointmentPage();
    appointmentPage.mount();
};

window.addEventListener('DOMContentLoaded', main);