import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import AppointmentClient from "../api/appointmentClient";

class AppointmentPage extends BaseClass {

    constructor() {
        super();
//        this.bindClassMethods(['onCreate', 'renderPatient', 'onGetPatients', 'onGetById'], this);
        this.bindClassMethods(['onCreate', 'renderAppointment', 'onGetById', 'renderAppointments'], this);
        this.dataStore = new DataStore();
    }
    async mount() {
        document.getElementById('createAppointment').addEventListener('click', this.onCreate);
        document.getElementById('findAppointment').addEventListener('click', this.onGetById);

        this.client = new AppointmentClient();

//        this.dataStore.addChangeListener(this.renderAppointment)
//        this.dataStore.addChangeListener(this.renderAppointments)
        //this.onGetPatients()
    }

    async renderAppointments() {
            const table = document.getElementById("appointmentTable");

            const appointments = this.dataStore.get("appointments");

                table.innerHTML +=
                 `<tr>
                <td>${appointments.patientId}</td>
                <td>${appointments.doctorId}</td>
                <td>${appointments.date}</td>
                <td>${appointments.appointmentDescription}</td>
                </tr>`
    }


     async renderAppointment() {

        let appointmentRetrieved = document.getElementById("result-info");
        let patientById = this.dataStore.get("appointment");

        appointmentRetrieved.innerHTML =
        `

        <p>${patientById.appointmentDescription}</p>
        `

        }

//    async onGetAppointments() {
//        let result = await this.client.getAllAppointments(this.errorHandler);
//        this.dataStore.set("appointments",result);
//        }

    async onGetById(event) {
        event.preventDefault();

        let patientId = document.getElementById("add-id-field").value;

        const result = await this.client.getAppointment(patientId, this.errorHandler);

        this.dataStore.set("appointment",result);

                if (result) {
                console.log(result);
                    this.showMessage(`"Successful"`)
                    this.renderAppointment()

                } else {
                    this.errorHandler("Error creating!  Try again...");
                }
        }
              generateQRCode() {
              let website = document.getElementById("website").value;
              if (website) {
                let qrcodeContainer = document.getElementById("qrcode");
                qrcodeContainer.innerHTML = "";
                new QRCode(qrcodeContainer, website);
                /*With some styles*/
                let qrcodeContainer2 = document.getElementById("qrcode-2");
                qrcodeContainer2.innerHTML = "";
                new QRCode(qrcodeContainer2, {
                  text: website,
                  width: 128,
                  height: 128,
                  colorDark: "#5868bf",
                  colorLight: "#ffffff",
                  correctLevel: QRCode.CorrectLevel.H
                });
                document.getElementById("qrcode-container").style.display = "block";
              } else {
                alert("Please enter a valid URL");
              }
            }

    async onCreate(event) {
        event.preventDefault();

        let patientId = document.getElementById("add-patientId-field").value;
        let doctorId = document.getElementById("add-doctorId-field").value;
        let date = document.getElementById("add-date-field").value;
        let appointmentDescription = document.getElementById("add-appointmentDescription-field").value;



        const createdAppointment = await this.client.createAppointment(patientId, doctorId, date, appointmentDescription, this.errorHandler);
        this.dataStore.set("appointments",createdAppointment);

        if (createdAppointment) {
        console.log(createdAppointment);
            this.showMessage(`Created Appointment!`)
//            this.onGetAppointments()
            this.renderAppointments()
        } else {
            this.errorHandler("Error creating!  Try again...");
        }
//        this.onGetAppointments()

    }
}
const main = async () => {
    const appointmentPage = new AppointmentPage();
    appointmentPage.mount();
};

window.addEventListener('DOMContentLoaded', main);