package com.teamex.svc.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;

@Getter
@JsonInclude
public class EvalReport {
	String id;
	int lev;
	//Evaluation Info
	String div;
	String reportno;
	String visit_dt;
	String technician;
	//Evaluation Info
	String ev_cls;  // E : Engineer, O : Operator, P : Parts Management
	String ev_cls_nm;
	String evaluator;
	float  ev_code;
	String ev_category;
    String ev_item;
    int    ev_result;
    double avg_result;
    String ev_comment;
    
    String user_id;
    String create_id; 
    String create_dt; 
    String update_id; 
    String update_dt; 
}