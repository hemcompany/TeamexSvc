package com.teamex.svc.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@JsonInclude
public class Menu {
    //Menu authority list
    String user_id;
    String div;
    String program_id;
    String menu_id;
    String menu_name;
    int    lvl;
    String parent_menu;
    String window_yn;
    String window_name;
    String auth_retrieve;
    String auth_update;
    String auth_confirm;
    String auth_etc_1;
    String auth_etc_2;
    String auth_etc_3;
    int    sort;
    
    String auth_group;
    String create_id;
    String create_date;
    String update_id;
    String update_date;
}