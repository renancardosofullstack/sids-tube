# 🎥 Sid's Tube

Uma plataforma Full Stack de gerenciamento e consumo de vídeos educacionais, desenvolvida com React e Spring Boot.

---

## 📌 Sobre o Projeto

O Sid's Tube é uma plataforma inspirada em ambientes modernos de ensino e streaming, permitindo que usuários assistam conteúdos educacionais enquanto gestores administram vídeos, comentários e métricas da aplicação.

O projeto foi desenvolvido como uma aplicação real, contemplando autenticação, autorização, dashboard administrativo e notificações por e-mail.

---

## ✨ Funcionalidades

### 👤 Usuário

- Login seguro com JWT;
- Catálogo de vídeos;
- Busca por título e descrição;
- Filtro por categorias;
- Reprodução integrada do YouTube;
- Curtir vídeos;
- Comentar vídeos;
- Visualizar comentários aprovados.

### 👨‍💼 Gestor

- Dashboard administrativo;
- Cadastro de vídeos;
- Exclusão de vídeos;
- Aprovação e rejeição de comentários;
- Relatórios;
- Controle de permissões;
- Envio automático de notificações por e-mail.

### ♿ Acessibilidade

- Modo escuro;
- Alto contraste;
- Ajuste do tamanho da fonte;
- Recursos de navegação acessível.

---

## 📸 Demonstração

As imagens do projeto encontram-se na pasta:

```
SidsTube-Prints-Portfolio
```

### Login

![Login](SidsTube-Prints-Portfolio/01-login-sids-tube.png)

### Catálogo

![Catálogo](SidsTube-Prints-Portfolio/02-catalogo-videos.png)

### Dashboard

![Dashboard](SidsTube-Prints-Portfolio/04-dashboard-estatisticas.png)

### Comentários Pendentes

![Comentários](SidsTube-Prints-Portfolio/05-comentarios-pendentes.png)

### Cadastro de Vídeos

![Upload](SidsTube-Prints-Portfolio/06-enviar-video.png)

### Notificações por E-mail

![Email](SidsTube-Prints-Portfolio/07-email-notificacao.png)

---

## 🛠 Tecnologias Utilizadas

### Frontend

- React
- TypeScript
- Vite
- Axios
- React Router DOM
- Lucide React
- Tailwind CSS

### Backend

- Java 17
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- Hibernate
- Jakarta Mail
- Maven

### Banco de Dados

- PostgreSQL 17

### Ferramentas

- Git
- GitHub
- VS Code
- pgAdmin

---

## 🏗 Arquitetura

```
Frontend (React)
      ↓
Axios
      ↓
Spring Boot REST API
      ↓
Spring Security + JWT
      ↓
Spring Data JPA
      ↓
PostgreSQL
      ↓
Gmail SMTP
```

---

## 🚀 Como Executar

### Backend

Entre na pasta:

```bash
cd 2025_2_Alterdata_GitVideos_Backend-main
```

Execute:

```bash
./mvnw spring-boot:run
```

API disponível em:

```
http://localhost:8001
```

---

### Frontend

Entre na pasta:

```bash
cd 2025_2_Alterdata_GitVideos_Frontend-main
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

Aplicação disponível em:

```
http://localhost:5173
```

---

## ⚙️ Configuração SMTP

No arquivo `application-dev.properties`:

```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=SEU_EMAIL
spring.mail.password=SUA_SENHA_DE_APP
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

---

## 🔐 Controle de Acesso

### ROLE_GESTOR

Possui acesso a:

- Dashboard;
- Cadastro de vídeos;
- Relatórios;
- Aprovação de comentários;
- Notificações.

### ROLE_ALUNO

Possui acesso a:

- Catálogo;
- Reprodução de vídeos;
- Curtidas;
- Comentários.

---

## 📧 Fluxo de Notificação

```
Gestor publica vídeo
        ↓
Vídeo salvo no PostgreSQL
        ↓
Usuários são identificados
        ↓
E-mails enviados automaticamente
        ↓
Usuários retornam à plataforma
```

---

## 🎯 Desafios Superados

Durante o desenvolvimento foram resolvidos problemas reais envolvendo:

- Integração React + Spring Boot;
- Configuração do PostgreSQL;
- JWT;
- Spring Security;
- CORS;
- Aprovação de comentários;
- SMTP Gmail;
- Senha de aplicativo Google;
- Debug de erros HTTP;
- Comunicação Frontend ↔ Backend.

---

## 🔮 Melhorias Futuras

- Deploy em produção;
- Recuperação de senha;
- Upload de vídeos próprios;
- Favoritos;
- Analytics avançado;
- Testes automatizados;
- Notificações em tempo real.

---

## 👨‍💻 Autor

**Renan Melo de Oliveira Cardoso**

Desenvolvedor Full Stack apaixonado por tecnologia, automação e resolução de problemas.

📧 renancardosofullstack@gmail.com

---

⭐ Projeto desenvolvido como aplicação Full Stack completa utilizando tecnologias modernas e resolução de desafios reais de desenvolvimento.