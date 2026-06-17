package com.serratec.alterdata.gitvideos.dto;

import java.time.LocalDateTime;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "DTO de resposta com os dados do vídeo")
public class VideoResponseDTO {

    @Schema(description = "ID do vídeo", example = "10")
    private Long id;

    @Schema(description = "Título do vídeo", example = "Introdução ao Spring Boot")
    private String titulo;

    @Schema(description = "Descrição do vídeo")
    private String descricao;

    @Schema(description = "Categoria do vídeo", example = "Backend")
    private String categoria;

    @Schema(
        description = "URL do vídeo",
        example = "https://www.youtube.com/watch?v=abc123"
    )
    private String urlVideo;

    @Schema(
        description = "URL da thumbnail",
        example = "https://img.youtube.com/vi/abc123/hqdefault.jpg"
    )
    private String urlThumbnail;

    @Schema(
        description = "Notificações habilitadas",
        example = "true"
    )
    private Boolean notificacaoHabilitada;

    @Schema(
        description = "Data e hora de envio do vídeo",
        example = "2025-01-05T16:30:20"
    )
    private LocalDateTime dataEnvio;

    public VideoResponseDTO(
            Long id,
            String titulo,
            String descricao,
            String categoria,
            String urlVideo,
            String urlThumbnail,
            Boolean notificacaoHabilitada,
            LocalDateTime dataEnvio
    ) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.categoria = categoria;
        this.urlVideo = urlVideo;
        this.urlThumbnail = urlThumbnail;
        this.notificacaoHabilitada = notificacaoHabilitada;
        this.dataEnvio = dataEnvio;
    }

    // getters
    public Long getId() { return id; }
    public String getTitulo() { return titulo; }
    public String getDescricao() { return descricao; }
    public String getCategoria() { return categoria; }
    public String getUrlVideo() { return urlVideo; }
    public String getUrlThumbnail() { return urlThumbnail; }
    public Boolean getNotificacaoHabilitada() { return notificacaoHabilitada; }
    public LocalDateTime getDataEnvio() { return dataEnvio; }
}
