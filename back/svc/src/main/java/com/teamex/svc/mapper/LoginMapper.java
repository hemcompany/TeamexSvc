package com.teamex.svc.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.teamex.svc.entity.User;

@Repository
@Mapper
public interface LoginMapper {
  /**
   * 각 메소드 이름은 LoginMapper.xml에서 지정한 메소드 별로 반드시 지어줘야 합니다.
   */
  // ## LOGIN 처리
  // ID 일치 여부 확인
  User checkId(Map<String,Object> map);

  // ID, PASS 일치 시 사용자 정보 조회 
  User select_user_info(Map<String, Object> map);
}