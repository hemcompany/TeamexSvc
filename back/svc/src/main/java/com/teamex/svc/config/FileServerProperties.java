package com.teamex.svc.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Setter
@Getter
@Configuration
@ConfigurationProperties(prefix = "local-server")
public class FileServerProperties {
    /**
     *  로컬 이미지 파일 저장되는 폴더 경로를 가져온다. 
     */
    private String imgFilePath;  
}