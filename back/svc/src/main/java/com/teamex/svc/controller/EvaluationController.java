package com.teamex.svc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamex.svc.entity.Evaluation;
import com.teamex.svc.service.EvaluationService;

// 컨트롤러 단
// 현재는 Default API는 
// "/api/evaluation"
@RestController
@RequestMapping("/api/evaluation")
public class EvaluationController {
  @Autowired
  EvaluationService evaluationService;

  //## 평가대상 REPORT 조회
  // API : /api/evaluation/select/list
  @GetMapping("/select/list")
  ///@CrossOrigin(origins = {"http://localhost:3000", "http://localhost", "http://rpt.teamexusa.com"}) WebConfig에서 적용
  public List<Evaluation> selectList(@RequestParam(name="div", required=true) String div, 
		  							@RequestParam(name="user_id") String user_id, 
		  							@RequestParam(name="user_type") String user_type,
		  							@RequestParam(name="visit_fr") String visit_fr, 
	  								@RequestParam(name="visit_to") String visit_to) {
    return evaluationService.selectList(div, user_id, user_type, visit_fr, visit_to);
  }

  //## 평가 항목 LIST 조회
  // API : /api/evaluation/item/list
  @GetMapping("/item/list")
  public List<Evaluation> selectItems(@RequestParam(name="div", required=true) String div, 
		  							@RequestParam(name="reportno") String reportno,
		  							@RequestParam(name="user_id") String user_id,
		  							@RequestParam(name="user_type") String user_type) {
	  return evaluationService.selectItems(div, reportno, user_id, user_type);
  }
  //## 평가 결과 저장
  @PostMapping("/save/result")
  public ResponseEntity<String> saveResult(@RequestBody List<Evaluation> evaluations) {
	  try {
		  int i = evaluationService.saveResult(evaluations);
		  return ResponseEntity.status(201).body("Data saved successfully");
	  } catch (Exception e) {
		  return ResponseEntity.status(500).body("Error saving data: " + e.getMessage());
	  } 
  }

  //## 평가 HEAD INSERT/UPDATE
  // API : /api/evaluation/upsert/evalHd
  @PostMapping("/upsert/evalHd")
  public Integer upsertEvalHd(@RequestBody Evaluation evaluation) {
    return evaluationService.upsertEvalHd(evaluation);
  }

  //## 평가 HEAD 상태 UPDATE
  // API : /api/evaluation/update/evalHdSts
  @PostMapping("/update/evalHdSts")
  public Integer updateEvalHdSts(@RequestBody Evaluation evaluation) {
    return evaluationService.updateEvalHdSts(evaluation.getDiv(), evaluation.getReportno(), evaluation.getUser_id());
  }

  //## 평가 HEAD DELETE
  // API : /api/evaluation/delete/evalHd
  @PostMapping("/delete/evalHd")
  public Integer deleteEvalHd(@RequestBody Evaluation evaluation) {
    return evaluationService.deleteEvalHd(evaluation.getDiv(), evaluation.getReportno());
  }
  
  //## 평가 DETAIL INSERT / UPDATE
  // API : /api/evaluation/upsert/evalDt
  @PostMapping("/upsert/evalDt")
  public Integer insertEvalDt(@RequestBody Evaluation evaluation) {
    return evaluationService.upsertEvalDt(evaluation);
  }  
  
  //## 평가 DETAIL UPDATE
  // API : /api/evaluation/update/evalDt
  @PostMapping("/update/evalDt")
  public Integer updateEvalDt(@RequestBody Evaluation evaluation) {
    return evaluationService.updateEvalDt(evaluation);
  }

}