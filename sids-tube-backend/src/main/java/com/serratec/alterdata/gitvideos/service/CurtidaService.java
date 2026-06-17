package com.serratec.alterdata.gitvideos.service;

import com.serratec.alterdata.gitvideos.dto.CurtidaRequestDto;
import com.serratec.alterdata.gitvideos.dto.CurtidaResponseDto;
import com.serratec.alterdata.gitvideos.dto.VideoResumoDTO;
import com.serratec.alterdata.gitvideos.model.Curtida;
import com.serratec.alterdata.gitvideos.model.Usuario;
import com.serratec.alterdata.gitvideos.model.Video;
import com.serratec.alterdata.gitvideos.repository.CurtidaRepository;
import com.serratec.alterdata.gitvideos.repository.UsuarioRepository;
import com.serratec.alterdata.gitvideos.repository.VideoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CurtidaService {

    @Autowired
    private CurtidaRepository curtidaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private VideoRepository videoRepository;

    public boolean curtir(CurtidaRequestDto curtidaDto) {

        Usuario usuario = usuarioRepository.findById(curtidaDto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Video video = videoRepository.findById(curtidaDto.getVideoId())
                .orElseThrow(() -> new RuntimeException("Vídeo não encontrado"));

        var existente = curtidaRepository.findByUsuarioAndVideo(usuario, video);

        if (existente.isPresent()) {
            curtidaRepository.delete(existente.get());
            return false;
        }

        Curtida nova = new Curtida();
        nova.setUsuario(usuario);
        nova.setVideo(video);

        curtidaRepository.save(nova);
        return true;
    }

    public List<CurtidaResponseDto> listarTodas() {

        return curtidaRepository.findAll()
                .stream()
                .map(c -> new CurtidaResponseDto(
                        c.getId(),
                        c.getUsuario().getNome(),
                        new VideoResumoDTO(
                                c.getVideo().getId(),
                                c.getVideo().getTitulo(),
                                c.getVideo().getUrlThumbnail(),
                                c.getVideo().getUrlVideo()
                        )
                ))
                .toList();
    }

    public List<Long> listarVideosCurtidosPorUsuario(Long usuarioId) {
        return curtidaRepository.findVideoIdsByUsuarioId(usuarioId);
    }

    public List<CurtidaResponseDto> listarPorUsuario(Long usuarioId) {

        usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return curtidaRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(c -> new CurtidaResponseDto(
                        c.getId(),
                        c.getUsuario().getNome(),
                        new VideoResumoDTO(
                                c.getVideo().getId(),
                                c.getVideo().getTitulo(),
                                c.getVideo().getUrlThumbnail(),
                                c.getVideo().getUrlVideo()
                        )
                ))
                .toList();
    }
}