package com.kenzie.appserver.service;

import com.kenzie.appserver.repositories.DoctorRepository;
import com.kenzie.appserver.repositories.model.DoctorRecord;
import com.kenzie.appserver.service.model.Doctor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {
        private DoctorRepository doctorRepository;

        public DoctorService(DoctorRepository doctorRepository) {
            this.doctorRepository = doctorRepository;
        }

        public Doctor findById(String doctorId) {
            Doctor doctorBeingRetrieved = doctorRepository
                    .findById(doctorId)
                    .map(doctor -> new Doctor(doctor.getName(),doctor.getDob(),doctor.getDoctorId(),doctor.isActive()))
                    .orElse(null);

            return doctorBeingRetrieved;
        }
        public List<Doctor> findAll(){
            List<Doctor> doctors = new ArrayList<>();
            doctorRepository.findAll().forEach(doctor -> doctors.add(new Doctor(doctor.getName(),doctor.getDob(),doctor.getDoctorId(),doctor.isActive())));
            return doctors;
        }

        public DoctorRecord addNewDoctor(Doctor doctor) {
            DoctorRecord doctorRecord = new DoctorRecord();
            doctorRecord.setDoctorId(doctor.getDoctorId());
            doctorRecord.setName(doctor.getName());
            doctorRecord.setDob(doctor.getDob());
            doctorRecord.setActive(doctor.isActive());
            doctorRepository.save(doctorRecord);
            return doctorRecord;
        }

        public void removeDoctor(Doctor doctor){
            doctorRepository.deleteById(doctor.getDoctorId());
        }

    public void updateDoctor(Doctor doctor) {
        if (doctorRepository.existsById(doctor.getDoctorId())) {
            DoctorRecord doctorRecord = new DoctorRecord();
            doctorRecord.setActive(doctor.isActive());
            doctorRecord.setDob(doctor.getDob());
            doctorRecord.setDoctorId(doctor.getDoctorId());
            doctorRecord.setName(doctor.getName());

            doctorRepository.save(doctorRecord);
        }
    }
}
