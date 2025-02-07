package com.teamex.svc.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@JsonInclude
public class DBStandard {
	String id;
    String div;
    
    String db_name;
    String db_user;
    String word;
    String word_name;
    String abb_yn;
    String org_word;
    String term;
    String term_name;
    String term_desc;
    String data_type;
    String table_name;
    String table_comments;
    String tablespace_name;
    String column_name;
    String key_yn;
    int    key_position;
    String nullable;
    String default_data;
    String column_desc;
    String column_comments;
    int    column_seq;
    String manual_yn;
    
    String use_yn;
    String create_id;
    String create_date;
    String update_id;
    String update_date;
}