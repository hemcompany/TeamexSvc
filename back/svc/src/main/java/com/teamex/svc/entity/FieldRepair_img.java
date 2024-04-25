package com.teamex.svc.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@JsonInclude
public class FieldRepair_img {
    //IMAGE lIST
    String div;
    String reportno;
    int    img_seq;
    String img_nm;
    String img_path;
    String img_desc;
}