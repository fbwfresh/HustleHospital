package com.kenzie.appserver.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.kenzie.appserver.IntegrationTest;
import com.kenzie.appserver.controller.model.ExampleCreateRequest;
import com.kenzie.appserver.controller.model.PatientCreateRequest;
import com.kenzie.appserver.controller.model.PatientUpdateRequest;
import com.kenzie.appserver.service.ExampleService;
import com.kenzie.appserver.service.PatientService;
import com.kenzie.appserver.service.model.Example;
import com.kenzie.appserver.service.model.Patient;
import net.andreinc.mockneat.MockNeat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@IntegrationTest
public class PatientControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    PatientService patientService;

    private final MockNeat mockNeat = MockNeat.threadLocal();

    private final ObjectMapper mapper = new ObjectMapper();

    @Test
    public void getById_Exists() throws Exception {
        String patientId = UUID.randomUUID().toString();
        String name = mockNeat.strings().valStr();
        String dob = mockNeat.strings().valStr();
        boolean insurance = true;

        Patient patient = new Patient(patientId, name, dob, insurance);
        Patient persistedPatient = patientService.addNewPatient(patient);
        mvc.perform(get("/patient/{patientId}", persistedPatient.getPatientId())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("patientId")
                        .value(is(patientId)))
                .andExpect(jsonPath("name")
                        .value(is(name)))
                .andExpect(jsonPath("dob")
                        .value(is(dob)))
                .andExpect(jsonPath("insurance")
                        .value(true))
                .andExpect(status().isOk());
    }

    @Test
    public void createPatient_CreateSuccessful() throws Exception {
        String name = mockNeat.strings().valStr();

        PatientCreateRequest patientCreateRequest = new PatientCreateRequest();
        patientCreateRequest.setName(name);

        mapper.registerModule(new JavaTimeModule());

        mvc.perform(post("/patient")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(patientCreateRequest)))
                .andExpect(jsonPath("name")
                        .exists())
//                .andExpect(jsonPath("name")
//                        .value(is(name)))
                .andExpect(status().isCreated());
    }

//    @Test
//    public void helloDoctorEndpointTest_CreateSuccessful() throws Exception {
//
//        mvc.perform(get("/doctor/hello")
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON))
//                        .andExpect(status().isOk());
//
//    }

    @Test
    public void updatePatient_PutSuccessful() throws Exception {
        // GIVEN
        String patientId = UUID.randomUUID().toString();
        String name = mockNeat.strings().valStr();
        String dob = mockNeat.strings().valStr();
        boolean insurance = true;

        Patient patient = new Patient(patientId, name, dob, insurance);
        Patient persistedPatient = patientService.addNewPatient(patient);
        Patient testPatient = patientService.findById(patientId);
        String newName = mockNeat.strings().valStr();


        PatientUpdateRequest patientUpdateRequest = new PatientUpdateRequest();
        patientUpdateRequest.setPatientId(patientId);
        patientUpdateRequest.setName(newName);
        patientUpdateRequest.setDob(dob);
        patientUpdateRequest.setInsurance(insurance);


        mapper.registerModule(new JavaTimeModule());

        // WHEN
//        mvc.perform(put("/patient")
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(mapper.writeValueAsString(patientUpdateRequest)))
//                // THEN
//                .andExpect(jsonPath("patientId")
//                        .exists())
//                .andExpect(jsonPath("name")
//                        .value(is(newName)))
//                .andExpect(jsonPath("dob")
//                        .value(is(dob)))
//                .andExpect(jsonPath("insurance")
//                        .value(is(true)))
//                .andExpect(status().isOk());
    }
}
