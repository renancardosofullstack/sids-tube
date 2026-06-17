package com.serratec.alterdata.gitvideos.dto;

public class CurtidaResponseDto {

    private Long id;
    private String nomeUsuario;
    private VideoResumoDTO video;
   

 

    public CurtidaResponseDto(Long id, String nomeUsuario, VideoResumoDTO video) {
		super();
		this.id = id;
		this.nomeUsuario = nomeUsuario;
		this.video = video;
		
	}
	public Long getId() { return id; }
    public String getNomeUsuario() { return nomeUsuario; }
    public VideoResumoDTO getVideo() { return video; }
    
}
