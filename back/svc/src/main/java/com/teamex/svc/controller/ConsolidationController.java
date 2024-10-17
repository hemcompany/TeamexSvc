package com.teamex.svc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamex.svc.entity.Consolidation_EVC;
import com.teamex.svc.service.ConsolidationService;

// Default API :  
// "/api/consolidation"
@RestController
@RequestMapping("/api/consolidation")
public class ConsolidationController {
	@Autowired
	ConsolidationService consolidationService;

	// ## Consolidation Report Retrieve
	// EVC Consolidation Report
	// API : /api/consolidation/select/r_evc
	@GetMapping("/select/r_evc")
	///@CrossOrigin(origins = {"http://localhost:3000", "http://localhost", "http://rpt.teamexusa.com"}) : Apply at the WebConfig
	public List<Consolidation_EVC> selectList(@RequestParam(name="div", required=true) String div,
				@RequestParam(name="user_type", required=true) String user_type,
				@RequestParam(name="date_fr") String date_fr, 
				@RequestParam(name="date_to") String date_to) {
		return consolidationService.selectEVC(div, user_type, date_fr, date_to);
	}
}