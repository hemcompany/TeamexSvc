package com.teamex.svc;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude=SecurityAutoConfiguration.class)
@MapperScan(value= {"com.teamex.svc.mapper"})
public class SvcApplication {

	public static void main(String[] args) {
		SpringApplication.run(SvcApplication.class, args);
	}

	/*
     * SqlSessionFactory 설정 
     */
	/*
	@Bean
	public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
		final SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
		sessionFactory.setDataSource(dataSource);
		//PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
		Resource configLocation = new PathMatchingResourcePatternResolver().getResource("classpath:mybatis-config.xml");
		
		sessionFactory.setConfigLocation(configLocation);
		//sessionFactory.setMapperLocations(resolver.getResources("classpath:mapper/*.xml"));
		return sessionFactory.getObject();
	}
	*/
    // @Bean : 스프링에 필요한 객체를 생성할 때 사용
    // sessionFactory에 dataSource를 주입하여 Bean으로 사용한다는 의미

}

