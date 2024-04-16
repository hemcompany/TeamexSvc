package com.teamex.svc.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;

@Getter
@JsonInclude
public class FieldRepair_d {
    //Report Detail
    int    seq;
    String dispenser_id;
    String serialno;
    String model_no;
    String work_order;
    String visit_reason;
    String action_detail;
    String action_performed;
    String partcode;
    String partsname;
    String qty;
    String issues_found;
    String vehicle;
    String frequency;
    String result;
    String cable_type;
    String times;
    String new_error;
    String hmi;
    String nayax;
    String rf_reader;
    String ver_check;
    String pcdpcomm_am;
    String pcdpcomm_as;
    String rv_schedule;
    String rv_reason;
    String rv_partcode;
    String rv_partname;
    String part1_cd;
    String part1_nm;
    int    part1_qty;
    String part2_cd;
    String part2_nm;
    int    part2_qty;
    String part3_cd;
    String part3_nm;
    int    part3_qty;
    String car;
}