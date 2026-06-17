package com.serratec.alterdata.gitvideos.model;

import jakarta.persistence.*;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Entity
@Table(name = "visualizacao")
@Schema(description = "Entidade que representa o registro de uma visualização de vídeo por um usuário")
public class Visualizacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único da visualização", example = "300")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @Schema(description = "Usuário que realizou a visualização")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "video_id", nullable = false)
    @Schema(description = "Vídeo visualizado")
    private Video video;

    @Column(name = "data_visualizacao")
    @Schema(
            description = "Data e hora do registro da visualização",
            example = "2025-01-15T11:43:08"
    )
    private LocalDateTime dataVisualizacao = LocalDateTime.now();

    public Visualizacao() {}

    public Visualizacao(Usuario usuario, Video video) {
        this.usuario = usuario;
        this.video = video;
        this.dataVisualizacao = LocalDateTime.now();
    }

    // GETTERS & SETTERS

    public Long getId() { return id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public Video getVideo() { return video; }
    public void setVideo(Video video) { this.video = video; }

    public LocalDateTime getDataVisualizacao() { return dataVisualizacao; }
    public void setDataVisualizacao(LocalDateTime dataVisualizacao) { this.dataVisualizacao = dataVisualizacao; }
}
