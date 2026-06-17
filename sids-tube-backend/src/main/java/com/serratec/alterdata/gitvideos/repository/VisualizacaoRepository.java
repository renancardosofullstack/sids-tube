package com.serratec.alterdata.gitvideos.repository;

import com.serratec.alterdata.gitvideos.model.Visualizacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VisualizacaoRepository extends JpaRepository<Visualizacao, Long> {

    // ================================
    // CONSULTAS POR VÍDEO
    // ================================

    List<Visualizacao> findByVideoId(Long videoId);

    Long countByVideoId(Long videoId);

    // ================================
    //  CONSULTAS POR USUÁRIO (HISTÓRICO)
    // ================================

    List<Visualizacao> findByUsuarioId(Long usuarioId);
}
