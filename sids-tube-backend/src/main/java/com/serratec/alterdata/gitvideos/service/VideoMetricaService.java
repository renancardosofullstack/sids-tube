package com.serratec.alterdata.gitvideos.service;

import com.serratec.alterdata.gitvideos.repository.CurtidaRepository;
import com.serratec.alterdata.gitvideos.repository.VisualizacaoRepository;
import org.springframework.stereotype.Service;

@Service
public class VideoMetricaService {

    private final CurtidaRepository curtidaRepository;
    private final VisualizacaoRepository visualizacaoRepository;

    public VideoMetricaService(
            CurtidaRepository curtidaRepository,
            VisualizacaoRepository visualizacaoRepository
    ) {
        this.curtidaRepository = curtidaRepository;
        this.visualizacaoRepository = visualizacaoRepository;
    }

    public Long getCurtidas(Long videoId) {
        return curtidaRepository.countByVideoId(videoId);
    }

    public Long getVisualizacoes(Long videoId) {
        return visualizacaoRepository.countByVideoId(videoId);
    }
}
