package com.kenzie.appserver.repositories;

import com.kenzie.appserver.repositories.model.DoctorRecord;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;
@EnableScan
public interface DoctorRepository extends CrudRepository<DoctorRecord,String> {
}
