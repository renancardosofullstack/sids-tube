package com.serratec.alterdata.gitvideos.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarEmail(String para, String assunto, String html) {
        try {
            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(para);
            helper.setSubject(assunto);
            helper.setText(html, true);

            mailSender.send(message);

            System.out.println("✅ E-mail enviado para: " + para);
        } catch (Exception e) {
            System.err.println("❌ Erro ao enviar e-mail para: " + para);
            e.printStackTrace();
        }
    }

    public void enviarNotificacaoNovoVideo(String destinatario, String tituloVideo) {
        String assunto = "Novo vídeo disponível: " + tituloVideo;

        String html = """
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #0056b3;">Novo conteúdo no Sid's Tube!</h2>
                <p>O vídeo <strong>%s</strong> acabou de ser adicionado.</p>
                <p>Acesse a plataforma para conferir.</p>
                <br>
                <small>Equipe Sid's Tube</small>
            </div>
            """.formatted(tituloVideo);

        enviarEmail(destinatario, assunto, html);
    }
}