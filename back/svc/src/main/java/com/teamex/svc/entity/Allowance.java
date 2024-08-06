package com.teamex.svc.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;

@Getter
@JsonInclude
public class Allowance {
	String id;
	//Allowance Status
	String div;
	String transaction_no;
	String start_date;
	String complete_date;
	String technician;
	String tech_user_id;
	String site_cd;
	String site_nm;
	double distance;
	double other_distance;
	double mov_distance;
	double mov_hours;
	double std_work_hours;
	double tot_work_hours;
	double adj_hours;
	double real_tot_work_hours;
	String remark;
    
	//Allowance Monthly Accumulate Status
	String w_year;
	String w_month;
	String week_per_mon;
	String end_date;
	
    String user_id;
    String create_id; 
    String create_dt; 
    String update_id; 
    String update_dt; 
}