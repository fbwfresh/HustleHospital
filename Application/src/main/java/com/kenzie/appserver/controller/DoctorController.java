package com.kenzie.appserver.controller;

import com.kenzie.appserver.controller.model.DoctorCreateRequest;
import com.kenzie.appserver.controller.model.DoctorResponse;
import com.kenzie.appserver.service.model.Doctor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

//    package com.kenzie.appserver.controller;
//
//import com.kenzie.appserver.controller.model.ExampleCreateRequest;
//import com.kenzie.appserver.controller.model.ExampleResponse;
//import com.kenzie.appserver.controller.model.PatientCreateRequest;
//import com.kenzie.appserver.controller.model.PatientResponse;
//import com.kenzie.appserver.service.ExampleService;
//import com.kenzie.appserver.service.PatientService;
//import com.kenzie.appserver.service.model.Example;
//import com.kenzie.appserver.service.model.Patient;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.net.URI;
//
//import static java.util.UUID.randomUUID;

    @RestController
    @RequestMapping("/doctor")
    public class DoctorController {
        private DoctorService doctorService;

        DoctorController(DoctorService doctorService) {
            this.doctorService = doctorService;
        }

        @GetMapping("/{doctorId}")
        public ResponseEntity<DoctorResponse> getDoctor(@PathVariable("doctorId") String doctorId) {

            Doctor doctor = doctorService.findById(doctorId);
            if (doctor == null) {
                return ResponseEntity.notFound().build();
            }

            DoctorResponse doctorResponse = new DoctorResponse();
            doctorResponse.setDoctorId(doctor.getDoctorId());
            doctorResponse.setName(doctor.getName());
            doctorResponse.setDob(doctor.getDob());
            return ResponseEntity.ok(doctorResponse);
        }

        @PostMapping
        public ResponseEntity<DoctorResponse> addNewDoctor(@RequestBody DoctorCreateRequest doctorCreateRequest) {
            Doctor doctor = new Doctor(
                    doctorCreateRequest.getName(),
                    doctorCreateRequest.getDob(),
                    doctorCreateRequest.isActive());
            doctorService.addNewDoctor(doctor);

            DoctorResponse doctorResponse = new DoctorResponse();
            doctorResponse.setDoctorId(doctor.getDoctorId());
            doctorResponse.setName(doctor.getName());
            doctorResponse.setDob(doctor.getDob());
            doctorResponse.setActive(doctor.isActive());

            return ResponseEntity.created(URI.create("/doctor/" + doctorResponse.getName())).body(doctorResponse);
        }
    }
