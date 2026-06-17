package com.serratec.alterdata.gitvideos.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {

        // Nome do esquema de segurança
        final String securitySchemeName = "BearerAuth";

        return new OpenAPI()
                .info(new Info()
                        .title("GitVideos API")
                        .version("1.0")
                        .description("API usada pelo GitVideos (login, vídeos, métricas, curtidas e visualizações)"))

                //  BOTÃO AUTORIZE
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))

                //  DEFINIÇÃO DO BEARER TOKEN
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                        ));
    }
}
