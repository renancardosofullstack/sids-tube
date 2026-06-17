package com.serratec.alterdata.gitvideos.repository;

import com.serratec.alterdata.gitvideos.model.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {

    List<Comentario> findByVideoIdAndPublicoTrue(Long videoId);
    
    List<Comentario> findByPublicoFalse();

    List<Comentario> findByVideoId(Long videoId); 

    List<Comentario> findByUsuarioId(Long usuarioId);
}