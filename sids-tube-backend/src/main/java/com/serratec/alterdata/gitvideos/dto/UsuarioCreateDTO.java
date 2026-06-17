package com.serratec.alterdata.gitvideos.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "DTO usado para criação de novos usuários no sistema")
public class UsuarioCreateDTO {

    @Schema(
            description = "Nome completo do usuário",
            example = "João da Silva",
            required = true
    )
    private String nome;

    @Schema(
            description = "E-mail do usuário",
            example = "joao.silva@escola.com",
            required = true
    )
    private String email;

    @Schema(
            description = "Senha do usuário",
            example = "senha123",
            minLength = 6,
            required = true
    )
    private String senha;

    // Getters & Setters
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}
