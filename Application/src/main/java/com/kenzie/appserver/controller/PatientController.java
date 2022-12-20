package com.kenzie.appserver.controller;

import com.kenzie.appserver.controller.model.ExampleCreateRequest;
import com.kenzie.appserver.controller.model.ExampleResponse;
import com.kenzie.appserver.controller.model.PatientCreateRequest;
import com.kenzie.appserver.controller.model.PatientResponse;
import com.kenzie.appserver.service.ExampleService;
import com.kenzie.appserver.service.PatientService;
import com.kenzie.appserver.service.model.Example;
import com.kenzie.appserver.service.model.Patient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

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
}
