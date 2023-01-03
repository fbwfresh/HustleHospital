package com.kenzie.appserver.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.kenzie.appserver.IntegrationTest;
import com.kenzie.appserver.controller.model.DoctorCreateRequest;
import com.kenzie.appserver.controller.model.DoctorUpdateRequest;
import com.kenzie.appserver.repositories.model.DoctorRecord;
import com.kenzie.appserver.service.DoctorService;
import com.kenzie.appserver.service.model.Doctor;
import net.andreinc.mockneat.MockNeat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@IntegrationTest
public class DoctorControllerTest {
        @Autowired
        private MockMvc mvc;

        @Autowired
        DoctorService doctorService;

        private final MockNeat mockNeat = MockNeat.threadLocal();

        private final ObjectMapper mapper = new ObjectMapper();

        @Test
        public void getById_Exists() throws Exception {
            String doctorId = UUID.randomUUID().toString();
            String name = mockNeat.strings().valStr();
            String dob = mockNeat.strings().valStr();
            boolean isActive = true;

            Doctor doctor = new Doctor(name, dob, doctorId, isActive);
            DoctorRecord persistedDoctor = doctorService.addNewDoctor(doctor);
            mvc.perform(get("/doctor/{doctorId}", persistedDoctor.getDoctorId())
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(jsonPath("doctorId")
                            .value(is(doctorId)))
                    .andExpect(jsonPath("name")
                            .value(is(name)))
                    .andExpect(jsonPath("dob")
                            .value(is(dob)))
                    .andExpect(jsonPath("isActive")
                            .value(true))
                    .andExpect(status().isOk());
        }

        @Test
        public void createDoctor_CreateSuccessful() throws Exception {
            String name = mockNeat.strings().valStr();
            Doctor doctor = new Doctor(name,mockNeat.strings().valStr());


            DoctorCreateRequest doctorCreateRequest = new DoctorCreateRequest();
            doctorCreateRequest.setName(doctor.getName());
            doctorCreateRequest.setDob(doctor.getDob());
            doctorCreateRequest.setDoctorId(doctor.getDoctorId());
            doctorCreateRequest.setActive(doctor.isActive());
            mapper.registerModule(new JavaTimeModule());

            mvc.perform(post("/doctor")
                            .accept(MediaType.APPLICATION_JSON)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(mapper.writeValueAsString(doctorCreateRequest)))
                    .andExpect(jsonPath("name")
                            .exists())
                    .andExpect(jsonPath("dob")
                            .exists())
                    .andExpect(status().isCreated());
        }

        @Test
        public void updateDoctor_PutSuccessful() throws Exception {
            // GIVEN
            String doctorId = UUID.randomUUID().toString();
            String name = mockNeat.strings().valStr();
            String dob = mockNeat.strings().valStr();
            boolean isActive = true;

            Doctor doctor = new Doctor(name, dob, doctorId, isActive);
            DoctorRecord persistedDoctor = doctorService.addNewDoctor(doctor);
            Doctor testDoctor = doctorService.findById(doctorId);
            String newName = mockNeat.strings().valStr();


            DoctorUpdateRequest doctorUpdateRequest = new DoctorUpdateRequest();
            doctorUpdateRequest.setDoctorId(doctorId);
            doctorUpdateRequest.setName(newName);
            doctorUpdateRequest.setDob(dob);
            doctorUpdateRequest.setActive(isActive);


            mapper.registerModule(new JavaTimeModule());

            // WHEN
        mvc.perform(put("/doctor")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(doctorUpdateRequest)))
                // THEN
                .andExpect(jsonPath("doctorId")
                        .exists())
                .andExpect(jsonPath("name")
                        .value(is(newName)))
                .andExpect(jsonPath("dob")
                        .value(is(dob)))
                .andExpect(jsonPath("isActive")
                        .value(is(true)))
                .andExpect(status().isOk());
        }
    }


