package com.kenzie.appserver.service;

import com.kenzie.appserver.repositories.model.ExampleRecord;
import com.kenzie.appserver.repositories.ExampleRepository;
import com.kenzie.appserver.service.model.Example;

import org.springframework.stereotype.Service;

@Service
public class ExampleService {
    private ExampleRepository exampleRepository;

    public ExampleService(ExampleRepository exampleRepository) {
        this.exampleRepository = exampleRepository;
    }

    public Example findById(String id) {
        Example exampleFromBackend = exampleRepository
                .findById(id)
                .map(example -> new Example(example.getId(), example.getName()))
                .orElse(null);

        return exampleFromBackend;
    }

    public Example addNewExample(Example example) {
        ExampleRecord exampleRecord = new ExampleRecord();
        exampleRecord.setId(example.getId());
        exampleRecord.setName(example.getName());
        exampleRepository.save(exampleRecord);
        return example;
    }
}
