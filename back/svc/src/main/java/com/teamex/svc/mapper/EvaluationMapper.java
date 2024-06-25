package com.teamex.svc.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.teamex.svc.entity.Evaluation;

@Repository
@Mapper
public interface EvaluationMapper {
	
	/**
	* 각 메소드 이름은 EvaluationMapper.xml에서 지정한 메소드 별로 반드시 지어줘야 합니다.
	*/
	
	// ## 평가 조회
	// 평가대상 Report List 조회
	List<Evaluation> selectList(Map<String,Object> map);

	// ## 평가 항목 조회
	// 평가대상 Report List 조회
	List<Evaluation> selectItems(Map<String,Object> map);
		
	// ## 평가 HEAD
	// 평가 Head UPSERT sql문
	Integer upsertEvalHd(Evaluation evaluation);

	// 평가 Head 상태 수정 sql문
	Integer updateEvalHdSts(String div, String reportno, String user_id);

	// 평가 Head 삭제하는 sql문 : 현재 사용 안 함
	Integer deleteEvalHd(String div, String reportno);
	
	// ## 평가 DETAIL
	// 평가 Detail INSERT / UPSERT sql문
	Integer upsertEvalDt(Evaluation evaluation);
	
	// 평가 Detail 수정 sql문
	Integer updateEvalDt(Evaluation evaluation);

}