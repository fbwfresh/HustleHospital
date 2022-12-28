package com.kenzie.appserver.repositories;

import com.kenzie.appserver.repositories.model.AppointmentRecord;
import com.kenzie.appserver.service.model.Appointment;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

@EnableScan
public interface AppointmentRepository extends CrudRepository<AppointmentRecord, String> {
}
