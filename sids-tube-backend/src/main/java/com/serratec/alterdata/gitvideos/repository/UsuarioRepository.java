package com.serratec.alterdata.gitvideos.repository;

import com.serratec.alterdata.gitvideos.enums.Role;
import com.serratec.alterdata.gitvideos.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);
    List<Usuario> findByRole(Role role);
}