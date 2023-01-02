package com.kenzie.appserver.controller;

import com.kenzie.appserver.controller.model.DoctorCreateRequest;
import com.kenzie.appserver.controller.model.DoctorResponse;
import com.kenzie.appserver.controller.model.DoctorUpdateRequest;
import com.kenzie.appserver.service.DoctorService;
import com.kenzie.appserver.service.model.Doctor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/doctor")
public class DoctorController {
    private final DoctorService doctorService;

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
        doctorResponse.setActive(doctor.isActive());
        return ResponseEntity.ok(doctorResponse);
    }

    @GetMapping("/all")
    public ResponseEntity<List<DoctorResponse>> getAllDoctors(){
        List<Doctor> doctors = doctorService.findAll();
        List<DoctorResponse> responses = doctors.stream().map(doctor -> createDoctorResponse(doctor)).collect(Collectors.toList());

        //I think we have to create a URI before we are able to get from it
        return ResponseEntity.created(URI.create("doctor/all")).body(responses);

    }

    @PostMapping
    public ResponseEntity<DoctorResponse> addNewDoctor(@RequestBody DoctorCreateRequest doctorCreateRequest) {
        Doctor doctor = new Doctor(
                doctorCreateRequest.getName(),
                doctorCreateRequest.getDob()
                );
        doctorService.addNewDoctor(doctor);
        DoctorResponse doctorResponse = new DoctorResponse();
        doctorResponse.setDoctorId(doctor.getDoctorId());
        doctorResponse.setName(doctor.getName());
        doctorResponse.setDob(doctor.getDob());
        doctorResponse.setActive(doctor.isActive());
        //Creates the endpoint
        return ResponseEntity.created(URI.create("/doctor/" + doctorResponse.getDoctorId())).body(doctorResponse);
    }

    @PutMapping
    public ResponseEntity<DoctorResponse> updateDoctor(@RequestBody DoctorUpdateRequest doctorUpdateRequest) {
        Doctor doctor = new Doctor(doctorUpdateRequest.getName(), doctorUpdateRequest.getDob(), doctorUpdateRequest.getDoctorId(), doctorUpdateRequest.isActive());
        doctorService.updateDoctor(doctor);
        DoctorResponse doctorResponse = createDoctorResponse(doctor);
        return ResponseEntity.ok(doctorResponse);
    }
    @DeleteMapping("/{doctorId}")
    public ResponseEntity removeDoctor(@PathVariable("doctorId") String doctorId){
        if(doctorService.findById(doctorId) == null){
            return ResponseEntity.badRequest().build();
        }
        doctorService.removeDoctor(doctorService.findById(doctorId));
        return ResponseEntity.noContent().build();
    }

    private DoctorResponse createDoctorResponse(Doctor doctor) {
        DoctorResponse doctorResponse = new DoctorResponse();
        doctorResponse.setActive(doctor.isActive());
        doctorResponse.setDob(doctor.getDob());
        doctorResponse.setDoctorId(doctor.getDoctorId());
        doctorResponse.setName(doctor.getName());
        return doctorResponse;
    }
}
