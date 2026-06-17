package com.serratec.alterdata.gitvideos.controller;

import com.serratec.alterdata.gitvideos.model.Visualizacao;
import com.serratec.alterdata.gitvideos.service.VisualizacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/visualizacoes")
@Tag(name = "Visualizações", description = "Endpoints para registro e consulta de visualizações de vídeos")
public class VisualizacaoController {

    private final VisualizacaoService visualizacaoService;

    public VisualizacaoController(VisualizacaoService visualizacaoService) {
        this.visualizacaoService = visualizacaoService;
    }

    // ==========================================================
    // REGISTRAR VISUALIZAÇÃO
    // ==========================================================

    @Operation(
        summary = "Registrar visualização",
        description = "Registra uma visualização do vídeo por um usuário"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Visualização registrada"),
        @ApiResponse(responseCode = "400", description = "Usuário ou vídeo não encontrado")
    })
    @PostMapping("/{usuarioId}/{videoId}")
    public ResponseEntity<?> registrarVisualizacao(
            @Parameter(description = "ID do usuário", example = "3")
            @PathVariable Long usuarioId,

            @Parameter(description = "ID do vídeo", example = "10")
            @PathVariable Long videoId
    ) {
        boolean sucesso = visualizacaoService.registrarVisualizacao(usuarioId, videoId);

        if (sucesso) {
            return ResponseEntity.ok("Visualização registrada com sucesso!");
        } else {
            return ResponseEntity.badRequest().body("Usuário ou vídeo não encontrado.");
        }
    }

    // ==========================================================
    // LISTAR TODAS
    // ==========================================================

    @Operation(
        summary = "Listar todas as visualizações",
        description = "Retorna todas as visualizações registradas"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    })
    @GetMapping
    public ResponseEntity<List<Visualizacao>> listarTodas() {
        return ResponseEntity.ok(visualizacaoService.listarTodas());
    }

    // ==========================================================
    // LISTAR POR VÍDEO
    // ==========================================================

    @Operation(
        summary = "Listar visualizações por vídeo",
        description = "Retorna os registros de visualização de um vídeo específico"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Vídeo não encontrado")
    })
    @GetMapping("/video/{videoId}")
    public ResponseEntity<List<Visualizacao>> listarPorVideo(
            @Parameter(description = "ID do vídeo", example = "10")
            @PathVariable Long videoId) {

        return ResponseEntity.ok(visualizacaoService.listarPorVideo(videoId));
    }

    // ==========================================================
    // CONTAR VISUALIZAÇÕES POR VÍDEO
    // ==========================================================

    @Operation(
        summary = "Contar visualizações por vídeo",
        description = "Retorna a quantidade de visualizações registradas para um vídeo"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Contagem retornada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Vídeo não encontrado")
    })
    @GetMapping("/video/{videoId}/count")
    public ResponseEntity<Long> contarPorVideo(
            @Parameter(description = "ID do vídeo", example = "10")
            @PathVariable Long videoId) {

        return ResponseEntity.ok(visualizacaoService.contarPorVideo(videoId));
    }
 // ==========================================================
 // LISTAR VISUALIZAÇÕES POR USUÁRIO
 // ==========================================================
 @Operation(
     summary = "Listar visualizações por usuário",
     description = "Retorna os registros de visualização de um usuário específico"
 )
 @ApiResponses({
     @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso"),
     @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
 })
 @GetMapping("/usuario/{usuarioId}")
 public ResponseEntity<List<Visualizacao>> listarPorUsuario(
         @Parameter(description = "ID do usuário", example = "8")
         @PathVariable Long usuarioId) {

     List<Visualizacao> visualizacoes = visualizacaoService.listarPorUsuario(usuarioId);

     if (visualizacoes.isEmpty()) {
         return ResponseEntity.notFound().build(); // Caso o usuário não tenha visualizações
     }

     return ResponseEntity.ok(visualizacoes);
 }

}
