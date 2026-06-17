package com.serratec.alterdata.gitvideos.security;

import com.serratec.alterdata.gitvideos.enums.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class UserDetailsImpl implements UserDetails {

    private static final long serialVersionUID = 1L;
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private Role role;

    public UserDetailsImpl(Long id, String nome, String email, String senha, Role role) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String roleComPrefixo = "ROLE_" + role.name();
        return List.of(new SimpleGrantedAuthority(roleComPrefixo));
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public Role getRole() { return role; }

    public String getEmail() { return email; }
    public String getSenha() { return senha; }
}