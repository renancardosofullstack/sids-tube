package com.serratec.alterdata.gitvideos.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "DTO usado para redefinir senha através de um token recebido por e-mail")
public record ResetarSenhaRequestDTO(

        @Schema(
                description = "Token recebido no link de recuperação enviado por e-mail",
                example = "5f4dcc3b-8cbb-4b3b-89ef-6beae24e3f12",
                required = true
        )
        String token,

        @Schema(
                description = "Nova senha do usuário",
                example = "novaSenha123",
                minLength = 6,
                required = true
        )
        String novaSenha
) {}
