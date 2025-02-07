package com.teamex.svc.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.teamex.svc.entity.Menu;

@Repository
@Mapper
public interface SystemMapper {
	
	// Retrieve Menu Master
	List<Menu> selectMenuList(Map<String,Object> map);
	
	//## Retrieve menu list per authority group
	List<Menu> selectAuthMenuList(Map<String,Object> map);
	
	//## Retrieve authority group  per user_id
	List<Menu> selectUserAuth(Map<String,Object> map);

	// INSERT/UPDATE Menu Master
	Integer upsertMenu(Menu menu);

	// INSERT/UPDATE Menu list per authority group
	Integer upsertAuthMenu(Menu menu);
	
	// INSERT/UPDATE authority group  per user_id 
	Integer upsertUserAuth(Menu menu);
	
	// DELETE Menu Master
	Integer deleteMenu(String program_id, String menu_id);
	
	// DELETE Menu list per authority group
	Integer deleteAuthMenu(String auth_group, String program_id, String menu_id);
	
	// DELETE authority group  per user_id 
	Integer deleteUserAuth(String user_id, String div, String auth_group);

}