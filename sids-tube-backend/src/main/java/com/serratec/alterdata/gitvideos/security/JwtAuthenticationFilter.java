package com.serratec.alterdata.gitvideos.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.serratec.alterdata.gitvideos.dto.LoginRequestDTO;
import com.serratec.alterdata.gitvideos.dto.LoginResponseDTO;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

/**
 * Filtro responsável pela autenticação:
 * - Lê email/senha do request
 * - Autentica via AuthenticationManager
 * - Gera JWT se sucesso
 * - Retorna JSON com token + dados do usuário
 */
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager,
                                   JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;

        // Define endpoint do login
        setFilterProcessesUrl("/auth/login");
    }

    /**
     * Lê as credenciais do corpo da requisição e delega autenticação
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response)
            throws AuthenticationException {
        try {
            // Converte JSON recebido em DTO
            LoginRequestDTO login = new ObjectMapper()
                    .readValue(request.getInputStream(), LoginRequestDTO.class);

            // Cria token de autenticação
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                            login.email(),
                            login.senha()
                    );

            // Delegado ao AuthenticationManager
            return authenticationManager.authenticate(authToken);

        } catch (IOException e) {
            throw new RuntimeException("Erro ao ler credenciais login", e);
        }
    }

    /**
     * Usuário autenticado com sucesso → gera token e responde JSON
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult)
            throws IOException, ServletException {

        UserDetailsImpl user = (UserDetailsImpl) authResult.getPrincipal();

        String token = jwtUtil.generateToken(user.getUsername());

        LoginResponseDTO dto = new LoginResponseDTO(
                token,
                user.getId(),
                user.getNome(),
                user.getEmail(),
                user.getRole()
        );

        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");

        new ObjectMapper().writeValue(response.getWriter(), dto);
    }

    /**
     * Autenticação falhou → 401 com JSON
     */
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
                                              HttpServletResponse response,
                                              AuthenticationException failed)
            throws IOException, ServletException {

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");

        response.getWriter().write(
                "{\"error\":\"Usuário ou senha inválidos\"}"
        );
    }
}
