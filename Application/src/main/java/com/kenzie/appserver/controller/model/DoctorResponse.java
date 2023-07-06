package com.kenzie.appserver.controller.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class DoctorResponse {
        @JsonProperty("doctorId")
        private String doctorId;
        @JsonProperty("name")
        private String name;
        @JsonProperty("dob")
        private  String dob;
        @JsonProperty("isActive")
        private boolean isActive;

        public String getDoctorId() {
            return doctorId;
        }

        public String getName() {
            return name;
        }

        public boolean isActive(){
            return this.isActive;
        }

        public String getDob(){
            return this.dob;
        }
        public void setActive(boolean isActive){
            this.isActive = isActive;
        }
        public void setName(String name) {
        this.name = name;
    }

        public void setDoctorId(String doctorId){
            this.doctorId = doctorId;
        }
        public void setDob(String dob){
            this.dob = dob;
        }

    }


