package com.teamex.svc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamex.svc.entity.FieldRepair;
import com.teamex.svc.entity.FieldRepair_d;
import com.teamex.svc.entity.FieldRepair_fw;
import com.teamex.svc.entity.FieldRepair_img;
import com.teamex.svc.service.FieldRepairService;

// 컨트롤러 단
// 현재는 Default API는 
// "/api/fieldRepair"
@RestController
@RequestMapping("/api/fieldRepair")
public class FieldRepairController {
  @Autowired
  FieldRepairService fieldRepairService;

  //## LIST
  // API : /api/fieldRepair/select/list
  // 전체 조회를 이용한 API 기능
  @GetMapping("/select/list")
  public List<FieldRepair> selectList(@RequestParam(name="div", required=true) String div, 
		  								@RequestParam(name="visit_fr") String visit_fr, 
		  								@RequestParam(name="visit_to") String visit_to) {
    return fieldRepairService.selectList(div, visit_fr, visit_to);
  }

  // API : /api/fieldRepair/insert/fieldRepair
  // 게시판 삽입을 이용한 API 기능
  @PostMapping("/insert/fieldRepair")
  public Integer insertFieldRepair(@RequestBody FieldRepair fieldRepair) {
    System.out.println(fieldRepair.toString());
    return fieldRepairService.insertFieldRepair(fieldRepair.getDiv(), fieldRepair.getReportno(), fieldRepair.getReport_sts());
  }

  // API : /api/fieldRepair/update/fieldRepair
  // 게시판 수정을 이용한 API 기능
  @PostMapping("/update/fieldRepair")
  public Integer updateFieldRepair(@RequestBody FieldRepair fieldRepair) {
    System.out.println("수정");
    System.out.println(fieldRepair.toString());
    return fieldRepairService.updateFieldRepair(fieldRepair);
  }

  // API : /api/fieldRepair/delete/fieldRepair
  // 게시판 삭제를 이용한 API 기능
  @PostMapping("/delete/fieldRepair")
  public Integer deleteFieldRepair(@RequestBody FieldRepair fieldRepair) {
    return fieldRepairService.deleteFieldRepair(fieldRepair.getDiv(), fieldRepair.getReportno());
  }
  
  //## REPORT
  // API : /api/fieldRepair/select/r_basic
  // Basic Info 조회용 API
  @GetMapping("/select/r_basic")
  @CrossOrigin(origins = {"http://localhost:3000", "http://localhost"})
  public FieldRepair select_r_basic(@RequestParam(name="div", required=true) String div, 
                                    @RequestParam(name="reportno", required=true) String reportno) {
    return fieldRepairService.select_r_basic(div, reportno);
  }
  
  // API : /api/fieldRepair/select/r_detail
  // Detail Info 조회용 API
  @GetMapping("/select/r_detail")
  @CrossOrigin(origins = {"http://localhost:3000", "http://localhost"})
  public  List<FieldRepair_d> select_r_detail(@RequestParam(name="div", required=true) String div, 
                                     @RequestParam(name="reportno", required=true) String reportno) {
    return fieldRepairService.select_r_detail(div, reportno);
  }

  //API : /api/fieldRepair/select/r_fw
  // Future Work 조회용 API
  @GetMapping("/select/r_fw")
  @CrossOrigin(origins = {"http://localhost:3000", "http://localhost"})
  public  List<FieldRepair_fw> select_r_fw(@RequestParam(name="div") String div, 
                                 @RequestParam(name="reportno", required=true) String reportno) {
    return fieldRepairService.select_r_fw(div, reportno);
  }
  //API : /api/fieldRepair/select/r_img
  // IMAGE 조회용 API
  @GetMapping("/select/r_img")
  @CrossOrigin(origins = {"http://localhost:3000", "http://localhost"})
  public  List<FieldRepair_img> select_r_img(@RequestParam(name="div") String div, 
                                 @RequestParam(name="reportno", required=true) String reportno) {
    return fieldRepairService.select_r_img(div, reportno);
  }
  
  //API : /api/fieldRepair/select/r_fdImg
  // IMAGE 조회용 API
  @GetMapping("/select/r_fdImg")
  @CrossOrigin(origins = {"http://localhost:3000", "http://localhost"})
  public List<FieldRepair_img> select_r_fdImg(@RequestParam(name="div") String div, 
                                 @RequestParam(name="reportno", required=true) String reportno) {
    return fieldRepairService.select_r_fdimg(div, reportno);
  }
}