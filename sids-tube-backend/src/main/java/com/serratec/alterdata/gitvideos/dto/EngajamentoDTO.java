package com.serratec.alterdata.gitvideos.dto;

import java.time.LocalDate;

public class EngajamentoDTO {

    private LocalDate data;
    private Integer views;
    private Integer likes;
    private Integer comentarios;

    public EngajamentoDTO(LocalDate data, Integer views, Integer likes, Integer comentarios) {
        this.data = data;
        this.views = views;
        this.likes = likes;
        this.comentarios = comentarios;
    }
    public LocalDate getData() {
        return data;
    }
    public Integer getViews() {
        return views;
    }
    public Integer getLikes() {
        return likes;
    }
    public Integer getComentarios() {
        return comentarios;
    }
    public void setData(LocalDate data) {
        this.data = data;
    }
    public void setViews(Integer views) {
        this.views = views;
    }
    public void setLikes(Integer likes) {
        this.likes = likes;
    }
    public void setComentarios(Integer comentarios) {
        this.comentarios = comentarios;
    }

}
