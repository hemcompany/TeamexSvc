package com.teamex.svc.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@JsonInclude
public class User {
	String inputDiv;
	String inputId;
	String inputPass;
	
    //User Info
	String div;
    String user_id;
    String status;
    String lname;
    String fname;
    String mname;
    String e_mail;
    String tel;
    String user_grp_cd;
    String profile;
    String priority_class;
    String note;
    String memo;
    String edi_fg;
    String version;
    String wkst_id;
    String lscn;
    String lang;
}