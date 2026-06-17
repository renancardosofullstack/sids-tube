package com.serratec.alterdata.gitvideos.service;

import com.serratec.alterdata.gitvideos.dto.EngajamentoDTO;
import com.serratec.alterdata.gitvideos.model.Engajamento;
import com.serratec.alterdata.gitvideos.repository.EngajamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EngajamentoService {

    @Autowired
    private EngajamentoRepository repository;

    public List<EngajamentoDTO> listarDados() {
        return repository.findAll().stream()
                .map(e -> new EngajamentoDTO(
                        e.getData(),
                        e.getViews(),
                        e.getLikes(),
                        e.getComentarios()
                ))
                .toList();
    }
}
