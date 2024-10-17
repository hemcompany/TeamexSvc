package com.teamex.svc.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.teamex.svc.entity.Consolidation_EVC;

@Repository
@Mapper
public interface ConsolidationMapper {
	
	// ## Consolidation Report Retrieve
	// EVC Consolidation Report
	List<Consolidation_EVC> selectEVC(Map<String,Object> map);

}