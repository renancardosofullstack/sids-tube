package com.serratec.alterdata.gitvideos.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Dados enviados para registrar/remover curtida de um vídeo")
public class CurtidaRequestDto {

    @Schema(
        description = "ID do usuário que está curtindo",
        example = "3",
        required = true
    )
    private Long usuarioId;

    @Schema(
        description = "ID do vídeo que será curtido",
        example = "10",
        required = true
    )
    private Long videoId;

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getVideoId() {
        return videoId;
    }

    public void setVideoId(Long videoId) {
        this.videoId = videoId;
    }
}
