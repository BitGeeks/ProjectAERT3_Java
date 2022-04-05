package viminershopapi.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import viminershopapi.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import viminershopapi.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MyUserDetails implements UserDetailsService {

  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    final User appUser = userRepository.findByUsername(username);

    if (appUser == null) {
      throw new UsernameNotFoundException("User '" + username + "' not found");
    }

    List<GrantedAuthority> role_name= new ArrayList<>();

    return org.springframework.security.core.userdetails.User//
        .withUsername(username)
        .password(appUser.getPassword())
        .authorities(role_name)
        .accountExpired(false)
        .accountLocked(false)
        .credentialsExpired(false)
        .disabled(false)
        .build();
  }

}
