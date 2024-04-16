package com.teamex.svc.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;

@Getter
@JsonInclude
public class FieldRepair {
	//List, Report Head
	String id;
	String div;
	String reportno;
	String report_sts;
	String tran_date;
	String visit_dt;
	String technician;
	String ev_car; 
    String cust_cd; 
    String bill_to_cust;
    String beg_ptc;
    String end_ptc;
    String beg_noc;
    String end_noc;
    String site_cd;
    String site_name;
    String address; 
    String city; 
    String state; 
    String zip; 
    String wt_ci1; 
    String wt_co1; 
    String wt_ci2; 
    String wt_co2; 
    String wt_ci3; 
    String wt_co3; 
    String wt_ci4; 
    String wt_co4; 
    String wt_ci5; 
    String wt_co5; 
    double wt1;
    double wt2;
    double wt3;
    double wt4;
    double wt5;
    int    hotel_night; 
    double hotel_amt; 
    double mileage; 
    double rental_amt; 
    double others_amt; 
    String fiscal_period; 
    String fs_no; 
    String work_type; 
    String invoice_no; 
    String img1_nm; 
    String img2_nm; 
    String img3_nm; 
    String img4_nm; 
    String img5_nm; 
    String img6_nm; 
    String create_id; 
    String create_dt; 
    String update_id; 
    String update_dt; 
    String confirm_id; 
    String confirm_dt; 
    String modified; 
    String mod_yn; 
    String mod_dt; 
    String reviewd; 
    String review_yn; 
    String review_dt; 
    String email_fg;
    String prepared;
    String approved;
    
    //REPORT FUTURE WORK
    //String schedule;
    //String reason;
    //String part_cd;
}