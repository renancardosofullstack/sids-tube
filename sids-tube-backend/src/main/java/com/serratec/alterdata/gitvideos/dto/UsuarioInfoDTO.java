package com.serratec.alterdata.gitvideos.dto;

import com.serratec.alterdata.gitvideos.enums.Role;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Informações básicas do usuário autenticado retornadas pelo endpoint /auth/me")
public class UsuarioInfoDTO {

    @Schema(
            description = "Identificador único do usuário",
            example = "10"
    )
    private Long id;

    @Schema(
            description = "Nome completo do usuário",
            example = "Ana Pereira"
    )
    private String nome;

    @Schema(
            description = "E-mail cadastrado do usuário",
            example = "ana.pereira@teste.com"
    )
    private String email;

    @Schema(
            description = "Papel do usuário no sistema",
            example = "ALUNO"
    )
    private Role role;

    public UsuarioInfoDTO(Long id, String nome, String email, Role role) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.role = role;
    }

    // GETTERS

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }
}
