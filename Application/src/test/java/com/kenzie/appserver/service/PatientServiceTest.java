package com.kenzie.appserver.service;

import com.kenzie.appserver.repositories.ExampleRepository;
import com.kenzie.appserver.repositories.PatientRepository;
import com.kenzie.appserver.repositories.model.ExampleRecord;
import com.kenzie.appserver.repositories.model.PatientRecord;
import com.kenzie.appserver.service.model.Example;
import com.kenzie.appserver.service.model.Patient;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static java.util.UUID.randomUUID;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class PatientServiceTest {
    private PatientRepository patientRepository;
    private PatientService patientService;

    @BeforeEach
    void setup() {
        patientRepository = mock(PatientRepository.class);
        patientService = new PatientService(patientRepository);
    }
    /** ------------------------------------------------------------------------
     *  exampleService.findById
     *  ------------------------------------------------------------------------ **/

    @Test
    void findByName() {
        // GIVEN
        String name = randomUUID().toString();

        PatientRecord record = new PatientRecord();
        record.setName(name);
//        record.setName("patientname");

        // WHEN
        when(patientRepository.findById(name)).thenReturn(Optional.of(record));
        Patient patient = patientService.findById(name);

        // THEN
        Assertions.assertNotNull(patient, "The object is returned");
//        Assertions.assertEquals(record.getName(), patient.getName(), "The id matches");
        Assertions.assertEquals(record.getName(), patient.getName(), "The name matches");
    }

    @Test
    void findByPatientId_invalid() {
        // GIVEN
        String name = randomUUID().toString();

        when(patientRepository.findById(name)).thenReturn(Optional.empty());

        // WHEN
        Patient patient = patientService.findById(name);

        // THEN
        Assertions.assertNull(patient, "The patient is null when not found");
    }
}
