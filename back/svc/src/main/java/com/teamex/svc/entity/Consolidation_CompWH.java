package com.teamex.svc.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;

@Getter
@JsonInclude
public class Consolidation_CompWH {
	String id;
	int    lev;
	
	String sow_type;
	String warranty_yn;
	String gen_type;
	String site_cd;
	String station_id;
	String site_name;
	String address;
	String city;
	String state_cd;
	String zip_cd;
	String teamex_office;
	String elam_case;
	String mfr_case; 
	String code;
	String new_code;
	String description;
	float  swh_in_dec;
	String swh_in_time;
	String check_in_1;
	String check_out_1;
	String check_in_2;
	String check_out_2;
	String check_in_3;
	String check_out_3;
	String check_in_4;
	String check_out_4;
	String check_in_5;
	String check_out_5;
    float  awh_in_dec;
    float  avg_awh_in_dec;
    String awh_in_time;
    double efficiency;
    double avg_efficiency;
    int    count_assigned_tech;
    String priority_level;
    String case_opened_date;
    String case_owner;
    String issue;
    String recommended_parts;
    String so_no;
    String rma;
    String need_parts;
    String status_of_parts;
    String tracking_number;
    String eta_of_parts;
    String date_wo_released;
    String work_order;
    String fs_no;
    String assigned_to;
    String est_start_date;
    String date_of_visit;
    int    sla; 
    String dispatch_status;
    String pending_issue;
    String reason_of_cancellation;
    String date_wo_cancel;
    String fr_no;
}