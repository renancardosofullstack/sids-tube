package com.serratec.alterdata.gitvideos.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.serratec.alterdata.gitvideos.dto.RecuperarSenhaDTO;
import com.serratec.alterdata.gitvideos.dto.ResetarSenhaRequestDTO;
import com.serratec.alterdata.gitvideos.service.PasswordResetService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/auth")
@Tag(name = "Recuperação de Senha", description = "Endpoints para recuperar e resetar senhas de usuários")
public class PasswordResetController {

    @Autowired
    private PasswordResetService service;

    // URL dinâmica vinda do application.properties
    @Value("${app.backend.url}")
    private String backendUrl;

    // ========================================================
    // 1) Solicitar recuperação de senha
    // ========================================================
    @Operation(
        summary = "Solicitar recuperação de senha",
        description = "Se o email existir, enviará um link de reset para o usuário. "
                + "Retorna sempre sucesso por segurança."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Solicitação processada"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    @PostMapping("/recuperar-senha")
    public ResponseEntity<?> recuperarSenha(@RequestBody RecuperarSenhaDTO dto) {

        String token = service.criarToken(dto.email());

        // 🔥 monta link dinâmico para local / produção
        String link = backendUrl + "/auth/resetar-senha?token=" + token;

        return ResponseEntity.ok(Map.of(
                "mensagem", "Se o email existir, enviaremos o link de recuperação.",
                "linkDebug", link
        ));
    }

    // ========================================================
    // 2) Resetar senha via token
    // ========================================================
    @Operation(
        summary = "Resetar senha",
        description = "Altera a senha do usuário a partir de um token válido de recuperação."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Senha alterada com sucesso"),
        @ApiResponse(responseCode = "400", description = "Token inválido ou expirado")
    })
    @PostMapping("/resetar-senha")
    public ResponseEntity<?> resetarSenha(@RequestBody ResetarSenhaRequestDTO dto) {

        service.resetarSenha(dto.token(), dto.novaSenha());

        return ResponseEntity.ok(Map.of(
                "mensagem", "Senha alterada com sucesso!"
        ));
    }
}
