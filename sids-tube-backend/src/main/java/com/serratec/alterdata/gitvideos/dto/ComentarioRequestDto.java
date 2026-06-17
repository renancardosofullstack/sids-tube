package com.serratec.alterdata.gitvideos.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Dados enviados para criar um comentário")
public record ComentarioRequestDto(

        @Schema(
            description = "ID do usuário que está comentando",
            example = "3"
        )
        Long usuarioId,

        @Schema(
            description = "Texto do comentário",
            example = "Excelente explicação, obrigado!"
        )
        String texto
) {}
