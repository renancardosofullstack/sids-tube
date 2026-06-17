package com.serratec.alterdata.gitvideos.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.serratec.alterdata.gitvideos.dto.ComentarioRequestDto;
import com.serratec.alterdata.gitvideos.dto.ComentarioResponseDto;
import com.serratec.alterdata.gitvideos.service.ComentarioService;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/comentarios")
@CrossOrigin(origins = "*")
@Tag(name = "Comentários", description = "Endpoints para CRUD, moderação e histórico de comentários")
public class ComentarioController {

    private final ComentarioService comentarioService;

    public ComentarioController(ComentarioService comentarioService) {
        this.comentarioService = comentarioService;
    }

    @Operation(summary = "Criar comentário")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Comentário criado"),
            @ApiResponse(responseCode = "404", description = "Vídeo ou usuário não encontrado")
    })
    @PostMapping("/videos/{videoId}")
    public ResponseEntity<ComentarioResponseDto> criar(
            @PathVariable Long videoId,
            @RequestBody ComentarioRequestDto dto
    ) {
        return ResponseEntity.ok(comentarioService.criarComentario(videoId, dto));
    }

    @Operation(summary = "Listar comentários públicos de um vídeo")
    @GetMapping("/videos/{videoId}")
    public ResponseEntity<List<ComentarioResponseDto>> listarPublicos(@PathVariable Long videoId) {
        return ResponseEntity.ok(comentarioService.listarComentariosPublicos(videoId));
    }

    @Operation(summary = "Listar comentários pendentes de aprovação")
    @GetMapping("/pendentes")
    @PreAuthorize("hasRole('GESTOR')")
    public ResponseEntity<List<ComentarioResponseDto>> listarPendentes() {
        return ResponseEntity.ok(comentarioService.listarPendentes());
    }

    @Operation(summary = "Aprovar comentário e tornar público")
    @PatchMapping("/{id}/aprovar")
    @PreAuthorize("hasRole('GESTOR')")
    public ResponseEntity<Void> aprovar(@PathVariable Long id) {
        comentarioService.aprovarComentario(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Histórico do aluno")
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<ComentarioResponseDto>> listarPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(comentarioService.listarPorUsuario(usuarioId));
    }

    @Operation(summary = "Buscar comentário por ID")
    @GetMapping("/{comentarioId}")
    public ResponseEntity<ComentarioResponseDto> buscarPorId(@PathVariable Long comentarioId) {
        return ResponseEntity.ok(comentarioService.buscarPorId(comentarioId));
    }

    @Operation(summary = "Atualizar comentário")
    @PutMapping("/{comentarioId}")
    public ResponseEntity<ComentarioResponseDto> atualizar(
            @PathVariable Long comentarioId,
            @RequestBody ComentarioRequestDto dto
    ) {
        return ResponseEntity.ok(comentarioService.atualizar(comentarioId, dto));
    }

    @Operation(summary = "Deletar comentário")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('GESTOR')")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        comentarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}