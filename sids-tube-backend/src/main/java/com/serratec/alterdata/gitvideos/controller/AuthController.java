package com.serratec.alterdata.gitvideos.controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.serratec.alterdata.gitvideos.dto.LoginRequestDTO;
import com.serratec.alterdata.gitvideos.dto.LoginResponseDTO;
import com.serratec.alterdata.gitvideos.dto.UsuarioInfoDTO;
import com.serratec.alterdata.gitvideos.model.Usuario;
import com.serratec.alterdata.gitvideos.repository.UsuarioRepository;
import com.serratec.alterdata.gitvideos.security.JwtUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/auth")
@Tag(name = "Autenticação", description = "Endpoints para login e informações do usuário autenticado")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtUtil jwtUtil,
                          UsuarioRepository usuarioRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.usuarioRepository = usuarioRepository;
    }

    // ==========================================================
    // LOGIN
    // ==========================================================

    @Operation(
        summary = "Login do usuário",
        description = "Autentica via email e senha. Retorna token JWT + informações completas do usuário."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Login realizado com sucesso"),
        @ApiResponse(responseCode = "401", description = "Credenciais inválidas")
    })
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO body) {

        // 1) Autentica
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        body.email(),
                        body.senha()
                )
        );

        // 2) Gera o token JWT
        String token = jwtUtil.generateToken(authentication.getName());

        // 3) Recupera o usuário completo do banco
        String email = authentication.getName();

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // 4) Monta o DTO de resposta
        LoginResponseDTO response = new LoginResponseDTO(
                token,
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getRole()
        );

        // 5) Retorna a resposta
        return ResponseEntity.ok(response);
    }

    // ==========================================================
    // GET ME
    // ==========================================================

    @Operation(
        summary = "Dados do usuário autenticado",
        description = "Retorna as informações do usuário logado usando o token JWT enviado no header."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Dados retornados com sucesso"),
        @ApiResponse(responseCode = "401", description = "Token inválido ou expirado")
    })
    @GetMapping("/me")
    public ResponseEntity<UsuarioInfoDTO> getMe(@AuthenticationPrincipal UserDetails user) {

        // Recupera o usuário pelo e-mail extraído do token
        Usuario usuario = usuarioRepository.findByEmail(user.getUsername())
                .orElseThrow();

        UsuarioInfoDTO dto = new UsuarioInfoDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getRole()
        );

        return ResponseEntity.ok(dto);
    }
}
