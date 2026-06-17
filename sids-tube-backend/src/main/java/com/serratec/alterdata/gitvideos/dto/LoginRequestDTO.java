package com.serratec.alterdata.gitvideos.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Dados necessários para autenticação (login)")
public record LoginRequestDTO(

        @Schema(
            description = "E-mail do usuário",
            example = "aluno@teste.com",
            required = true
        )
        String email,

        @Schema(
            description = "Senha de acesso",
            example = "123456",
            required = true
        )
        String senha
) {}
