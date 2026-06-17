package com.serratec.alterdata.gitvideos.service;

import com.serratec.alterdata.gitvideos.model.Usuario;
import com.serratec.alterdata.gitvideos.model.Video;
import com.serratec.alterdata.gitvideos.model.Visualizacao;
import com.serratec.alterdata.gitvideos.repository.UsuarioRepository;
import com.serratec.alterdata.gitvideos.repository.VideoRepository;
import com.serratec.alterdata.gitvideos.repository.VisualizacaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VisualizacaoService {

    private final VisualizacaoRepository visualizacaoRepository;
    private final UsuarioRepository usuarioRepository;
    private final VideoRepository videoRepository;

    public VisualizacaoService(
            VisualizacaoRepository visualizacaoRepository,
            UsuarioRepository usuarioRepository,
            VideoRepository videoRepository
    ) {
        this.visualizacaoRepository = visualizacaoRepository;
        this.usuarioRepository = usuarioRepository;
        this.videoRepository = videoRepository;
    }

    // ============================================================
    //  REGISTRAR VISUALIZAÇÃO
    // ============================================================
    /**
     * Registra a visualização de um vídeo por um usuário.
     */
    public boolean registrarVisualizacao(Long usuarioId, Long videoId) {

        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        Optional<Video> videoOpt = videoRepository.findById(videoId);

        if (usuarioOpt.isEmpty() || videoOpt.isEmpty()) {
            return false;
        }

        Visualizacao visualizacao = new Visualizacao();
        visualizacao.setUsuario(usuarioOpt.get());
        visualizacao.setVideo(videoOpt.get());

        visualizacaoRepository.save(visualizacao);
        return true;
    }

    // ============================================================
    //  LISTAR TODAS AS VISUALIZAÇÕES
    // ============================================================
    public List<Visualizacao> listarTodas() {
        return visualizacaoRepository.findAll();
    }

    // ============================================================
    //  LISTAR VISUALIZAÇÕES POR VÍDEO
    // ============================================================
    public List<Visualizacao> listarPorVideo(Long videoId) {
        return visualizacaoRepository.findByVideoId(videoId);
    }

    // ============================================================
    //  LISTAR VISUALIZAÇÕES POR USUÁRIO (HISTÓRICO)
    // ============================================================
    public List<Visualizacao> listarPorUsuario(Long usuarioId) {
        return visualizacaoRepository.findByUsuarioId(usuarioId);
    }

    // ============================================================
    //  CONTAR VISUALIZAÇÕES POR VÍDEO
    // ============================================================
    public Long contarPorVideo(Long videoId) {
        return visualizacaoRepository.countByVideoId(videoId);
    }
}
