package com.serratec.alterdata.gitvideos.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.serratec.alterdata.gitvideos.model.PasswordResetToken;
import com.serratec.alterdata.gitvideos.model.Usuario;
import com.serratec.alterdata.gitvideos.repository.PasswordResetTokenRepository;
import com.serratec.alterdata.gitvideos.repository.UsuarioRepository;

@Service
public class PasswordResetService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    // 🔥 pega do application.properties:
    // app.frontend.host=http://localhost:3001
    @Value("${app.frontend.host}")
    private String frontendUrl;

    // ============================================================
    // 1️⃣ Gerar token e enviar por email
    // ============================================================
    public String criarToken(String email) {

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        String token = UUID.randomUUID().toString();

        PasswordResetToken entity = new PasswordResetToken();
        entity.setUsuario(usuario);
        entity.setToken(token);
        entity.setExpiracao(LocalDateTime.now().plusHours(1));

        tokenRepository.save(entity);

        // =====================================================
        // 🔥 agora monta link dinâmico
        // =====================================================
        String link = frontendUrl + "/resetar-senha?token=" + token;

        String html = """
                <h2>Recuperação de Senha - GitVideos</h2>
                <p>Olá, %s!</p>

                <p>Você solicitou a recuperação de senha.</p>

                <p>Clique no botão abaixo para redefinir sua senha:</p>

                <p>
                    <a href="%s" style="
                        background-color:#007bff;
                        color:white;
                        padding:10px 16px;
                        text-decoration:none;
                        border-radius:5px;
                        font-weight:bold;">
                        Resetar Senha
                    </a>
                </p>

                <br>
                <p> Este link expira em 1 hora.</p>
                <p>Se você não fez essa solicitação, ignore este email.</p>
                """.formatted(usuario.getNome(), link);

        emailService.enviarEmail(
                usuario.getEmail(),
                "Recuperação de senha - GitVideos",
                html
        );

        System.out.println("Email enviado para: " + usuario.getEmail());
        System.out.println("Link de reset: " + link);

        return token;
    }

    // ============================================================
    // 2️⃣ Resetar senha
    // ============================================================
    public void resetarSenha(String token, String novaSenha) {

        PasswordResetToken entity = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token inválido"));

        if (entity.expirado()) {
            throw new RuntimeException("Token expirado");
        }

        Usuario usuario = entity.getUsuario();

        usuario.setSenhaHash(passwordEncoder.encode(novaSenha));
        usuarioRepository.save(usuario);

        tokenRepository.delete(entity);

        System.out.println("Senha redefinida para: " + usuario.getEmail());
    }
}
