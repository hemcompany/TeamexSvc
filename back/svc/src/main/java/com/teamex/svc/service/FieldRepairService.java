package com.teamex.svc.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FilenameFilter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamex.svc.config.FileServerProperties;
import com.teamex.svc.entity.FieldRepair;
import com.teamex.svc.entity.FieldRepair_d;
import com.teamex.svc.entity.FieldRepair_fw;
import com.teamex.svc.entity.FieldRepair_img;
import com.teamex.svc.mapper.FieldRepairMapper;

@Service
public class FieldRepairService {
  @Autowired
  FieldRepairMapper fieldRepairMapper;
  @Autowired
  FileServerProperties fileServerProperties;

  /**
   * 각 Mapper별의 응답값을 불려오고, 앞으로의 로직을 짤 때는 Controller단이 아닌
   * Service 단에서 별도의 로직과 알고리즘을 구현 하는 형태로 진행합니다.
   */

  //## List
  // 전체 조회 로직
  public List<FieldRepair> selectList(String div, String visit_fr, String visit_to) {
	Map<String,Object>map = new HashMap<String,Object>();
	if(div == null)
		map.put("div", "80");
	else
		map.put("div", div);
	map.put("visit_fr", visit_fr);	//yyyy-mm-dd
	map.put("visit_to", visit_to);
    return fieldRepairMapper.selectList(map);
  }

  // 게시물 삽입 로직
  public Integer insertFieldRepair(String div, String reportno, String report_sts) {
    return fieldRepairMapper.insertFieldRepair(div, reportno, report_sts);
  }

  // 게시물 수정 로직
  public Integer updateFieldRepair(FieldRepair fieldRepair) {
    return fieldRepairMapper.updateFieldRepair(fieldRepair);
  }

  // 게시물 삭제 로직
  public Integer deleteFieldRepair(String div, String reportno) {
    return fieldRepairMapper.deleteFieldRepair(div, reportno);
  }
  
  // ## REPORT
  // Basic Info 조회
  public FieldRepair select_r_basic(String div, String reportno) {
      Map<String,Object>map = new HashMap<String,Object>();
		if(div == null)
			map.put("div", "80");
		else
			map.put("div", div);
		if(reportno == null)
			reportno = "";
		map.put("reportno", reportno);
    return fieldRepairMapper.select_r_basic(map);
  }
  // Detail Info 조회
  public  List<FieldRepair_d> select_r_detail(String div, String reportno) {
	  Map<String,Object>map = new HashMap<String,Object>();
		if(div == null)
			map.put("div", "80");
		else
			map.put("div", div);
		if(reportno == null)
			reportno = "";
		map.put("reportno", reportno);
		
    return fieldRepairMapper.select_r_detail(map); 
  }
  
  // Future Work 조회
  public  List<FieldRepair_fw> select_r_fw(String div, String reportno) {
	  Map<String,Object>map = new HashMap<String,Object>();
		if(div == null)
			map.put("div", "80");
		else
			map.put("div", div);
		if(reportno == null)
			reportno = "";
		map.put("reportno", reportno);
    return fieldRepairMapper.select_r_fw(map);
  }
  // IMAGE 조회 (DB 사용 할 때)
  public  List<FieldRepair_img> select_r_img(String div, String reportno) {
	  Map<String,Object>map = new HashMap<String,Object>();
		if(div == null)
			map.put("div", "80");
		else
			map.put("div", div);
		if(reportno == null)
			reportno = "";
		map.put("reportno", reportno);
    return fieldRepairMapper.select_r_img(map);
  }
  // IMAGE 조회 (FOLDER 내에서 파일명으로 조회 할 때)
  public List<FieldRepair_img> select_r_fdimg(String div, String reportno) {
	  Map<String,Object>map = new HashMap<String,Object>();
		if(div == null)
			map.put("div", "80");
		else
			map.put("div", div);
		if(reportno == null)
			reportno = "";
		map.put("reportno", reportno);
		
		String report =reportno; // reportno 가 밑에 함수에서 사용되면 에러 나서 변수 새로 할당
		String yyyymm = reportno.substring(2,6);
		String filePath = new String (fileServerProperties.getImgFilePath());
		filePath = filePath + reportno.substring(2,6) + "/";  // ex ) 2404
		FilenameFilter filter = new FilenameFilter() {
			public boolean accept(File f, String name) {
				//파일 이름에 reportno 가 붙은것들만 필터링
				return name.contains(report);
			}
		};
		
		List<FieldRepair_img> imgList = new ArrayList<>();
		String[] filenames = new String[]{};
		try {
			File dirFile = new File(filePath);
			filenames = dirFile.list(filter);
		}catch (Exception e) {
			e.printStackTrace();
		}
		if (filenames != null ) {
			int seq = 1;
			for (String filename : filenames) {
				FieldRepair_img imgInfo = new FieldRepair_img();
				imgInfo.setDiv(div);
				imgInfo.setReportno(reportno);
				imgInfo.setImg_seq(seq);
				imgInfo.setImg_nm(filename);
				imgInfo.setImg_path(filePath);
				System.out.println("filename : " + filename);
				imgList.add(imgInfo);
				seq ++;
			}
		}
		return imgList;
  }
}