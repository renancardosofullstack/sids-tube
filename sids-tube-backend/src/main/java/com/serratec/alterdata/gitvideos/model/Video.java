package com.serratec.alterdata.gitvideos.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Entity
@Table(name = "video")
@Schema(description = "Entidade que representa um vídeo no sistema")
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único do vídeo", example = "101")
    private Long id;

    @NotBlank
    @Schema(description = "Título do vídeo", example = "Introdução ao Spring Boot", required = true)
    private String titulo;

    @Schema(description = "Descrição do conteúdo do vídeo", example = "Explicação detalhada sobre API REST com Spring")
    private String descricao;

    @Schema(description = "Categoria do vídeo", example = "Backend")
    private String categoria;

    @NotBlank
    @Column(name = "link")
    @Schema(
            description = "URL do vídeo hospedado",
            example = "https://youtu.be/abc123",
            required = true
    )
    private String urlVideo;

    @Column(name = "url_thumbnail")
    @Schema(
            description = "Endereço da imagem de miniatura do vídeo",
            example = "https://img.youtube.com/vi/abc123/hqdefault.jpg"
    )
    private String urlThumbnail;

    @Column(name = "data_envio")
    @Schema(
            description = "Data e hora de envio do vídeo",
            example = "2025-01-05T16:30:20"
    )
    private LocalDateTime dataEnvio;

    @Column(name = "notificacao_habilitada")
    @Schema(
            description = "Indica se as notificações estão habilitadas para este vídeo",
            example = "true",
            defaultValue = "false"
    )
    private Boolean notificacaoHabilitada;

    @PrePersist
    public void prePersist() {
        this.dataEnvio = LocalDateTime.now();
    }

    // GETTERS & SETTERS

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getUrlVideo() { return urlVideo; }
    public void setUrlVideo(String urlVideo) { this.urlVideo = urlVideo; }

    public String getUrlThumbnail() { return urlThumbnail; }
    public void setUrlThumbnail(String urlThumbnail) { this.urlThumbnail = urlThumbnail; }

    public LocalDateTime getDataEnvio() { return dataEnvio; }
    public void setDataEnvio(LocalDateTime dataEnvio) { this.dataEnvio = dataEnvio; }

    public Boolean getNotificacaoHabilitada() { return notificacaoHabilitada; }
    public void setNotificacaoHabilitada(Boolean notificacaoHabilitada) { this.notificacaoHabilitada = notificacaoHabilitada; }
}
