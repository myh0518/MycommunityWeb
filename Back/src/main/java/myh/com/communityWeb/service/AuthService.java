package myh.com.communityWeb.service;

import myh.com.communityWeb.domain.User;
import myh.com.communityWeb.dto.*;
import myh.com.communityWeb.repository.UserRepository;
import myh.com.communityWeb.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    // 회원가입
    public AuthResponse register(RegisterRequest request) {
        // 비밀번호 최소 조건 검사 (8자 이상, 영문, 숫자, 특수문자 포함)
        if (!isValidPassword(request.getPassword())) {
            throw new RuntimeException("비밀번호는 8자 이상, 영문/숫자/특수문자를 포함해야 합니다.");
        }

        // 이메일 인증 확인
        if (!emailService.verifyCode(request.getEmail(), request.getCode())) {
            throw new RuntimeException("이메일 인증 코드가 올바르지 않거나 만료되었습니다.");
        }

        // 중복 확인
        if (userRepository.existsByEmail(request.getEmail()))
            throw new RuntimeException("이미 사용 중인 이메일입니다.");
        if (userRepository.existsByUsername(request.getUsername()))
            throw new RuntimeException("이미 사용 중인 닉네임입니다.");

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getUsername(), user.getEmail());
    }

    // 로그인
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("등록되지 않은 이메일입니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
            throw new RuntimeException("비밀번호가 틀렸습니다.");

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getUsername(), user.getEmail());
    }

    // 비밀번호 조건 검사
    private boolean isValidPassword(String password) {
        if (password == null || password.length() < 8) return false;
        boolean hasLetter = password.matches(".*[a-zA-Z].*");
        boolean hasDigit = password.matches(".*[0-9].*");
        boolean hasSpecial = password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*");
        return hasLetter && hasDigit && hasSpecial;
    }
}