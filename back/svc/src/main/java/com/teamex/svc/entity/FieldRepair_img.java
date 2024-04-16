package com.teamex.svc.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;

@Getter
@JsonInclude
public class FieldRepair_img {
    //IMAGE lIST
    String div;
    String reportno;
    int    img_seq;
    String img_yyyymm;
    String img_nm;
}