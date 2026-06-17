package com.serratec.alterdata.gitvideos.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Set;

public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    // Rotas públicas liberadas SEM token
    private static final Set<String> PUBLIC_ROUTES = Set.of(
            "/auth/login",
            "/auth/recuperar-senha",
            "/auth/resetar-senha"
    );

    public JwtAuthorizationFilter(JwtUtil jwtUtil,
                                  UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        // ==== 1) Libera rotas públicas sem token ====
        if (isPublicRoute(path) || isSwaggerRoute(path)) {
            chain.doFilter(request, response);
            return;
        }

        // ==== 2) Extrai token do header ====
        String token = jwtUtil.getTokenFromRequest(request);

        if (token != null && jwtUtil.isValidToken(token)) {

            String username = jwtUtil.getUsernameFromToken(token);

            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            // 🔥 LOGS PARA DEBUG – ESSENCIAIS PARA O 403
            System.out.println("==============================================");
            System.out.println("[JWT] Usuário autenticado   : " + username);
            System.out.println("[JWT] Autoridades do usuário: " + userDetails.getAuthorities());
            System.out.println("[JWT] Rota acessada         : " + path);
            System.out.println("[JWT] Método HTTP           : " + request.getMethod());
            System.out.println("==============================================");

            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        // ==== 3) Continua cadeia ====
        chain.doFilter(request, response);
    }

    // Helper para rotas públicas simples
    private boolean isPublicRoute(String path) {
        return PUBLIC_ROUTES.contains(path);
    }

    // Helper para rotas do swagger
    private boolean isSwaggerRoute(String path) {
        return path.startsWith("/swagger") || path.startsWith("/v3/api-docs");
    }
}
