package com.serratec.alterdata.gitvideos.service;

import com.serratec.alterdata.gitvideos.dto.ComentarioRequestDto;
import com.serratec.alterdata.gitvideos.dto.ComentarioResponseDto;
import com.serratec.alterdata.gitvideos.model.Comentario;
import com.serratec.alterdata.gitvideos.model.Usuario;
import com.serratec.alterdata.gitvideos.model.Video;
import com.serratec.alterdata.gitvideos.repository.ComentarioRepository;
import com.serratec.alterdata.gitvideos.repository.UsuarioRepository;
import com.serratec.alterdata.gitvideos.repository.VideoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComentarioService {

    private final ComentarioRepository comentarioRepository;
    private final UsuarioRepository usuarioRepository;
    private final VideoRepository videoRepository;

    public ComentarioService(ComentarioRepository comentarioRepository,
                             UsuarioRepository usuarioRepository,
                             VideoRepository videoRepository) {
        this.comentarioRepository = comentarioRepository;
        this.usuarioRepository = usuarioRepository;
        this.videoRepository = videoRepository;
    }

    public ComentarioResponseDto criarComentario(Long videoId, ComentarioRequestDto dto) {
        Usuario usuario = usuarioRepository.findById(dto.usuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Video video = videoRepository.findById(videoId)
                .orElseThrow(() -> new RuntimeException("Vídeo não encontrado"));

        Comentario comentario = new Comentario(video, usuario, dto.texto());
        comentarioRepository.save(comentario);

        return toResponse(comentario);
    }

    public List<ComentarioResponseDto> listarComentariosPublicos(Long videoId) {
        return comentarioRepository.findByVideoIdAndPublicoTrue(videoId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<ComentarioResponseDto> listarPendentes() {
        return comentarioRepository.findByPublicoFalse().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public void aprovarComentario(Long id) {
        Comentario comentario = comentarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comentário não encontrado"));
        
        comentario.setPublico(true);
        comentarioRepository.save(comentario);
    }

    public void excluirComentario(Long id) {
        if (!comentarioRepository.existsById(id)) {
            throw new RuntimeException("Comentário não encontrado");
        }
        comentarioRepository.deleteById(id);
    }
    
    public List<ComentarioResponseDto> listarPorUsuario(Long usuarioId) {
        return comentarioRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ComentarioResponseDto buscarPorId(Long id) {
        Comentario comentario = comentarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comentário não encontrado"));
        return toResponse(comentario);
    }

    public ComentarioResponseDto atualizar(Long id, ComentarioRequestDto dto) {
        Comentario comentario = comentarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comentário não encontrado"));

        comentario.setTexto(dto.texto());
        comentarioRepository.save(comentario);

        return toResponse(comentario);
    }

    public void deletar(Long id) {
        if (!comentarioRepository.existsById(id)) {
            throw new RuntimeException("Comentário não encontrado");
        }
        comentarioRepository.deleteById(id);
    }

    private ComentarioResponseDto toResponse(Comentario c) {
        return new ComentarioResponseDto(
                c.getId(),
                c.getVideo().getId(),
                c.getVideo().getTitulo(),
                c.getUsuario().getId(),
                c.getUsuario().getNome(),
                c.getTexto(),
                c.getPublico(),
                c.getCriadoEm()
        );
    }
}