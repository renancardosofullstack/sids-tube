package com.serratec.alterdata.gitvideos.repository;

import com.serratec.alterdata.gitvideos.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {

    // ===========================
    // NOVOS MÉTODOS PARA FILTRO
    // ===========================

    // Filtrar por categoria (case insensitive)
    List<Video> findByCategoriaContainingIgnoreCase(String categoria);

    // Filtrar por tema no título ou descrição
    @Query("SELECT v FROM Video v WHERE " +
           "LOWER(v.titulo) LIKE LOWER(CONCAT('%', :tema, '%')) " +
           "OR LOWER(v.descricao) LIKE LOWER(CONCAT('%', :tema, '%'))")
    List<Video> findByTema(@Param("tema") String tema);

    // Filtrar por categoria E tema juntos
    @Query("SELECT v FROM Video v WHERE " +
           "LOWER(v.categoria) = LOWER(:categoria) AND (" +
           "LOWER(v.titulo) LIKE LOWER(CONCAT('%', :tema, '%')) " +
           "OR LOWER(v.descricao) LIKE LOWER(CONCAT('%', :tema, '%')))")
    List<Video> findByCategoriaAndTema(
            @Param("categoria") String categoria,
            @Param("tema") String tema
    );
}
