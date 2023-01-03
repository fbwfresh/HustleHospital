import BaseClass from "../util/baseClass";
import axios from 'axios'

//Client to call the appointmentService
export default class AppointmentClientClient extends BaseClass {

    constructor(props ={}){
        super();
        const methodsToBind = ['clientLoaded','getAppointment','createAppointment','getAllAppointments'];
        this.bindClassMethods(methodsToBind, this);
        this.props = props;
        this.clientLoaded(axios);
    }

    clientLoaded(client){
        this.client = client;
        if(this.props.hasOwnProperty("onReady")){
            this.props.onReady();
        }
    }

    async getAppointment(patientId, errorCallback){
        try{
            const response = await this.client.get(`/appointment/${patientId}`)
            return response.data;
        }catch(error){
            this.handleError("getAppointment",error,errorCallback)
        }
    }

    async createAppointment(patientId,dob,errorCallback){
        try{
            const response = await this.client.post(`/appointment`,{
                "patientId": patientId,
                "dob": dob

            });
            return response.data;
        } catch (error) {
            this.handleError("createAppointment",error, errorCallback);
        }
    }
    //have to make an endpoint in controller based off a service method to get all appointments
    async getAllAppointments(errorCallback){
        try{
            const response = await this.client.get(`/appointment/all`);
            return response.data;
        }catch(error){
            this.handleError("getAllAppointments",error,errorCallback);
        }
    }

    //helper method to log the error and run any error functions. the param is the error received from the server

    handleError(method,error,errorCallback) {
        console.error(method + " failed - " + error);
        if(error.response.data.message !== undefined){
            console.error(error.response.data.message);
        }
        if(errorCallback){
            errorCallback(method + " failed - " + error);
        }
    }
}