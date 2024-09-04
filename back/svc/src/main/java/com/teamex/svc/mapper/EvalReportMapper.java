package com.teamex.svc.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.teamex.svc.entity.EvalReport;

@Repository
@Mapper
public interface EvalReportMapper {
	
	// ## Evaluation Report Retrieve
	// Evaluation Summary
	List<EvalReport> selectList(Map<String,Object> map);

	// Evaluation Raw Data
	List<EvalReport> selectRawData(Map<String,Object> map);

}