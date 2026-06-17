package com.serratec.alterdata.gitvideos.config;

import com.serratec.alterdata.gitvideos.enums.Role;
import com.serratec.alterdata.gitvideos.model.Usuario;
import com.serratec.alterdata.gitvideos.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initUsers(UsuarioRepository usuarioRepository) {

        return args -> {

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

            // =======================
            // Criar GESTOR
            // =======================

            if (!usuarioRepository.existsByEmail("contato@sidstube.com")) {

                Usuario gestor = new Usuario();
                gestor.setNome("Administrador");
                gestor.setEmail("contato@sidstube.com");
                gestor.setSenhaHash(encoder.encode("123456"));
                gestor.setRole(Role.GESTOR);

                usuarioRepository.save(gestor);
                System.out.println("🌟 Criado usuário GESTOR padrão: contato@sidstube.com / 123456");
            }

            // =======================
            // Criar ALUNO
            // =======================

            if (!usuarioRepository.existsByEmail("contato@sidstube.com")) {

                Usuario aluno = new Usuario();
                aluno.setNome("Aluno Teste");
                aluno.setEmail("contato@sidstube.com");
                aluno.setSenhaHash(encoder.encode("123456"));
                aluno.setRole(Role.ALUNO);
                usuarioRepository.save(aluno);
                System.out.println("🎓 Criado usuário ALUNO padrão: contato@sidstube.com / 123456");
            }
        };
    }
}
