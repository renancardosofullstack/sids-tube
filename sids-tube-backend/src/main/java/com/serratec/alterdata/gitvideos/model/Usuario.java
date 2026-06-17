package com.serratec.alterdata.gitvideos.model;

import com.serratec.alterdata.gitvideos.enums.Role;
import jakarta.persistence.*;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Entity
@Table(name = "usuario")
@Schema(description = "Entidade que representa um usuário cadastrado no sistema")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único do usuário", example = "15")
    private Long id;

    @Schema(description = "Nome completo do usuário", example = "João da Silva")
    private String nome;

    @Column(unique = true)
    @Schema(
            description = "Endereço de e-mail do usuário",
            example = "joao.silva@empresa.com",
            required = true
    )
    private String email;

    @Column(name = "senha_hash")
    @Schema(
            description = "Senha criptografada (não exibida no Swagger)",
            example = "$2a$10$pqIUcyW..",
            accessMode = Schema.AccessMode.WRITE_ONLY
    )
    private String senhaHash;

    @Enumerated(EnumType.STRING)
    @Schema(
            description = "Papel/Perfil do usuário dentro da aplicação",
            example = "GESTOR"
    )
    private Role role;

    @Column(name = "criado_em")
    @Schema(
            description = "Data de criação do usuário",
            example = "2025-01-03T14:22:10"
    )
    private LocalDateTime criadoEm;

    @PrePersist
    public void prePersist() {
        this.criadoEm = LocalDateTime.now();
    }

    // GETTERS & SETTERS

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenhaHash() { return senhaHash; }
    public void setSenhaHash(String senhaHash) { this.senhaHash = senhaHash; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }
}
