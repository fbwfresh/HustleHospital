package com.kenzie.appserver.controller;

import com.kenzie.appserver.controller.model.AppointmentCreateRequest;
import com.kenzie.appserver.controller.model.AppointmentResponse;
import com.kenzie.appserver.service.AppointmentService;
import com.kenzie.appserver.service.model.Appointment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {

    private AppointmentService appointmentService;

    AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<AppointmentResponse> getAppointment(@PathVariable("patientId") String patientId) {

        Appointment appointment = appointmentService.findByPatientId(patientId);
        if (appointment == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(appointmentToResponse(appointment));
    }

    @GetMapping("/all")
    public ResponseEntity<List<AppointmentResponse>> getAppointment() {

        List<Appointment> appointments = appointmentService.findAll();

        List<AppointmentResponse> responses = appointments.stream().map(appointment -> appointmentToResponse(appointment)).collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    @PostMapping
    public ResponseEntity<AppointmentResponse> addNewAppointment(@RequestBody AppointmentCreateRequest appointmentCreateRequest) {
        Appointment appointment = new Appointment(
                appointmentCreateRequest.getPatientId(),
                appointmentCreateRequest.getDoctorId(),
                appointmentCreateRequest.getDate(),
                appointmentCreateRequest.getAppointmentDescription());

        appointmentService.addNewAppointment(appointment);
        AppointmentResponse appointmentResponse = new AppointmentResponse();
        appointmentResponse.setPatientId(appointment.getPatientId());
        appointmentResponse.setDoctorId(appointment.getDoctorId());
        appointmentResponse.setDate(appointment.getDate());
        appointmentResponse.setAppointmentDescription(appointment.getAppointmentDescription());

        return ResponseEntity.created(URI.create("/appointment/" + appointmentResponse.getPatientId())).body(appointmentResponse);
    }

    private AppointmentResponse appointmentToResponse(Appointment appointment) {
        AppointmentResponse appointmentResponse = new AppointmentResponse();
        appointmentResponse.setPatientId(appointment.getPatientId());
        appointmentResponse.setDoctorId(appointment.getDoctorId());
        appointmentResponse.setDate(appointment.getDate());
        appointmentResponse.setAppointmentDescription(appointment.getAppointmentDescription());
        return appointmentResponse;
    }
}
