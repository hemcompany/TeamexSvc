package com.teamex.svc.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.teamex.svc.entity.FieldRepair;
import com.teamex.svc.entity.FieldRepair_d;
import com.teamex.svc.entity.FieldRepair_fw;
import com.teamex.svc.entity.FieldRepair_img;

@Repository
@Mapper
public interface FieldRepairMapper {
  /**
   * 각 메소드 이름은 FieldRepairMapper.xml에서 지정한 메소드 별로 반드시 지어줘야 합니다.
   */
  // ## LIST
  // 전체 파라미터 조회 관련 게시글
  List<FieldRepair> selectList(Map<String,Object> map);

  // 생성 sql문
  Integer insertFieldRepair(String div, String reportno, String report_sts);

  // 현재 내용 수정 sql문
  Integer updateFieldRepair(FieldRepair fieldRepair);

  // 현재 내용을 삭제하는 sql문
  Integer deleteFieldRepair(String div, String reportno);
  
  // ## REPORT
  //Basic Info 조회 
  FieldRepair select_r_basic(Map<String, Object> map);
  
  //Detail Info 조회
  List<FieldRepair_d> select_r_detail(Map<String, Object> map);
  
  //Future work 조회
  List<FieldRepair_fw> select_r_fw(Map<String,Object> map);
  
  //IMAGE 조회 (DB 사용할 때)
  List<FieldRepair_img> select_r_img(Map<String,Object> map);
}