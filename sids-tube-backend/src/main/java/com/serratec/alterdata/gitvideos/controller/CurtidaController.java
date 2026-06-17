package com.serratec.alterdata.gitvideos.controller;

import com.serratec.alterdata.gitvideos.dto.CurtidaRequestDto;
import com.serratec.alterdata.gitvideos.dto.CurtidaResponseDto;
import com.serratec.alterdata.gitvideos.service.CurtidaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/curtidas")
@CrossOrigin(origins = "*")
@Tag(name = "Curtidas", description = "Endpoints para gerenciar curtidas de vídeos")
public class CurtidaController {

    private final CurtidaService curtidaService;

    public CurtidaController(CurtidaService curtidaService) {
        this.curtidaService = curtidaService;
    }

    @Operation(
        summary = "Curtir ou remover curtida",
        description = "Se já existir curtida, ela é removida. Caso contrário, é criada."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Curtida criada"),
        @ApiResponse(responseCode = "204", description = "Curtida removida"),
        @ApiResponse(responseCode = "401", description = "Não autenticado"),
        @ApiResponse(responseCode = "404", description = "Usuário ou vídeo não encontrado")
    })
    @PostMapping
    public ResponseEntity<Void> curtir(@RequestBody CurtidaRequestDto curtidaDto) {
        boolean curtiu = curtidaService.curtir(curtidaDto);
        return curtiu
                ? ResponseEntity.status(HttpStatus.CREATED).build()
                : ResponseEntity.noContent().build();
    }

    @Operation(summary = "Listar todas as curtidas")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso"),
        @ApiResponse(responseCode = "401", description = "Não autenticado")
    })
    @GetMapping
    public ResponseEntity<List<CurtidaResponseDto>> listarTodas() {
        List<CurtidaResponseDto> curtidas = curtidaService.listarTodas();
        return ResponseEntity.ok(curtidas);
    }

    @Operation(summary = "Listar IDs de vídeos curtidos por um usuário específico")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Lista de IDs retornada")
    })
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Long>> listarVideosCurtidosPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(curtidaService.listarVideosCurtidosPorUsuario(usuarioId));
    }
}