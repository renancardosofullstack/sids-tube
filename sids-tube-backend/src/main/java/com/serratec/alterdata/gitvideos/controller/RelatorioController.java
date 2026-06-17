package com.serratec.alterdata.gitvideos.controller;

import com.serratec.alterdata.gitvideos.service.RelatorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RelatorioController {

    @Autowired
    private RelatorioService relatorioService;

    @GetMapping("/relatorios/engajamento")
    public ResponseEntity<byte[]> gerarRelatorio(@RequestParam(required = false) List<Integer> videoIds) {
        try {
            byte[] excel = relatorioService.gerarExcelEngajamento(videoIds);

            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=relatorio_engajamento.xlsx");
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

            return ResponseEntity.ok().headers(headers).body(excel);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
