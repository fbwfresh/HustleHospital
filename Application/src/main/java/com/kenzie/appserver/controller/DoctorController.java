package com.kenzie.appserver.controller;

import com.kenzie.appserver.controller.model.DoctorCreateRequest;
import com.kenzie.appserver.controller.model.DoctorResponse;
import com.kenzie.appserver.service.DoctorService;
import com.kenzie.appserver.service.model.Doctor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;


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
