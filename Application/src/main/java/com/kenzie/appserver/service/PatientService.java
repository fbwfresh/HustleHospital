package com.kenzie.appserver.service;

import com.kenzie.appserver.repositories.ExampleRepository;
import com.kenzie.appserver.repositories.PatientRepository;
import com.kenzie.appserver.repositories.model.ExampleRecord;
import com.kenzie.appserver.repositories.model.PatientRecord;
import com.kenzie.appserver.service.model.Example;
import com.kenzie.appserver.service.model.Patient;
import org.springframework.stereotype.Service;

@Service
public class PatientService {
    private PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Patient findById(String patientId) {
        Patient patientFromBackend = patientRepository
                .findById(patientId)
                .map(patient -> new Patient(patient.getName(), patient.getDob(), patient.isInsurance()))
                .orElse(null);

        return patientFromBackend;
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
}
