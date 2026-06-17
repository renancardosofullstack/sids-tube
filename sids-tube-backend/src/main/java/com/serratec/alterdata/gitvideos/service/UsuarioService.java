package com.serratec.alterdata.gitvideos.service;

import com.serratec.alterdata.gitvideos.dto.UsuarioCreateDTO;
import com.serratec.alterdata.gitvideos.dto.UsuarioDTO;
import com.serratec.alterdata.gitvideos.enums.Role;
import com.serratec.alterdata.gitvideos.model.Usuario;
import com.serratec.alterdata.gitvideos.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UsuarioDTO> listar() {
        return repository.findAll()
                .stream()
                .map(u -> new UsuarioDTO(
                        u.getId(),
                        u.getNome(),
                        u.getEmail(),
                        u.getRole(),
                        u.getCriadoEm()
                ))
                .toList();
    }

    public UsuarioDTO buscarPorId(Long id) {
        Usuario u = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return new UsuarioDTO(
                u.getId(),
                u.getNome(),
                u.getEmail(),
                u.getRole(),
                u.getCriadoEm()
        );
    }

    //  CRIAÇÃO DE USUÁRIO PUBLICO: SEMPRE ALUNO
    public UsuarioDTO criar(UsuarioCreateDTO dto) {

        if (repository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());

        // 🔐 Sempre ALUNO
        usuario.setRole(Role.ALUNO);

        // 🔐 Salva senha com hash
        usuario.setSenhaHash(passwordEncoder.encode(dto.getSenha()));

        Usuario salvo = repository.save(usuario);

        return new UsuarioDTO(
                salvo.getId(),
                salvo.getNome(),
                salvo.getEmail(),
                salvo.getRole(),
                salvo.getCriadoEm()
        );
    }

    // UPDATE APENAS PARA GESTOR (role pode mudar)
    public UsuarioDTO atualizar(Long id, UsuarioDTO dto) {

        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setNome(dto.getNome());
        usuario.setRole(dto.getRole()); // aqui sim pode vir GESTOR

        Usuario salvo = repository.save(usuario);

        return new UsuarioDTO(
                salvo.getId(),
                salvo.getNome(),
                salvo.getEmail(),
                salvo.getRole(),
                salvo.getCriadoEm()
        );
    }

    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado");
        }
        repository.deleteById(id);
    }
}
