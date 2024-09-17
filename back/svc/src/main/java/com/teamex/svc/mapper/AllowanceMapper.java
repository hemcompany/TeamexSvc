package com.teamex.svc.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.teamex.svc.entity.Allowance;

@Repository
@Mapper
public interface AllowanceMapper {
	
	// ## Allowance Status Retrieve
	// Allowance list
	List<Allowance> selectList(Map<String,Object> map);

	// Allowance Raw Data
	List<Allowance> selectRawData(Map<String,Object> map);
	
	// ## Allowance Monthly Accumulate Retrieve
	// Allowance Monthly Accumulate Summary
	List<Allowance> selectMList(Map<String,Object> map);
}