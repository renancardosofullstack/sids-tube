package com.serratec.alterdata.gitvideos.dto;

import com.serratec.alterdata.gitvideos.enums.Role;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Schema(description = "Representação de um usuário retornado pelo sistema")
public class UsuarioDTO {

    @Schema(
            description = "Identificador único do usuário",
            example = "42"
    )
    private Long id;

    @Schema(
            description = "Nome completo do usuário",
            example = "Maria Oliveira"
    )
    private String nome;

    @Schema(
            description = "E-mail do usuário",
            example = "maria.oliveira@empresa.com"
    )
    private String email;

    @Schema(
            description = "Perfil do usuário",
            example = "GESTOR"
    )
    private Role role;

    @Schema(
            description = "Data de criação do usuário",
            example = "2025-01-15T13:24:55"
    )
    private LocalDateTime criadoEm;

    public UsuarioDTO() {}

    public UsuarioDTO(Long id, String nome, String email, Role role, LocalDateTime criadoEm) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.role = role;
        this.criadoEm = criadoEm;
    }

    // GETTERS & SETTERS

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }

    public CharSequence getSenha() {
        // TODO Auto-generated method stub
        return null;
    }
}
