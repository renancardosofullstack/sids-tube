package com.serratec.alterdata.gitvideos.dto;

public class VideoResumoDTO {
    private Long id;
    private String titulo;
    private String thumbnail;
    private String urlVideo;

    public VideoResumoDTO(Long id, String titulo, String thumbnail, String urlVideo) {
        this.id = id;
        this.titulo = titulo;
        this.thumbnail = thumbnail;
        this.urlVideo = urlVideo;
    }

    public Long getId() { return id; }
    public String getTitulo() { return titulo; }
    public String getThumbnail() { return thumbnail; }

	public String getUrlVideo() {
		return urlVideo;
	}

	
    
    
    
    
    
    
    
    
    
}
