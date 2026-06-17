package com.serratec.alterdata.gitvideos.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "relatorio")
public class Relatorio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dataRelatorio;

    private Integer totalViews;

    private Integer totalLikes;

    private Integer totalComentarios;

    public Relatorio() {}

    public Relatorio(LocalDate dataRelatorio, Integer totalViews, Integer totalLikes, Integer totalComentarios) {
        this.dataRelatorio = dataRelatorio;
        this.totalViews = totalViews;
        this.totalLikes = totalLikes;
        this.totalComentarios = totalComentarios;
    }

    public Long getId() { return id; }
    public LocalDate getDataRelatorio() { return dataRelatorio; }
    public Integer getTotalViews() { return totalViews; }
    public Integer getTotalLikes() { return totalLikes; }
    public Integer getTotalComentarios() { return totalComentarios; }

    public void setId(Long id) { this.id = id; }
    public void setDataRelatorio(LocalDate dataRelatorio) { this.dataRelatorio = dataRelatorio; }
    public void setTotalViews(Integer totalViews) { this.totalViews = totalViews; }
    public void setTotalLikes(Integer totalLikes) { this.totalLikes = totalLikes; }
    public void setTotalComentarios(Integer totalComentarios) { this.totalComentarios = totalComentarios; }
}
