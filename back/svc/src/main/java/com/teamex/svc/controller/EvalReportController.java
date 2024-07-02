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

import com.teamex.svc.entity.EvalReport;
import com.teamex.svc.service.EvalReportService;

// Default API :  
// "/api/evalReport"
@RestController
@RequestMapping("/api/evalReport")
public class EvalReportController {
	@Autowired
	EvalReportService evalReportService;

	// ## Evaluation Report Retrieve
	// Evaluation Summary
	// API : /api/evalReport/select/r_summary
	@GetMapping("/select/r_summary")
	///@CrossOrigin(origins = {"http://localhost:3000", "http://localhost", "http://rpt.teamexusa.com"}) : Apply at the WebConfig
	public List<EvalReport> selectList(@RequestParam(name="div", required=true) String div,
				@RequestParam(name="user_type") String user_type,
				@RequestParam(name="visit_fr") String visit_fr, 
				@RequestParam(name="visit_to") String visit_to) {
		return evalReportService.selectList(div, user_type, visit_fr, visit_to);
	}

	// API : /api/evalReport/select/r_rowdata
	@GetMapping("/select/r_rowdata")
	///@CrossOrigin(origins = {"http://localhost:3000", "http://localhost", "http://rpt.teamexusa.com"}) : Apply at the WebConfig
	public List<EvalReport> selectRowData(@RequestParam(name="div", required=true) String div, 
				@RequestParam(name="user_type") String user_type,
				@RequestParam(name="visit_fr") String visit_fr, 
				@RequestParam(name="visit_to") String visit_to) {
    return evalReportService.selectRowData(div, user_type, visit_fr, visit_to);
  }
}