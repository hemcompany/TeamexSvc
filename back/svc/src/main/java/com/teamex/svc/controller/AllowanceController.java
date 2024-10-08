package com.teamex.svc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamex.svc.entity.Allowance;
import com.teamex.svc.service.AllowanceService;

// Default API :  
// "/api/allowance"
@RestController
@RequestMapping("/api/allowance")
public class AllowanceController {
	@Autowired
	AllowanceService allowanceService;

	// ## Allowance Status Retrieve
	// Allowance Summary
	// API : /api/allowance/select/r_summary
	@GetMapping("/select/r_summary")
	///@CrossOrigin(origins = {"http://localhost:3000", "http://localhost", "http://rpt.teamexusa.com"}) : Apply at the WebConfig
	public List<Allowance> selectList(@RequestParam(name="div", required=true) String div,
				@RequestParam(name="user_id") String user_id,
				@RequestParam(name="start_dt") String start_dt, 
				@RequestParam(name="end_dt") String end_dt) {
		return allowanceService.selectList(div, user_id, start_dt, end_dt);
	}

	// API : /api/allowance/select/r_rawdata
	@GetMapping("/select/r_rawdata")
	///@CrossOrigin(origins = {"http://localhost:3000", "http://localhost", "http://rpt.teamexusa.com"}) : Apply at the WebConfig
	public List<Allowance> selectRawData(@RequestParam(name="div", required=true) String div, 
				@RequestParam(name="user_id") String user_id,
				@RequestParam(name="start_dt") String start_dt, 
				@RequestParam(name="end_dt") String end_dt) {
		return allowanceService.selectRawData(div, user_id, start_dt, end_dt);
	}
	
	// ## Allowance Monthly Accumulate Retrieve
	// Allowance Monthly Accumulate Summary
	// API : /api/allowance/select/r_m_summary
	@GetMapping("/select/r_m_summary")
	///@CrossOrigin(origins = {"http://localhost:3000", "http://localhost", "http://rpt.teamexusa.com"}) : Apply at the WebConfig
	public List<Allowance> selectWList(@RequestParam(name="div", required=true) String div,
				@RequestParam(name="user_id") String user_id,
				@RequestParam(name="w_year") String w_year, 
				@RequestParam(name="w_month") String w_month) {
		return allowanceService.selectMList(div, user_id, w_year, w_month);
	}
}