package com.serratec.alterdata.gitvideos.dto;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "DTO para criação ou atualização de um vídeo")
public class VideoRequestDTO {

    @NotBlank
    @Schema(
        description = "Título do vídeo",
        example = "Introdução ao Spring Boot",
        required = true
    )
    private String titulo;

    @Schema(
        description = "Descrição detalhada do conteúdo do vídeo",
        example = "Neste vídeo explicamos os conceitos básicos do Spring Boot"
    )
    private String descricao;

    @Schema(
        description = "Categoria do vídeo",
        example = "Backend"
    )
    private String categoria;

    @NotBlank
    @Schema(
        description = "URL do vídeo hospedado",
        example = "https://www.youtube.com/watch?v=abc123",
        required = true
    )
    private String urlVideo;

    @Schema(
        description = "URL da imagem de thumbnail do vídeo",
        example = "https://img.youtube.com/vi/abc123/hqdefault.jpg"
    )
    private String urlThumbnail;

    @Schema(
        description = "Indica se notificações estão habilitadas para o vídeo",
        example = "true",
        defaultValue = "false"
    )
    private Boolean notificacaoHabilitada;

    // =========================
    // GETTERS E SETTERS
    // =========================

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getUrlVideo() {
        return urlVideo;
    }

    public void setUrlVideo(String urlVideo) {
        this.urlVideo = urlVideo;
    }

    public String getUrlThumbnail() {
        return urlThumbnail;
    }

    public void setUrlThumbnail(String urlThumbnail) {
        this.urlThumbnail = urlThumbnail;
    }

    public Boolean getNotificacaoHabilitada() {
        return notificacaoHabilitada;
    }

    public void setNotificacaoHabilitada(Boolean notificacaoHabilitada) {
        this.notificacaoHabilitada = notificacaoHabilitada;
    }
}
