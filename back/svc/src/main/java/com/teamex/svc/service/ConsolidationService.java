package com.teamex.svc.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamex.svc.entity.Consolidation_EVC;
import com.teamex.svc.mapper.ConsolidationMapper;

@Service
public class ConsolidationService {
	@Autowired
	ConsolidationMapper consolidationMapper;

	// ## Consolidation Report Retrieve
	// EVC Consolidation Report
	public List<Consolidation_EVC> selectEVC(String div, String user_type, String date_fr, String date_to) {
		Map<String,Object>map = new HashMap<String,Object>();
		if(div == null)
			map.put("div", "80");
		else
			map.put("div", div);
		map.put("user_type", user_type);    //E : Engineer, O : Operator, P : Parts Management
		map.put("date_fr", date_fr);
		map.put("date_to", date_to);
		
		//if !user_type.equals("A") return null;
		
		return consolidationMapper.selectEVC(map);
	}
}