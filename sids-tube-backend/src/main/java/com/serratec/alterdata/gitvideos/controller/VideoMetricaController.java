package com.serratec.alterdata.gitvideos.controller;

import com.serratec.alterdata.gitvideos.service.VideoMetricaService;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/metricas")
@Tag(name = "Métricas", description = "Endpoints para métricas de vídeos (curtidas e visualizações)")
public class VideoMetricaController {

    private final VideoMetricaService videoMetricaService;

    public VideoMetricaController(VideoMetricaService videoMetricaService) {
        this.videoMetricaService = videoMetricaService;
    }

    @Operation(
        summary = "Obter métricas do vídeo",
        description = "Retorna texto contendo a quantidade de curtidas e visualizações do vídeo"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Métricas retornadas com sucesso"),
        @ApiResponse(responseCode = "404", description = "Vídeo não encontrado")
    })
    @GetMapping("/{videoId}")
    public String getMetricas(
            @Parameter(description = "ID do vídeo", example = "10")
            @PathVariable Long videoId) {

        Long curtidas = videoMetricaService.getCurtidas(videoId);
        Long visualizacoes = videoMetricaService.getVisualizacoes(videoId);

        return "Curtidas: " + curtidas + " | Visualizações: " + visualizacoes;
    }
}
