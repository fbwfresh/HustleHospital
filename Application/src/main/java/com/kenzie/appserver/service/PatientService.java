package com.kenzie.appserver.service;

import com.kenzie.appserver.repositories.ExampleRepository;
import com.kenzie.appserver.repositories.PatientRepository;
import com.kenzie.appserver.repositories.model.ExampleRecord;
import com.kenzie.appserver.repositories.model.PatientRecord;
import com.kenzie.appserver.service.model.Example;
import com.kenzie.appserver.service.model.Patient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PatientService {
    private PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Patient findById(String patientId) {
        Patient patientFromBackend = patientRepository
                .findById(patientId)
                .map(patient -> new Patient(patient.getPatientId(), patient.getName(), patient.getDob(), patient.isInsurance()))
                .orElse(null);

        return patientFromBackend;
    }

    public List<Patient> findAll() {
        List<Patient> patients = new ArrayList<>();
        patientRepository
                .findAll()
                .forEach(patient -> patients.add(new Patient(patient.getPatientId(), patient.getName(), patient.getDob(), patient.isInsurance())));
        return patients;
    }

    public Patient addNewPatient(Patient patient) {
        PatientRecord patientRecord = new PatientRecord();
        patientRecord.setPatientId(patient.getPatientId());
        patientRecord.setName(patient.getName());
        patientRecord.setDob(patient.getDob());
        patientRecord.setInsurance(patient.isInsurance());
        patientRepository.save(patientRecord);
        return patient;
    }

    public void updatePatient(Patient patient) {
        if (patientRepository.existsById(patient.getPatientId())) {
            PatientRecord patientRecord = new PatientRecord();
            patientRecord.setPatientId(patient.getPatientId());
            patientRecord.setDob(patient.getDob());
            patientRecord.setName(patient.getName());
            patientRecord.setInsurance(patient.isInsurance());
            patientRepository.save(patientRecord);
        }
//        cache.evict(patient.getPatientId());
    }
}
