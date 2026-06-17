package com.serratec.alterdata.gitvideos.controller;

import com.serratec.alterdata.gitvideos.dto.VideoRequestDTO;
import com.serratec.alterdata.gitvideos.dto.VideoResponseDTO;
import com.serratec.alterdata.gitvideos.service.VideoService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/videos")
@CrossOrigin(origins = "*")
@Tag(name = "Vídeos", description = "Endpoints para gerenciamento de vídeos")
public class VideoController {

    @Autowired
    private VideoService videoService;

    // ======================================================
    // LISTAR TODOS
    // ======================================================
    @Operation(
        summary = "Listar vídeos",
        description = "Retorna todos os vídeos cadastrados no sistema"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Lista de vídeos retornada com sucesso")
    })
    @GetMapping
    public ResponseEntity<List<VideoResponseDTO>> listarTodos() {
        return ResponseEntity.ok(videoService.listarTodos());
    }

    // ======================================================
    // CRIAR
    // ======================================================
    @Operation(
        summary = "Cadastrar vídeo",
        description = "Cria um novo vídeo no sistema"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Vídeo criado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    @PostMapping
    public ResponseEntity<VideoResponseDTO> criar(
            @Valid
            @RequestBody
            @Parameter(description = "Dados do vídeo a ser criado")
            VideoRequestDTO dto
    ) {
        VideoResponseDTO criado = videoService.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    // ======================================================
    // ATUALIZAR
    // ======================================================
    @Operation(
        summary = "Atualizar vídeo",
        description = "Atualiza os dados de um vídeo existente"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Vídeo atualizado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Vídeo não encontrado")
    })
    @PutMapping("/{id}")
    public ResponseEntity<VideoResponseDTO> atualizar(
            @Parameter(description = "ID do vídeo", example = "10")
            @PathVariable Long id,

            @Valid
            @RequestBody
            @Parameter(description = "Novos dados do vídeo")
            VideoRequestDTO dto
    ) {
        return ResponseEntity.ok(videoService.atualizar(id, dto));
    }

    // ======================================================
    // DELETAR
    // ======================================================
    @Operation(
        summary = "Excluir vídeo",
        description = "Remove um vídeo pelo ID"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Vídeo removido com sucesso"),
        @ApiResponse(responseCode = "404", description = "Vídeo não encontrado")
    })
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(
            @Parameter(description = "ID do vídeo", example = "10")
            @PathVariable Long id
    ) {
        videoService.deletar(id);
    }
}
