package com.serratec.alterdata.gitvideos.service;

import com.serratec.alterdata.gitvideos.model.Usuario;
import com.serratec.alterdata.gitvideos.repository.UsuarioRepository;
import com.serratec.alterdata.gitvideos.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        return new UserDetailsImpl(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getSenhaHash(),
                usuario.getRole()
        );
    }
}