import BaseClass from "../util/baseClass";
import axios from 'axios'

export default class AppointmentClient extends BaseClass {

    constructor(props = {}){
            super();
//            const methodsToBind = ['clientLoaded', 'getPatient', 'createPatient', 'getAllPatients'];
//            const methodsToBind = ['clientLoaded', 'getPatient', 'createPatient'];
            const methodsToBind = ['clientLoaded', 'createAppointment', 'getAppointment', 'getAllAppointments'];
            this.bindClassMethods(methodsToBind, this);
            this.props = props;
            this.clientLoaded(axios);
        }
    clientLoaded(client) {
        this.client = client;
        if (this.props.hasOwnProperty("onReady")){
            this.props.onReady();
        }
    }
    async getAppointment(patientId, errorCallback) {
            try {
                const response = await this.client.get(`/appointment/${patientId}`);
                return response.data;
            } catch (error) {
                this.handleError("getAppointment", error, errorCallback)
            }
        }
    async getAllAppointments(errorCallback) {
        try {
            const response = await this.client.get(`/appointment/all`);
            return response.data;
        } catch (error) {
            this.handleError("getAllAppointments", error, errorCallback);
        }
    }
    async createAppointment(patientId, doctorId, date, appointmentDescription, errorCallback) {
        try {
            const response = await this.client.post(`appointment`, {

                "patientId": patientId,
                "doctorId": doctorId,
                "date": date,
                "appointmentDescription": appointmentDescription,

            });
            return response.data;
        } catch (error) {
            this.handleError("createAppointment", error, errorCallback);
        }
    }
    handleError(method, error, errorCallback) {
        console.error(method + " failed - " + error);
        if (error.response.data.message !== undefined) {
            console.error(error.response.data.message);
        }
        if (errorCallback) {
            errorCallback(method + " failed - " + error);
        }
    }
}