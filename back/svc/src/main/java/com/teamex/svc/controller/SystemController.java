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

import com.teamex.svc.entity.Menu;
import com.teamex.svc.service.SystemService;

// "/api/system"
@RestController
@RequestMapping("/api/system")
public class SystemController {
    @Autowired
    SystemService systemService;

    //## Retrieve Menu Master
    // API : /api/system/select/menuList
    @GetMapping("/select/menuList")
    public List<Menu> selectMenuList(@RequestParam(name="program_id") String program_id,
                                 @RequestParam(name="menu_name") String menu_name) {
        return systemService.selectMenuList(program_id, menu_name);
    }

    //## Retrieve menu list per authority group
    // API : /api/system/select/authMenuList
    @GetMapping("/select/authMenuList")
    public List<Menu> selectAuthMenuList(@RequestParam(name="auth_group") String auth_group,
                                     @RequestParam(name="program_id") String program_id,
                                     @RequestParam(name="menu_id") String menu_id) {
        return systemService.selectAuthMenuList(auth_group, program_id, menu_id);
    }

    //## Retrieve authority group  per user_id
    // API : /api/system/select/userAuth
    @GetMapping("/select/userAuth")
    public List<Menu> selectUserAuth(@RequestParam(name="user_id") String user_id,
                                     @RequestParam(name="div") String div,
                                     @RequestParam(name="auth_group") String auth_group) {
        return systemService.selectUserAuth(user_id, div, auth_group);
    }

    //## INSERT/UPDATE Menu Master 
    // API : /api/system/upsert/menu
    @PostMapping("/upsert/menu")
    public Integer upsertMenu(@RequestBody Menu menu) {
        return systemService.upsertMenu(menu);
    }

    //## INSERT/UPDATE Menu list per authority group 
    // API : /api/system/upsert/authMenu
    @PostMapping("/upsert/authMenu")
    public Integer upsertAuthMenu(@RequestBody Menu menu) {
        return systemService.upsertAuthMenu(menu);
    }
    
    //## INSERT/UPDATE authority group  per user_id 
    // API : /api/system/upsert/userAuth
    @PostMapping("/upsert/userAuth")
    public Integer upsertUserAuth(@RequestBody Menu menu) {
        return systemService.upsertUserAuth(menu);
    }
    
    //## DELETE Menu Master 
    // API : /api/system/delete/menu
    @PostMapping("/delete/menu")
    public Integer deleteMenu(@RequestBody Menu menu) {
        return systemService.deleteMenu(menu.getProgram_id(), menu.getMenu_id());
    }
    
    //## DELETE Menu list per authority group
    // API : /api/system/delete/authMenu
    @PostMapping("/delete/authMenu")
    public Integer deleteAuthMenu(@RequestBody Menu menu) {
        return systemService.deleteAuthMenu(menu.getAuth_group(), menu.getProgram_id(), menu.getMenu_id());
    }
    
    //## DELETE authority group  per user_id  
    // API : /api/system/delete/userAuth
    @PostMapping("/delete/userAuth")
    public Integer deleteUserAuth(@RequestBody Menu menu) {
        return systemService.deleteUserAuth(menu.getUser_id(), menu.getDiv(), menu.getAuth_group());
    }

}