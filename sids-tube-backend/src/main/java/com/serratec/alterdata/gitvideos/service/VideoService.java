package com.serratec.alterdata.gitvideos.service;

import com.serratec.alterdata.gitvideos.dto.VideoRequestDTO;
import com.serratec.alterdata.gitvideos.dto.VideoResponseDTO;
import com.serratec.alterdata.gitvideos.enums.Role;
import com.serratec.alterdata.gitvideos.model.Usuario;
import com.serratec.alterdata.gitvideos.model.Video;
import com.serratec.alterdata.gitvideos.repository.UsuarioRepository;
import com.serratec.alterdata.gitvideos.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmailService emailService;

    public List<VideoResponseDTO> listarTodos() {
        return videoRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public VideoResponseDTO criar(VideoRequestDTO dto) {
        Video video = new Video();
        aplicarDTO(video, dto);

        Video videoSalvo = videoRepository.save(video);

        if (Boolean.TRUE.equals(videoSalvo.getNotificacaoHabilitada())) {
            List<Usuario> alunos = usuarioRepository.findByRole(Role.ALUNO);

            for (Usuario aluno : alunos) {
                try {
                    emailService.enviarNotificacaoNovoVideo(
                            aluno.getEmail(),
                            videoSalvo.getTitulo()
                    );
                } catch (Exception e) {
                    System.err.println("Falha ao enviar e-mail para: " + aluno.getEmail());
                    e.printStackTrace();
                }
            }
        }

        return toResponse(videoSalvo);
    }

    public VideoResponseDTO atualizar(Long id, VideoRequestDTO dto) {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vídeo não encontrado"));

        aplicarDTO(video, dto);
        return toResponse(videoRepository.save(video));
    }

    public void deletar(Long id) {
        if (!videoRepository.existsById(id)) {
            throw new RuntimeException("Vídeo não encontrado");
        }

        videoRepository.deleteById(id);
    }

    private void aplicarDTO(Video video, VideoRequestDTO dto) {
        video.setTitulo(dto.getTitulo());
        video.setDescricao(dto.getDescricao());
        video.setCategoria(dto.getCategoria());
        video.setUrlVideo(dto.getUrlVideo());
        video.setUrlThumbnail(dto.getUrlThumbnail());
        video.setNotificacaoHabilitada(dto.getNotificacaoHabilitada());
    }

    private VideoResponseDTO toResponse(Video video) {
        return new VideoResponseDTO(
                video.getId(),
                video.getTitulo(),
                video.getDescricao(),
                video.getCategoria(),
                video.getUrlVideo(),
                video.getUrlThumbnail(),
                video.getNotificacaoHabilitada(),
                video.getDataEnvio()
        );
    }
}