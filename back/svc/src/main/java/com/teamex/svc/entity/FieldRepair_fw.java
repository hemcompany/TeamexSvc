package com.teamex.svc.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;

@Getter
@JsonInclude
public class FieldRepair_fw {
    //FUTURE WORK lIST
    int    seq;
    String dispenser_id;
    String schedule;
    String reason;
    String part_cd;
}