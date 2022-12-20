package com.kenzie.appserver.service.model;


public class Appointment {

    private String patientId;

    private String doctorId;

    private String date;

    private String appointmentDescription;

    public Appointment(String patientId, String doctorId, String date, String appointmentDescription) {
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.date = date;
        this.appointmentDescription = appointmentDescription;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getAppointmentDescription() {
        return appointmentDescription;
    }

    public void setAppointmentDescription(String appointmentDescription) {
        this.appointmentDescription = appointmentDescription;
    }
}

