package com.serratec.alterdata.gitvideos.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import io.swagger.v3.oas.annotations.media.Schema;

@Entity
@Table(name = "comentario")
@Schema(description = "Entidade que representa um comentário feito em um vídeo")
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único do comentário", example = "55")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "video_id", nullable = false)
    @Schema(description = "Vídeo ao qual o comentário pertence")
    private Video video;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @Schema(description = "Usuário que fez o comentário")
    private Usuario usuario;

    @Column(nullable = false, length = 500)
    @Schema(
        description = "Texto do comentário",
        example = "A explicação ficou muito clara! Obrigado!",
        maxLength = 500
    )
    private String texto;

    @Column(nullable = false)
    @Schema(
        description = "Indica se o comentário é público",
        example = "true",
        defaultValue = "false"
    )
    private Boolean publico = false;

    @Column(name = "criado_em")
    @Schema(
        description = "Data de criação do comentário",
        example = "2025-01-03T14:22:10"
    )
    private LocalDateTime criadoEm = LocalDateTime.now();

    public Comentario() {}

    public Comentario(Video video, Usuario usuario, String texto) {
        this.video = video;
        this.usuario = usuario;
        this.texto = texto;
    }

    // GETTERS & SETTERS

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Video getVideo() { return video; }
    public void setVideo(Video video) { this.video = video; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto = texto; }

    public Boolean getPublico() { return publico; }
    public void setPublico(Boolean publico) { this.publico = publico; }

    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }
}
