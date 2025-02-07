package com.teamex.svc.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamex.svc.entity.DBStandard;
import com.teamex.svc.mapper.DBStandardMapper;

@Service
public class DBStandardService {
	@Autowired
	DBStandardMapper dbStandardMapper;

	//## Retrieve Word List
	public List<DBStandard> selectWordList(String db_name, String db_user, String word, String word_name) {
		Map<String,Object>map = new HashMap<String,Object>();
		map.put("db_name", db_name);
		map.put("db_user", db_user);
		map.put("word", word);
		map.put("word_name", word_name);
		return dbStandardMapper.selectWordList(map);
	}

	//## Retrieve Term list
	public List<DBStandard> selectTermList(String db_name, String db_user, String term, String term_name) {
		Map<String,Object>map = new HashMap<String,Object>();
		map.put("db_name", db_name);
		map.put("db_user", db_user);
		map.put("term", term);
		map.put("term_name", term_name);
		return dbStandardMapper.selectTermList(map);
	}
	
	//## Retrieve Table List
	public List<DBStandard> selectTableList(String db_name, String db_user, String table_name, String table_comments) {
		Map<String,Object>map = new HashMap<String,Object>();
		map.put("db_name", db_name);
		map.put("db_user", db_user);
		map.put("table_name", table_name);
		map.put("table_comments", table_comments);
		return dbStandardMapper.selectTableList(map);
	}
	
	//## Retrieve Table Head
	public DBStandard selectTableHead(String db_name, String db_user, String table_name) {
		Map<String,Object>map = new HashMap<String,Object>();
		map.put("db_name", db_name);
		map.put("db_user", db_user);
		map.put("table_name", table_name);
		return dbStandardMapper.selectTableHead(map);
	}
	
	//## Retrieve Table Detail
	public List<DBStandard> selectTableDetail(String db_name, String db_user, String table_name) {
		Map<String,Object>map = new HashMap<String,Object>();
		map.put("db_name", db_name);
		map.put("db_user", db_user);
		map.put("table_name", table_name);
		return dbStandardMapper.selectTableDetail(map);
	}
	
	
	//## INSERT/UPDATE Word
	public Integer upsertWord(DBStandard dbStandard) {
		return dbStandardMapper.upsertWord(dbStandard);
	}

	//## INSERT/UPDATE Term
	public Integer upsertTerm(DBStandard dbStandard) {
		return dbStandardMapper.upsertTerm(dbStandard);
	}
	
	//## INSERT/UPDATE Table Head 
	public Integer upsertTableHead(DBStandard dbStandard) {
		return dbStandardMapper.upsertTableHead(dbStandard);
	}
	
	//## INSERT/UPDATE Table Detail 
	public Integer upsertTableDetail(DBStandard dbStandard) {
		return dbStandardMapper.upsertTableDetail(dbStandard);
	}
	
	//## DELETE Word
	public Integer deleteWord(String db_name, String db_user, String word) {
		return dbStandardMapper.deleteWord(db_name, db_user, word);
	}
	
	//## DELETE Term
	public Integer deleteTerm(String db_name, String db_user, String term) {
		return dbStandardMapper.deleteTerm(db_name, db_user, term);
	}
	
	//## DELETE Table Head
	public Integer deleteTableHead(String db_name, String db_user, String table_name) {
		return dbStandardMapper.deleteTableHead(db_name, db_user, table_name);
	}
	
	//## DELETE Table Detail
	public Integer deleteTableDetail(String db_name, String db_user, String table_name, String column_name) {
		return dbStandardMapper.deleteTableDetail(db_name, db_user, table_name, column_name);
	}

}