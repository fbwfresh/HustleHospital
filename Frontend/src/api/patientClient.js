import BaseClass from "../util/baseClass";
import axios from 'axios'

export default class PatientClient extends BaseClass {

    constructor(props = {}){
            super();
//            const methodsToBind = ['clientLoaded', 'getPatient', 'createPatient', 'getAllPatients'];
//            const methodsToBind = ['clientLoaded', 'getPatient', 'createPatient'];
            const methodsToBind = ['clientLoaded', 'createPatient'];
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
//    async getPatient(patientId, errorCallback) {
//            try {
//                const response = await this.client.get(`/patient/${patientId}`);
//                return response.data;
//            } catch (error) {
//                this.handleError("getPatient", error, errorCallback)
//            }
//        }
//    async getAllPatients(errorCallback) {
//        try {
//            const response = await this.client.get(`/patient/all`);
//            return response.data;
//        } catch (error) {
//            this.handleError("getAllPatients", error, errorCallback);
//        }
//    }
    async createPatient(name, errorCallback) {
        try {
            const response = await this.client.post(`patient`, {
                name: name
            });
            return response.data;
        } catch (error) {
            this.handleError("createPatient", error, errorCallback);
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