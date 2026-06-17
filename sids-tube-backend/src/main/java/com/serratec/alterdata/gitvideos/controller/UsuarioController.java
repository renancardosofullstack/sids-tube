package com.serratec.alterdata.gitvideos.controller;

import com.serratec.alterdata.gitvideos.dto.UsuarioCreateDTO;
import com.serratec.alterdata.gitvideos.dto.UsuarioDTO;
import com.serratec.alterdata.gitvideos.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuários", description = "Endpoints para gestão de usuários (CRUD)")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    // ==========================================================
    // LISTAR
    // ==========================================================

    @Operation(
        summary = "Listar todos os usuários",
        description = "Retorna uma lista com todos os usuários cadastrados"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    })
    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    // ==========================================================
    // BUSCAR POR ID
    // ==========================================================

    @Operation(
        summary = "Buscar usuário por ID",
        description = "Retorna os dados de um usuário específico"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Usuário encontrado"),
        @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> buscar(
            @Parameter(description = "ID do usuário", example = "10")
            @PathVariable Long id) {

        return ResponseEntity.ok(service.buscarPorId(id));
    }

    // ==========================================================
    // CRIAR
    // ==========================================================

    @Operation(
        summary = "Criar novo usuário",
        description = "Cria um novo usuário no sistema"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Usuário criado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    @PostMapping
    public ResponseEntity<UsuarioDTO> criar(@RequestBody UsuarioCreateDTO dto) {
        return ResponseEntity.ok(service.criar(dto));
    }

    // ==========================================================
    // ATUALIZAR
    // ==========================================================

    @Operation(
        summary = "Atualizar usuário",
        description = "Atualiza os dados de um usuário existente"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Usuário atualizado"),
        @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    })
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> atualizar(
            @Parameter(description = "ID do usuário", example = "10")
            @PathVariable Long id,
            @RequestBody UsuarioDTO dto) {

        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    // ==========================================================
    // DELETAR
    // ==========================================================

    @Operation(
        summary = "Excluir usuário",
        description = "Remove um usuário pelo ID"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Usuário removido"),
        @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(
            @Parameter(description = "ID do usuário", example = "10")
            @PathVariable Long id) {

        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
