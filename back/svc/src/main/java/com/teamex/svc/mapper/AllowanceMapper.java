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
	// Allowance Accumulation list
	List<Allowance> selectList(Map<String,Object> map);

	// Evaluation Row Data
	List<Allowance> selectRowData(Map<String,Object> map);

}