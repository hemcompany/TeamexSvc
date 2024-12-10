package com.teamex.svc.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.teamex.svc.entity.Consolidation_EVC;
import com.teamex.svc.entity.Consolidation_CompWH;

@Repository
@Mapper
public interface ConsolidationMapper {
	
	// ## Consolidation Report Retrieve
	// EVC Consolidation Report
	List<Consolidation_EVC> selectEVC(Map<String,Object> map);
	// EVC Part Usage Report
	List<Consolidation_EVC> selectEVCPart(Map<String,Object> map);
	// ## Compare WH (SWH vs AWH) Report Retrieve
	// Visit Data for Grid
	List<Consolidation_CompWH> selectVisitData(Map<String,Object> map);
	// Efficiency of SOW for Report
	List<Consolidation_CompWH> selectEffOfSOW(Map<String,Object> map);
	// PV Analysis for Report
	List<Consolidation_CompWH> selectPvAnalysis(Map<String,Object> map);

}