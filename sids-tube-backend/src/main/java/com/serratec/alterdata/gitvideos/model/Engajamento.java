package com.serratec.alterdata.gitvideos.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "engajamento")
public class Engajamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate data;

    private Integer views;
    private Integer likes;
    private Integer comentarios;

    @ManyToOne
    @JoinColumn(name = "video_id")
    private Video video;

    public Engajamento() {}

    public Engajamento(LocalDate data, Integer views, Integer likes, Integer comentarios) {
        this.data = data;
        this.views = views;
        this.likes = likes;
        this.comentarios = comentarios;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }

    public Integer getViews() { return views; }
    public void setViews(Integer views) { this.views = views; }

    public Integer getLikes() { return likes; }
    public void setLikes(Integer likes) { this.likes = likes; }

    public Integer getComentarios() { return comentarios; }
    public void setComentarios(Integer comentarios) { this.comentarios = comentarios; }

    public Video getVideo() { return video; }
    public void setVideo(Video video) { this.video = video; }

    public String getDataEnvio() {
        return data != null ? data.toString() : "";
    }
}