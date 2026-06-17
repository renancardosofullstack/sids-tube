package com.serratec.alterdata.gitvideos.repository;

import com.serratec.alterdata.gitvideos.model.Curtida;
import com.serratec.alterdata.gitvideos.model.Usuario;
import com.serratec.alterdata.gitvideos.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CurtidaRepository extends JpaRepository<Curtida, Long> {
    Optional<Curtida> findByUsuarioAndVideo(Usuario usuario, Video video);
    Long countByVideoId(Long videoId);

    @Query("SELECT c.video.id FROM Curtida c WHERE c.usuario.id = :usuarioId")
    List<Long> findVideoIdsByUsuarioId(@Param("usuarioId") Long usuarioId);

    List<Curtida> findByUsuarioId(Long usuarioId);
}