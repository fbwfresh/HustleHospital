import BaseClass from "../util/baseClass";
import axios from 'axios'

//Client to call the doctorService
export default class DoctorClient extends BaseClass {


    constructor(props ={}){
        super();
        const methodsToBind = ['clientLoaded','getDoctor','createDoctor','getAllDoctors'];
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
    //could be the punctuation of DoctorId (doctorId)
    async getDoctor(doctorId, errorCallback){
        try{
            const response = await this.client.get(`/doctor/${doctorId}`)
            return response.data;
        }catch(error){
            this.handleError("getDoctor",error,errorCallback)
            }
    }
//this is different
    async createDoctor(name, dob, errorCallback){
        try{
            const response = await this.client.post(`doctor`, {
                name: name,
                dob: dob
                });
                console.log(response.data);
                return response.data;
                } catch (error) {
                    this.handleError("createDoctor", error, errorCallback);
                }
    }
    //have to make an endpoint in controller based off a service method to get all doctors
    async getAllDoctors(errorCallback){
        try{
            const response = await this.client.get(`/doctor/all`);
            return response.data;
            }catch(error){
                this.handleError("getAllDoctors",error,errorCallback);
                }
        }

//    async deleteDoctor(doctorId,errorCallback){
//         try{
//                    const response = await this.client.delete(`/doctor/${doctorId}`)
//                    return response.data;
//                }catch(error){
//                    this.handleError("deleteDoctor",error,errorCallback)
//                    }
//    }
//Todo: Finish this method I stopped it to work on the delete doctor method
//    async updateDoctor(name,dob,doctorId,isActive,errorCallback){
//        try{
//            const response = await this.client.put(`/doctor`,{
//                name: name,
//                dob:dob,
//                doctorId:doctorId,
//                isActive:isActive});
//                console.log(response.data);
//        }catch(error){
//            this.handleError("updateDoctor",error,errorCallback);
//            }
//    }

        //helper method to log the error and run any error functions. the param is the error recieved from the server

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