package com.teamex.svc.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamex.svc.entity.Allowance;
import com.teamex.svc.mapper.AllowanceMapper;

@Service
public class AllowanceService {
	@Autowired
	AllowanceMapper allowanceMapper;

	// ## Allowance Status Retrieve
	// Allowance list
	public List<Allowance> selectList(String div, String user_type, String user_id, String start_dt, String end_dt) {
		Map<String,Object>map = new HashMap<String,Object>();
		if(div == null)
			map.put("div", "80");
		else
			map.put("div", div);
		map.put("user_type", user_type);    //E : Engineer, O : Field Operation, P : Parts Management
		map.put("user_id", user_id);
		map.put("start_dt", start_dt);
		map.put("end_dt", end_dt);
		
		//if !(user_type.equals("O") || user_type.equals("A")) return null;
		
		return allowanceMapper.selectList(map);
	}

	// Allowance Ruow Data
	public List<Allowance> selectRowData(String div, String user_type, String user_id, String start_dt, String end_dt) {
		Map<String,Object>map = new HashMap<String,Object>();
		if(div == null)
			map.put("div", "80");
		else
			map.put("div", div);
		map.put("user_type", user_type);    //E : Engineer, O : Field Operation, P : Parts Management, A : All
		map.put("user_id", user_id);
		map.put("start_dt", start_dt);
		map.put("end_dt", end_dt);
		
		//if !(user_type.equals("O") || user_type.equals("A")) return null;
		
		return allowanceMapper.selectRowData(map);
	}
	
	// ## Allowance Monthly Accumulate Retrieve
	// Allowance Monthly Accumulate Summary
	public List<Allowance> selectMList(String div, String user_type, String user_id, String w_year, String w_month) {
		Map<String,Object>map = new HashMap<String,Object>();
		if(div == null)
			map.put("div", "80");
		else
			map.put("div", div);
		map.put("user_type", user_type);    //E : Engineer, O : Field Operation, P : Parts Management
		map.put("user_id", user_id);
		map.put("w_year", w_year);
		map.put("w_month", w_month);
		
		//if !(user_type.equals("O") || user_type.equals("A")) return null;
		
		return allowanceMapper.selectMList(map);
	}
}