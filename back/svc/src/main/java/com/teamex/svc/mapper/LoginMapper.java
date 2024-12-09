package com.teamex.svc.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.teamex.svc.entity.User;
import com.teamex.svc.entity.Menu;

@Repository
@Mapper
public interface LoginMapper {
  // ## LOGIN
  // Check ID correct
  User checkId(Map<String,Object> map);

  // When ID, PASS correct, retrieve user information
  User select_user_info(Map<String, Object> map);
  
  // Retrieve Menu list for user
  List<Menu> select_menu_list(Map<String, Object> map);
  
}