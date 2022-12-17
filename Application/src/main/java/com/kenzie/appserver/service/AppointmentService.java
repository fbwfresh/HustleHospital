package com.kenzie.appserver.service;

import com.kenzie.appserver.repositories.AppointmentRepository;
import com.kenzie.appserver.repositories.model.AppointmentRecord;
import com.kenzie.appserver.service.model.Appointment;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class AppointmentService {

        private AppointmentRepository appointmentRepository;

        public AppointmentService(AppointmentRepository appointmentRepository) { this.appointmentRepository = appointmentRepository; }

        public Appointment findByPatientId(String patientId) {
            Appointment appointmentFromBackend = appointmentRepository
                    .findById(patientId)
                    .map(appointment -> new Appointment(appointment.getPatientId(), appointment.getDoctorId(), appointment.getDate(), appointment.getAppointmentDescription()) )
                    .orElse(null);
            return appointmentFromBackend;
        }

    public Appointment findByDoctorId(String doctorId) {
        Appointment appointmentFromBackend = appointmentRepository
                .findById(doctorId)
                .map(appointment -> new Appointment(appointment.getPatientId(), appointment.getDoctorId(), appointment.getDate(), appointment.getAppointmentDescription()) )
                .orElse(null);
        return appointmentFromBackend;
    }

        public List<Appointment> findAll() {
            List<Appointment> appointments = new ArrayList<>();
            appointmentRepository
                    .findAll()
                    .forEach(appointment -> appointments.add(new Appointment(appointment.getPatientId(), appointment.getDoctorId(), appointment.getDate(), appointment.getAppointmentDescription())));
            return appointments;
        }

        public Appointment addNewAppointment(Appointment appointment) {
            AppointmentRecord appointmentRecord = new AppointmentRecord();
            appointmentRecord.setPatientId(appointment.getPatientId());
            appointmentRecord.setDoctorId(appointment.getDoctorId());
            appointmentRecord.setDate(appointment.getDate());
            appointmentRecord.setAppointmentDescription(appointment.getAppointmentDescription());
            appointmentRepository.save(appointmentRecord);
            return appointment;
        }
    }
