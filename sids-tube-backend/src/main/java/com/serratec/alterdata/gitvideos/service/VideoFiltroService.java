package com.serratec.alterdata.gitvideos.service;

import com.serratec.alterdata.gitvideos.model.Video;
import com.serratec.alterdata.gitvideos.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoFiltroService {

    @Autowired
    private VideoRepository videoRepository;

    public List<Video> filtrar(String categoria, String tema) {

        if (categoria == null && tema == null) {
            return videoRepository.findAll();
        }

        if (categoria != null && tema != null) {
            return videoRepository.findByCategoriaAndTema(categoria, tema);
        }

        if (categoria != null) {
            return videoRepository.findByCategoriaContainingIgnoreCase(categoria);
        }

        return videoRepository.findByTema(tema);
    }
}
