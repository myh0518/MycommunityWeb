package myh.com.communityWeb.dto;

import lombok.Getter;

@Getter
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String code;  // ← 이메일 인증 코드 추가
}