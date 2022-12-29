package com.kenzie.appserver.controller;

import com.kenzie.appserver.controller.model.*;
import com.kenzie.appserver.service.ExampleService;
import com.kenzie.appserver.service.PatientService;
import com.kenzie.appserver.service.model.Example;
import com.kenzie.appserver.service.model.Patient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.UUID.randomUUID;

@RestController
@RequestMapping("/patient")
public class PatientController {
    private PatientService patientService;

    PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<PatientResponse> get(@PathVariable("patientId") String patientId) {

        Patient patient = patientService.findById(patientId);
        if (patient == null) {
            return ResponseEntity.notFound().build();
        }

        PatientResponse patientResponse = new PatientResponse();
        patientResponse.setPatientId(patient.getPatientId());
        patientResponse.setName(patient.getName());
        patientResponse.setDob(patient.getDob());
        patientResponse.setInsurance(patient.isInsurance());
        return ResponseEntity.ok(patientResponse);
    }

    @GetMapping("/all")
    public ResponseEntity<List<PatientResponse>> getPatient() {

        List<Patient> patients = patientService.findAll();

        List<PatientResponse> responses = patients.stream().map(patient -> patientToResponse(patient)).collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    private PatientResponse patientToResponse(Patient patient) {
        PatientResponse patientResponse = new PatientResponse();
        patientResponse.setPatientId(patient.getPatientId());
        patientResponse.setName(patient.getName());
        patientResponse.setDob(patient.getDob());
        patientResponse.setInsurance(patient.isInsurance());
        return patientResponse;
    }

    @PostMapping
    public ResponseEntity<PatientResponse> addNewPatient(@RequestBody PatientCreateRequest patientCreateRequest) {
        Patient patient = new Patient(
                randomUUID().toString(),
                patientCreateRequest.getName(),
                patientCreateRequest.getDob(),
                patientCreateRequest.isInsurance());
        patientService.addNewPatient(patient);

        PatientResponse patientResponse = new PatientResponse();
        patientResponse.setPatientId(patient.getPatientId());
        patientResponse.setName(patient.getName());
        patientResponse.setDob(patient.getDob());
        patientResponse.setInsurance(patient.isInsurance());

        return ResponseEntity.created(URI.create("/patient/" + patientResponse.getPatientId())).body(patientResponse);
    }

    @PutMapping
    public ResponseEntity<PatientResponse> updatePatient(@RequestBody PatientUpdateRequest patientUpdateRequest) {
        Patient patient = new Patient(patientUpdateRequest.getPatientId(),
                patientUpdateRequest.getName(),
                patientUpdateRequest.getDob(),
                patientUpdateRequest.isInsurance());

        patientService.updatePatient(patient);

        PatientResponse patientResponse = createPatientResponse(patient);

        return ResponseEntity.ok(patientResponse);
    }

    private PatientResponse createPatientResponse(Patient patient) {
        PatientResponse patientResponse = new PatientResponse();
        patientResponse.setPatientId(patient.getPatientId());
        patientResponse.setName(patient.getName());
        patientResponse.setDob(patient.getDob());
        patientResponse.setInsurance(patient.isInsurance());
        return patientResponse;
    }

}
