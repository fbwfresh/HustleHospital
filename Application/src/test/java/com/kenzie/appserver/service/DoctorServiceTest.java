package com.kenzie.appserver.service;

import com.kenzie.appserver.repositories.DoctorRepository;
import com.kenzie.appserver.repositories.PatientRepository;
import com.kenzie.appserver.repositories.model.DoctorRecord;
import com.kenzie.appserver.repositories.model.PatientRecord;
import com.kenzie.appserver.service.model.Doctor;
import com.kenzie.appserver.service.model.Patient;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.Optional;

import static java.util.UUID.randomUUID;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class DoctorServiceTest {
    @Mock
    private DoctorRepository doctorRepository;
    @InjectMocks
    private DoctorService doctorService;

    @BeforeEach
    void setup() {
        doctorRepository = mock(DoctorRepository.class);
        doctorService = new DoctorService(doctorRepository);
    }
    /** ------------------------------------------------------------------------
     *  exampleService.findById
     *  ------------------------------------------------------------------------ **/

    @Test
    void findByDoctorId() {
        // GIVEN
        String name = randomUUID().toString();

        DoctorRecord record = new DoctorRecord();
        record.setName(name);
//        record.setName("patientname");

        // WHEN
        when(doctorRepository.findById(name)).thenReturn(Optional.of(record));
        Doctor doctor = doctorService.findById(name);

        // THEN
        Assertions.assertNotNull(doctor, "The object is returned");
//        Assertions.assertEquals(record.getName(), patient.getName(), "The id matches");
        Assertions.assertEquals(record.getName(), doctor.getName(), "The name matches");
    }

    @Test
    void findByPatientId_invalid() {
        // GIVEN
        String name = randomUUID().toString();

        when(doctorRepository.findById(name)).thenReturn(Optional.empty());

        // WHEN
       Doctor doctor = doctorService.findById(name);

        // THEN
        Assertions.assertNull(doctor, "The patient is null when not found");
    }
}
