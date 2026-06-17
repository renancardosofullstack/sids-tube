package com.serratec.alterdata.gitvideos.model;

import jakarta.persistence.*;
import io.swagger.v3.oas.annotations.media.Schema;

@Entity
@Table(name = "curtida")
@Schema(description = "Entidade que representa uma curtida feita por um usuário em um vídeo")
public class Curtida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único da curtida", example = "120")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @Schema(description = "Usuário que realizou a curtida")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "video_id", nullable = false)
    @Schema(description = "Vídeo que recebeu a curtida")
    private Video video;

    // GETTERS & SETTERS

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public Video getVideo() { return video; }
    public void setVideo(Video video) { this.video = video; }
}
