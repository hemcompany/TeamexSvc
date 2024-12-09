package com.teamex.svc.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamex.svc.entity.User;
import com.teamex.svc.entity.Menu;
import com.teamex.svc.mapper.LoginMapper;

@Service
public class LoginService {
	@Autowired
	LoginMapper loginMapper;
	
	//## Login
	public User doLogin (String inputDiv, String inputId, String inputPass) {
		Map<String,Object>map = new HashMap<String,Object>();
		map.put("inputDiv", inputDiv);
		map.put("inputId", inputId);
		map.put("inputPass", inputPass);
	
		//Check id, pass : if right, set user information
		User user = loginMapper.select_user_info(map);
		if(user==null) {
			//Check id : set id information only
			user = loginMapper.checkId(map);
		}
		return user;
	}

	//## Get Menu Authority Information
	public List<Menu> getMenuList (String id, String div) {
		Map<String,Object>map = new HashMap<String,Object>();
		map.put("id", id);
		map.put("div", div);
		List<Menu> menu = loginMapper.select_menu_list(map);
		
		return menu;
	}
}