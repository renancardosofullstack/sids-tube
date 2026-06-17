package com.serratec.alterdata.gitvideos.dto;

import java.time.LocalDateTime;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Resposta devolvida ao listar comentários")
public record ComentarioResponseDto(

        @Schema(description = "ID do comentário")
        Long id,

        @Schema(description = "ID do vídeo comentado")
        Long videoId,

        @Schema(description = "Título do vídeo")
        String videoTitulo,

        @Schema(description = "ID do usuário autor")
        Long usuarioId,

        @Schema(description = "Nome do usuário autor")
        String usuarioNome,

        @Schema(description = "Texto do comentário")
        String texto,

        @Schema(description = "Comentário é público?")
        Boolean publico,

        @Schema(description = "Data de criação do comentário")
        LocalDateTime criadoEm

) {}