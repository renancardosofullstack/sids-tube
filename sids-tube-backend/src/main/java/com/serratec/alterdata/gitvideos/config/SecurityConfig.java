package com.serratec.alterdata.gitvideos.config;

import com.serratec.alterdata.gitvideos.security.JwtAuthenticationFilter;
import com.serratec.alterdata.gitvideos.security.JwtAuthorizationFilter;
import com.serratec.alterdata.gitvideos.security.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public SecurityConfig(
            JwtUtil jwtUtil,
            UserDetailsService userDetailsService
    ) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    // -------------------------------------------------
    // PASSWORD ENCODER
    // -------------------------------------------------
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // -------------------------------------------------
    // AUTHENTICATION MANAGER (FORMA CORRETA)
    // -------------------------------------------------
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }

    // -------------------------------------------------
    // CORS
    // -------------------------------------------------
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOriginPatterns(List.of(
        "http://localhost:5173",
        "http://localhost:3001",
        "https://*.vercel.app",
        "https://sids-tube-8y4kawwa1-renan-cardoso-s-projects.vercel.app"
));

        config.setAllowedMethods(Arrays.asList(
                "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"
        ));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    // -------------------------------------------------
    // SECURITY FILTER CHAIN
    // -------------------------------------------------
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            AuthenticationManager authenticationManager
    ) throws Exception {

        JwtAuthenticationFilter jwtAuthFilter =
                new JwtAuthenticationFilter(authenticationManager, jwtUtil);

        JwtAuthorizationFilter authorizationFilter =
                new JwtAuthorizationFilter(jwtUtil, userDetailsService);

        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth

                        // AUTH
                        .requestMatchers(
                                "/auth/login",
                                "/auth/recuperar-senha",
                                "/auth/resetar-senha",
                                "/auth/reset-password",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**",
                                "/error"
                        ).permitAll()

                        // USUÁRIOS
                        .requestMatchers(HttpMethod.POST, "/usuarios").permitAll()
                        .requestMatchers("/usuarios/**").hasRole("GESTOR")

                        // VÍDEOS
                        .requestMatchers(HttpMethod.GET, "/videos", "/videos/filter").permitAll()
                        .requestMatchers(HttpMethod.POST, "/videos").hasRole("GESTOR")
                        .requestMatchers(HttpMethod.PUT, "/videos/**").hasRole("GESTOR")
                        .requestMatchers(HttpMethod.DELETE, "/videos/**").hasRole("GESTOR")

                        // COMENTÁRIOS
                        .requestMatchers(HttpMethod.GET, "/comentarios/videos/{videoId}").permitAll()
                        .requestMatchers(HttpMethod.POST, "/comentarios/videos/{videoId}").authenticated()
                        .requestMatchers("/comentarios/pendentes").hasRole("GESTOR")
                        .requestMatchers("/comentarios/*/aprovar").hasRole("GESTOR")

                        // INTERAÇÕES
                        .requestMatchers("/curtidas/**").hasAnyRole("ALUNO", "GESTOR")
                        .requestMatchers("/visualizacoes/**").hasAnyRole("ALUNO", "GESTOR")
                        .requestMatchers("/metricas/**").hasAnyRole("ALUNO", "GESTOR")

                        // PERFIL
                        .requestMatchers(HttpMethod.GET, "/auth/me")
                        .hasAnyRole("ALUNO", "GESTOR")

                        .anyRequest().authenticated()
                )
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

        // 🔐 ORDEM CORRETA DOS FILTROS
        http.addFilterAt(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(authorizationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
