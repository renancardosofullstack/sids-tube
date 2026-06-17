package com.serratec.alterdata.gitvideos.repository;

import com.serratec.alterdata.gitvideos.model.Engajamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EngajamentoRepository extends JpaRepository<Engajamento, Long> {
    List<Engajamento> findByVideo_IdIn(List<Integer> videoIds);
}