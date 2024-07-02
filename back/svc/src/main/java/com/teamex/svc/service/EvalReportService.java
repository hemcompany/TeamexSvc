package com.teamex.svc.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamex.svc.entity.EvalReport;
import com.teamex.svc.mapper.EvalReportMapper;

@Service
public class EvalReportService {
	@Autowired
	EvalReportMapper evalReportMapper;

	// ## Evaluation Report Retrieve
	// Evaluation Summary
	public List<EvalReport> selectList(String div, String user_type, String visit_fr, String visit_to) {
		Map<String,Object>map = new HashMap<String,Object>();
		if(div == null)
			map.put("div", "80");
		else
			map.put("div", div);
		map.put("user_type", user_type);    //E : Engineer, O : Operator, P : Parts Management
		map.put("visit_fr", visit_fr);
		map.put("visit_to", visit_to);
		
		//if !(user_type.equals("O") || user_type.equals("A")) return null;
		
		return evalReportMapper.selectList(map);
	}

	// Evaluation Ruow Data
	public List<EvalReport> selectRowData(String div, String user_type, String visit_fr, String visit_to) {
		Map<String,Object>map = new HashMap<String,Object>();
		if(div == null)
			map.put("div", "80");
		else
			map.put("div", div);
		map.put("user_type", user_type);    //E : Engineer, O : Operator, P : Parts Management
		map.put("visit_fr", visit_fr);
		map.put("visit_to", visit_to);
		
		//if !(user_type.equals("O") || user_type.equals("A")) return null;
		
		return evalReportMapper.selectRowData(map);
	}
}