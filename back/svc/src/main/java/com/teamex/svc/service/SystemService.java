package com.teamex.svc.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamex.svc.entity.Menu;
import com.teamex.svc.mapper.SystemMapper;

@Service
public class SystemService {
	@Autowired
	SystemMapper systemMapper;

	//## Retrieve Menu Master
	public List<Menu> selectMenuList(String program_id, String menu_name) {
		Map<String,Object>map = new HashMap<String,Object>();
		map.put("program_id", program_id);
		map.put("menu_name", menu_name);
		return systemMapper.selectMenuList(map);
	}

	//## Retrieve menu list per authority group
	public List<Menu> selectAuthMenuList(String auth_group, String program_id, String menu_id) {
		Map<String,Object>map = new HashMap<String,Object>();
		map.put("auth_group", auth_group);
		map.put("program_id", program_id);
		map.put("menu_id", menu_id);
		return systemMapper.selectAuthMenuList(map);
	}
	
	//## Retrieve authority group  per user_id
	public List<Menu> selectUserAuth(String user_id, String div, String auth_group) {
		Map<String,Object>map = new HashMap<String,Object>();
		map.put("user_id", user_id);
		map.put("div", div);
		map.put("auth_group", auth_group);
		return systemMapper.selectUserAuth(map);
	}
	
	// INSERT/UPDATE Menu Master
	public Integer upsertMenu(Menu menu) {
		return systemMapper.upsertMenu(menu);
	}
	
	// INSERT/UPDATE Menu list per authority group
	public Integer upsertAuthMenu(Menu menu) {
		return systemMapper.upsertAuthMenu(menu);
	}
	
	// INSERT/UPDATE authority group  per user_id 
	public Integer upsertUserAuth(Menu menu) {
		return systemMapper.upsertUserAuth(menu);
	}

	// DELETE Menu Master 
	public Integer deleteMenu(String program_id, String menu_id) {
		return systemMapper.deleteMenu(program_id, menu_id);
	}

	// DELETE Menu list per authority group
	public Integer deleteAuthMenu(String auth_group, String program_id, String menu_id) {
		return systemMapper.deleteAuthMenu(auth_group, program_id, menu_id);
	}
	
	// DELETE authority group  per user_id 
	public Integer deleteUserAuth(String user_id, String div, String auth_group) {
		return systemMapper.deleteUserAuth(user_id, div, auth_group);
	}
}