package com.serratec.alterdata.gitvideos.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import io.swagger.v3.oas.annotations.media.Schema;

@Entity
@Table(name = "password_reset_token")
@Schema(description = "Entidade que representa um token de recuperação de senha para um usuário")
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único do token", example = "42")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @Schema(description = "Usuário associado ao token de recuperação")
    private Usuario usuario;

    @Column(nullable = false)
    @Schema(
            description = "Token de recuperação enviado por e-mail",
            example = "e7db98cf-0257-4cd8-bba6-2af4a8361234",
            required = true
    )
    private String token;

    @Column(nullable = false)
    @Schema(
            description = "Data e hora de expiração deste token",
            example = "2025-01-30T15:28:45",
            required = true
    )
    private LocalDateTime expiracao;

    @Schema(
            description = "Indica se o token já expirou",
            example = "false"
    )
    public boolean expirado() {
        return LocalDateTime.now().isAfter(expiracao);
    }

    // GETTERS & SETTERS

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public LocalDateTime getExpiracao() { return expiracao; }
    public void setExpiracao(LocalDateTime expiracao) { this.expiracao = expiracao; }
}
