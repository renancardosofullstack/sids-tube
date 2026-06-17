package com.serratec.alterdata.gitvideos.dto;

import com.serratec.alterdata.gitvideos.enums.Role;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Resposta enviada após autenticação do usuário")
public class LoginResponseDTO {

    @Schema(
        description = "Token JWT para autenticação",
        example = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbHVub0B0ZXN0ZS5jb20iLCJleHAiOjE3M...",
        required = true
    )
    private String token;

    @Schema(
        description = "ID do usuário",
        example = "12"
    )
    private Long id;

    @Schema(
        description = "Nome completo do usuário",
        example = "João da Silva"
    )
    private String nome;

    @Schema(
        description = "E-mail do usuário",
        example = "aluno@teste.com"
    )
    private String email;

    @Schema(
        description = "Perfil do usuário no sistema",
        example = "ALUNO"
    )
    private Role role;

    public LoginResponseDTO(String token, Long id, String nome, String email, Role role) {
        this.token = token;
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.role = role;
    }

    // Getters
    public String getToken() { return token; }
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }
}
