package com.teamex.svc.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamex.svc.entity.User;
import com.teamex.svc.mapper.LoginMapper;

@Service
public class LoginService {
  @Autowired
  LoginMapper loginMapper;

  /**
   * 각 Mapper별의 응답값을 불려오고, 앞으로의 로직을 짤 때는 Controller단이 아닌
   * Service 단에서 별도의 로직과 알고리즘을 구현 하는 형태로 진행합니다.
   */

  //## 로그인처리
  public User doLogin (String inputDiv, String inputId, String inputPass) {
	  Map<String,Object>map = new HashMap<String,Object>();
	  map.put("inputDiv", inputDiv);
	  map.put("inputId", inputId);
	  map.put("inputPass", inputPass);
	  
	  //id, pass 일치하는지 확인 : user info 전체 넘김
	  User user = loginMapper.select_user_info(map);
	  if(user==null) {
		  //id 일치하는지 확인 : id 정보만 넘김
		  user = loginMapper.checkId(map);
	  }
	  return user;
  }
}