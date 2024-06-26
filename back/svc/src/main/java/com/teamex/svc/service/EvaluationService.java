package com.teamex.svc.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamex.svc.entity.Evaluation;
import com.teamex.svc.mapper.EvaluationMapper;

@Service
public class EvaluationService {
	@Autowired
	EvaluationMapper evaluationMapper;

	/**
	 * 각 Mapper별의 응답값을 불려오고, 로직을 짤 때는 Controller단이 아닌
	 * Service 단에서 별도의 로직과 알고리즘을 구현 하는 형태로 진행합니다.
	 */

	// ## 평가대상 REPORT 조회
	public List<Evaluation> selectList(String div, String user_id, String user_type, String visit_fr, String visit_to) {
		Map<String,Object>map = new HashMap<String,Object>();
		if(div == null)
			map.put("div", "80");
		else
			map.put("div", div);
		map.put("user_id", user_id);
		map.put("user_type", user_type);    //E : Engineer, O : Operator, P : Parts Management
		map.put("visit_fr", visit_fr);
		map.put("visit_to", visit_to);
		
		if (user_type.equals("") || user_type==null) return null;
		return evaluationMapper.selectList(map);
	}

	// ## 평가 항목 조회
	public List<Evaluation> selectItems(String div, String reportno, String user_id, String user_type) {
		Map<String,Object>map = new HashMap<String,Object>();
		if(div == null)
			map.put("div", "80");
		else
			map.put("div", div);
		map.put("reportno", reportno);
		map.put("user_id", user_id);
		map.put("user_type", user_type);    //E : Engineer, O : Operator, P : Parts Management
		return evaluationMapper.selectItems(map);
	}
	
	// ## 평가 결과 조회
	public Integer saveResult(List<Evaluation> evaluations) {
		int i = 0;
		int cnt = 0;
		for (Evaluation evaluation : evaluations) {
			if (i==0) {
				// Head 저장
				cnt = evaluationMapper.upsertEvalHd(evaluation);
			}
			// Detail 저장
			cnt = evaluationMapper.upsertEvalDt(evaluation);
			i++;
		}
		return cnt;
	}
	
	// 평가 Head Insert/Update 로직
	public Integer upsertEvalHd(Evaluation evaluation) {
		return evaluationMapper.upsertEvalHd(evaluation);
	}

	// 평가 Head 상태 수정 로직
	public Integer updateEvalHdSts(String div, String reportno, String user_id) {
		return evaluationMapper.updateEvalHdSts(div, reportno, user_id);
	}

	// 평가 Head 삭제 로직
	public Integer deleteEvalHd(String div, String reportno) {
		return evaluationMapper.deleteEvalHd(div, reportno);
	}

	// 평가 Detail Insert / Update 로직
	public Integer upsertEvalDt(Evaluation evaluation) {
		return evaluationMapper.upsertEvalDt(evaluation);
	}

	// 평가 Detail Update 로직
	public Integer updateEvalDt(Evaluation evaluation) {
		return evaluationMapper.updateEvalDt(evaluation);
	}
}