package com.teamex.svc.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;

@Getter
@JsonInclude
public class Consolidation_EVC {
	String id;
	String div;
	//EVC Consolidation Report
	String CPO;
	String case_fiscal_period;
	String case_transaction_date;
	String case_number; 
	String case_status;
	String site_cd;
	String station_id;
	String case_sequence;
	String product_cd;
	String model_no;
	String gen_type;
	String site_name;
	String address;
	String city;
	String state_cd;
	String zip_cd;
	String country_cd;
	String teamex_coverage;
	String commissioned_date;
	double station_aging;
	String elam_no;
	String work_type;
	String case_date;
	String case_month;
	String case_year;
	String issuedby;
	String create_id; 
	String creator;
	String create_date;
	String update_id;
	String update_date;
	String response_date;
	String confirm_id;
	String confirm_date;
	String warranty_yn;
	String cycle;
	String priority;
	String response_time;
	String stat_days;
	double stat_hours;
	String symptom;
	String teamviewer;
	String exp_reason;
	String instruction;
	String close_fg;
	String exp_reason_cd;
	String visit_date;
	String work_done;
	String case_visit_dt;
	String check_out;
	String use_part1;
	int    use_part1_qty;
	String use_part2;
	int    use_part2_qty;
	String use_part3;
	int    use_part3_qty;
	String symptom_cd;
	String symptom_desc;
	String repair_cd;
	String action_taken;
	String warranty_cd;
	String visit_yn;
	String tech_company;
	String phone;
	String support;
	String pending_issue;
	String root_cause;
	String RTAT;
	String fs_no;
	String work_order_type;
	String fs_status;
	String fs_creation_date;
	String fs_fiscal_period;
	String client_cd;
	String cust_cd;
	String work_order;
	String plan_date;
	String dispatch_date;
	String case_tech;
	String technician;
	int    tech_count;
	String car1_id;
	String car2_id;
	String fr_no;
	String fr_status;
	String tran_date;
	String ev_car;
	String bill_to_cust;
	String state;
	String zip;
	String total_workhour;
	String workhour_range;
	String visit_dt;
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
	double hotel_amt;
	double mileage;
	double rental_amt;
	double others_amt;
	String billing_fiscal_period;
    String create_dt;
    String cust_name;
    String client_name;
    String date_from;
    String date_to;
    double total_mileage_fee;
    double total_labor_fee;
    double total_hotel_fee;
    double total_rental;
    double others;
    double total_others;
    // EVC Part Usage
    String part_category;
    String use_part;
    int    use_part_qty;
    String part_name;
    String part_desc;

}