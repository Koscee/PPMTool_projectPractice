package com.xclusive.ppmtool.services;

import com.xclusive.ppmtool.domain.User;
import com.xclusive.ppmtool.exceptions.UsernameAlreadyExistException;
import com.xclusive.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser) {
        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));

            // username has to be unique ( need Exception handler)
            newUser.setUsername(newUser.getUsername());

            // Make sure that password and confirmPassword match
            // We dont persist or show the confirmPassword
            newUser.setConfirmPassword("");

            return userRepository.save(newUser);
        } catch (Exception e) {
            throw new UsernameAlreadyExistException("Username '"+newUser.getUsername()+"' already exist");
        }
    }
}
