package com.kenzie.appserver.service;

import com.kenzie.appserver.repositories.model.DoctorRecord;
import com.kenzie.appserver.service.model.Doctor;
import org.springframework.stereotype.Service;
@Service
public class DoctorService {
        private DoctorRepository doctorRepository;

        public DoctorService(DoctorRepository doctorRepository) {
            this.doctorRepository = doctorRepository;
        }

        public Doctor findById(String patientId) {
            Doctor doctorBeingRetrieved = doctorRepository
                    .findById(patientId)
                    .map(doctor -> new Doctor(doctor.getName(), doctor.getDob(), doctor.isInsurance()))
                    .orElse(null);

            return doctorBeingRetrieved;
        }

        public Doctor addNewDoctor(Doctor patient) {
            DoctorRecord doctorRecord = new DoctorRecord();
            doctorRecord.setDoctorId(doctorRecord.getDoctorId());
            doctorRecord.setName(patient.getName());
            doctorRecord.setDob(patient.getDob());
            doctorRecord.setInsurance(patient.isInsurance());
            patientRepository.save(doctorRecord);
            return patient;
        }
}
