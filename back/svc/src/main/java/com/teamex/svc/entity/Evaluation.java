package com.teamex.svc.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;

@Getter
@JsonInclude
public class Evaluation {
	String id;
	//Report Info
	String div;
	String reportno;
	String report_sts;
	String visit_dt;
	String technician;
	String cust_cd;
	boolean ev_e;
	boolean ev_o;
	boolean ev_p;
	
	//Evaluation Info
	String ev_sts;  // B : Nothing , P : Processing , C : Completed
	String ev_sts_nm;
	String ev_cls;  // E : Engineer, O : Operator, P : Parts Management
	String ev_cls_nm;
	String evaluator;
	float  ev_code;
	String ev_category;
    String ev_item;
    int    ev_result;
    String ev_comment;
    
    String user_id;
    String create_id; 
    String create_dt; 
    String update_id; 
    String update_dt; 
}