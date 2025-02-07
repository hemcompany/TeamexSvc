package com.teamex.svc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamex.svc.entity.DBStandard;
import com.teamex.svc.service.DBStandardService;

// "/api/db"
@RestController
@RequestMapping("/api/db")
public class DBStandardController {
    @Autowired
    DBStandardService dbStandardService;

    //## Retrieve Word List
    // API : /api/db/select/wordList
    @GetMapping("/select/wordList")
    public List<DBStandard> selectWordList(@RequestParam(name="db_name") String db_name,
                                           @RequestParam(name="db_user") String db_user,
                                           @RequestParam(name="word") String word,
                                           @RequestParam(name="word_name") String word_name) {
        return dbStandardService.selectWordList(db_name, db_user, word, word_name);
    }

    //## Retrieve Term list
    // API : /api/db/select/termList
    @GetMapping("/select/termList")
    public List<DBStandard> selectTermList(@RequestParam(name="db_name") String db_name,
                                           @RequestParam(name="db_user") String db_user,
                                           @RequestParam(name="term") String term,
                                           @RequestParam(name="term_name") String term_name) {
        return dbStandardService.selectTermList(db_name, db_user, term, term_name);
    }

    //## Retrieve Table List
    // API : /api/db/select/tableList
    @GetMapping("/select/tableList")
    public List<DBStandard> selectTableList(@RequestParam(name="db_name") String db_name,
                                            @RequestParam(name="db_user") String db_user,
                                            @RequestParam(name="table_name") String table_name,
                                            @RequestParam(name="table_comments") String table_comments) {
        return dbStandardService.selectTableList(db_name, db_user, table_name, table_comments);
    }
    
    //## Retrieve Table Head
    // API : /api/db/select/tableHead
    @GetMapping("/select/tableHead")
    public DBStandard selectTableHead(@RequestParam(name="db_name") String db_name,
                                        @RequestParam(name="db_user") String db_user,
                                        @RequestParam(name="table_name") String table_name) {
        return dbStandardService.selectTableHead(db_name, db_user, table_name);
    }
    
    //## Retrieve Table Detail
    // API : /api/db/select/tableDetail
    @GetMapping("/select/tableDetail")
    public List<DBStandard> selectTableDetail(@RequestParam(name="db_name") String db_name,
                                              @RequestParam(name="db_user") String db_user,
                                              @RequestParam(name="table_name") String table_name) {
        return dbStandardService.selectTableDetail(db_name, db_user, table_name);
    }

    //## INSERT/UPDATE Word 
    // API : /api/db/upsert/word
    @PostMapping("/upsert/word")
    public Integer upsertWord(@RequestBody DBStandard dbStandard) {
        return dbStandardService.upsertWord(dbStandard);
    }

    //## INSERT/UPDATE Term
    // API : /api/db/upsert/term
    @PostMapping("/upsert/term")
    public Integer upsertTerm(@RequestBody DBStandard dbStandard) {
        return dbStandardService.upsertTerm(dbStandard);
    }
    
    //## INSERT/UPDATE Table Head 
    // API : /api/db/upsert/tableHead
    @PostMapping("/upsert/tableHead")
    public Integer upsertTableHead(@RequestBody DBStandard dbStandard) {
        return dbStandardService.upsertTableHead(dbStandard);
    }
    
    //## INSERT/UPDATE Table Detail 
    // API : /api/db/upsert/tableDetail
    @PostMapping("/upsert/tableDetail")
    public Integer upsertTableDetail(@RequestBody DBStandard dbStandard) {
        return dbStandardService.upsertTableDetail(dbStandard);
    }
    
    //## DELETE Word
    // API : /api/db/delete/word
    @PostMapping("/delete/word")
    public Integer deleteWord(@RequestBody DBStandard dbStandard) {
        return dbStandardService.deleteWord(dbStandard.getDb_name(), dbStandard.getDb_user(), dbStandard.getWord());
    }
    
    //## DELETE Term
    // API : /api/db/delete/term
    @PostMapping("/delete/term")
    public Integer deleteTerm(@RequestBody DBStandard dbStandard) {
        return dbStandardService.deleteTerm(dbStandard.getDb_name(), dbStandard.getDb_user(), dbStandard.getTerm());
    }
    
    //## DELETE Table Head  
    // API : /api/db/delete/tableHead
    @PostMapping("/delete/tableHead")
    public Integer deleteTableHead(@RequestBody DBStandard dbStandard) {
        return dbStandardService.deleteTableHead(dbStandard.getDb_name(), dbStandard.getDb_user(), dbStandard.getTable_name());
    }

    //## DELETE Table Detail  
    // API : /api/db/delete/tableDetail
    @PostMapping("/delete/tablDetail")
    public Integer deleteTableDetail(@RequestBody DBStandard dbStandard) {
        return dbStandardService.deleteTableDetail(dbStandard.getDb_name(), dbStandard.getDb_user(), dbStandard.getTable_name(), dbStandard.getColumn_name());
    }

}