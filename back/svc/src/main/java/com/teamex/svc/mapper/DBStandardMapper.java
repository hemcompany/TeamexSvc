package com.teamex.svc.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.teamex.svc.entity.DBStandard;

@Repository
@Mapper
public interface DBStandardMapper {
	
	// Retrieve Word List
	List<DBStandard> selectWordList(Map<String,Object> map);
	
	//## Retrieve Term List
	List<DBStandard> selectTermList(Map<String,Object> map);
	
	//## Retrieve Table List
	List<DBStandard> selectTableList(Map<String,Object> map);

	//## Retrieve Table Head
	DBStandard selectTableHead(Map<String,Object> map);
	
	//## Retrieve Table Detail
	List<DBStandard> selectTableDetail(Map<String,Object> map);
		
	// INSERT/UPDATE Word
	Integer upsertWord(DBStandard dbStandard);

	// INSERT/UPDATE Term
	Integer upsertTerm(DBStandard dbStandard);
	
	// INSERT/UPDATE Table Head 
	Integer upsertTableHead(DBStandard dbStandard);
	
	// INSERT/UPDATE Table Detail 
	Integer upsertTableDetail(DBStandard dbStandard);
	
	// DELETE Word
	Integer deleteWord(String db_name, String db_user, String word);
	
	// DELETE Term
	Integer deleteTerm(String db_name, String db_user, String term);
	
	// DELETE Table Head
	Integer deleteTableHead(String db_name, String db_user, String table_name);
	
	// DELETE Table Detail
	Integer deleteTableDetail(String db_name, String db_user, String table_name, String column_name);

}