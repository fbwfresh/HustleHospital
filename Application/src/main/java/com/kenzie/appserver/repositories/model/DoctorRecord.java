package com.kenzie.appserver.repositories.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
@DynamoDBTable(tableName = "Doctors")
public class DoctorRecord {
        private String doctorId;
        private String name;
        private String dob;
        private boolean isActive;

        @DynamoDBHashKey(attributeName = "DoctorId")
        public String getDoctorId() {
            return doctorId;
        }

        public void setDoctorId(String doctorId) {
            this.doctorId = doctorId;
        }

        @DynamoDBAttribute(attributeName = "Name")
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        @DynamoDBAttribute(attributeName = "Dob")
        public String getDob() {
            return dob;
        }

        public void setDob(String dob) {
            this.dob = dob;
        }

        @DynamoDBAttribute(attributeName = "isActive")
        public boolean isActive() {
            return isActive;
        }

        public void setActive(boolean isActive) {
            this.isActive = isActive;
        }
    }

