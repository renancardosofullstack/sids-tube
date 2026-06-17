package com.serratec.alterdata.gitvideos.config;

import com.serratec.alterdata.gitvideos.model.Engajamento;
import com.serratec.alterdata.gitvideos.repository.EngajamentoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class EngajamentoInitializer {

    @Bean
    CommandLineRunner initEngajamento(EngajamentoRepository engRepo) {
        return args -> {
            if (engRepo.count() == 0) {
                engRepo.save(new Engajamento(LocalDate.now().minusDays(3), 110, 20, 5));
                engRepo.save(new Engajamento(LocalDate.now().minusDays(2), 180, 25, 8));
                engRepo.save(new Engajamento(LocalDate.now().minusDays(1), 250, 40, 10));

                System.out.println("📊 Dados iniciais de engajamento criados com sucesso!");
            }
        };
    }
}
