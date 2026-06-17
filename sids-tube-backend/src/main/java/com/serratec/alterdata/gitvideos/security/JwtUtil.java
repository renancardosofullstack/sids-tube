package com.serratec.alterdata.gitvideos.security;

import jakarta.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    // 👉 Chave secreta com tamanho mínimo de 32 caracteres
    private static final String SECRET_KEY = "uma_chave_muito_grande_e_segura_1234567890";

    // Cria chave HS256 baseada no SECRET
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // Gera token usando apenas o e-mail
    public String generateToken(String username) {
        return generateToken(username, username);
    }

    // Gera token com claims personalizadas
    public String generateToken(String username, String nomeUsuario) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("name", nomeUsuario);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username) // email
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hora
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Extrai todas as Claims do token
    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Extrai e-mail do token
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // Extrai nome customizado
    public String extractName(String token) {
        Object name = extractClaims(token).get("name");
        return name != null ? name.toString() : null;
    }

    // Verifica expiração
    private boolean isTokenExpired(String token) {
        return extractClaims(token)
                .getExpiration()
                .before(new Date());
    }

    // Verifica validade final
    public boolean isTokenValid(String token, String username) {
        final String tokenUsername = extractUsername(token);
        return username.equals(tokenUsername) && !isTokenExpired(token);
    }

    // 🔥 NOVO MÉTODO – Extrai token do header HTTP
    public String getTokenFromRequest(HttpServletRequest request) {

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7); // remove "Bearer "
        }

        return null;
    }
 // Verifica se o token é válido (sem precisar do username)
    public boolean isValidToken(String token) {
        try {
            return !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    // Extrai apenas o username (atalho)
    public String getUsernameFromToken(String token) {
        return extractUsername(token);
    }

}
