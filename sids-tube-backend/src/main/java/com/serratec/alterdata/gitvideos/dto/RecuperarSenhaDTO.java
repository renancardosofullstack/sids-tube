package com.serratec.alterdata.gitvideos.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "DTO usado para solicitar recuperação de senha")
public record RecuperarSenhaDTO(

        @Schema(
                description = "E-mail do usuário que deseja recuperar a senha",
                example = "usuario@empresa.com",
                required = true
        )
        String email
) {}
