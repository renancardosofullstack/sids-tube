package com.serratec.alterdata.gitvideos.service;

import com.serratec.alterdata.gitvideos.model.Engajamento;
import com.serratec.alterdata.gitvideos.repository.EngajamentoRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class RelatorioService {

    @Autowired
    private EngajamentoRepository engajamentoRepository;

    public byte[] gerarExcelEngajamento(List<Integer> videoIds) throws IOException {
        List<Engajamento> listaEngajamentos = engajamentoRepository.findAll();

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Engajamentos");

            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("ID");
            header.createCell(1).setCellValue("Views");
            header.createCell(2).setCellValue("Likes");
            header.createCell(3).setCellValue("Comentários");
            header.createCell(4).setCellValue("Data de Envio");

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            int linha = 1;

            for (Engajamento eng : listaEngajamentos) {
                Row row = sheet.createRow(linha++);
                row.createCell(0).setCellValue(eng.getId());
                row.createCell(1).setCellValue(eng.getViews());
                row.createCell(2).setCellValue(eng.getLikes());
                row.createCell(3).setCellValue(eng.getComentarios());
                row.createCell(4).setCellValue(eng.getData() != null ? eng.getData().format(formatter) : "");
            }

            for (int i = 0; i <= 4; i++) sheet.autoSizeColumn(i);
            workbook.write(out);
            return out.toByteArray();
        }
    }
}
