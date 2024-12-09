package com.teamex.svc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamex.svc.service.LoginService;

import com.teamex.svc.entity.User;
import com.teamex.svc.entity.Menu;

// 컨트롤러 단
// 현재는 Default API는 
// "/api/login"
@RestController
@RequestMapping("/api/login")
public class LoginController {
	@Autowired
	LoginService loginService;

	//## 로그인처리
	// API : /api/login/do
	// 로그인 처리하는 API
	@PostMapping("/do")
	public User doLogin(@RequestBody User user) {
		String inpuDiv = user.getInputDiv();
		String inputId = user.getInputId();
		String inputPass = user.getInputPass();
		return loginService.doLogin(inpuDiv, inputId, inputPass);
	}

	// API : /api/login/getMenuList
	// 화면 권한 가져오는 API
	@GetMapping("/getMenuList")
	public List<Menu> getMenuList(@RequestParam(name="id", required=true) String id, 
								  @RequestParam(name="div", required=true) String div ) {
		return loginService.getMenuList(id, div);
	}
}