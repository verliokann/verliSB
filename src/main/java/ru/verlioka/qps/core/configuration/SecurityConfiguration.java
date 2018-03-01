package ru.verlioka.qps.core.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import javax.annotation.Resource;

@Configuration
public class SecurityConfiguration {

    @Configuration
    @EnableWebSecurity
    public static class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

        @Resource(name = "сustomUserDetailsService")
        private UserDetailsService userDetailsService;

        @Resource(name = "authHandler")
        private AuthenticationSuccessHandler authenticationSuccessHandler;
             
        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.csrf().disable().exceptionHandling()

                    .and()
                    .formLogin().loginPage("/login")
                    .loginProcessingUrl("/j_spring_security_check")
                    .usernameParameter("j_username")
                    .passwordParameter("j_password")
                    .successHandler(authenticationSuccessHandler)
                    .failureUrl("/login")

                    .and()
                    .authorizeRequests().antMatchers("/login**", "/logout").permitAll()
                    .antMatchers("/resources/**").hasAnyAuthority("ROLE_ANONYMOUS", "ROLE_ADMIN", "ROLE_EXPERT")
                    .antMatchers("/admin").hasAnyAuthority("ROLE_ADMIN")
                    .antMatchers("/").hasAnyAuthority("ROLE_ADMIN", "ROLE_EXPERT", "ROLE_TEACHER");
        }

        @Override
        protected void configure(AuthenticationManagerBuilder auth)
                throws Exception {
            auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
        }

        @Bean
        public DaoAuthenticationProvider createDaoAuthenticationProvider() {
            DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
            provider.setUserDetailsService(userDetailsService);
            return provider;
        }

        @Bean(name = "authenticationManager")
        @Override
        public AuthenticationManager authenticationManagerBean() throws Exception {
            return super.authenticationManagerBean();
        }

        @Bean
        public BCryptPasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder(10);
        }
        
       
    }
}
