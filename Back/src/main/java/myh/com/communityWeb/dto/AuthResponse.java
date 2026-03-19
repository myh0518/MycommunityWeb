package myh.com.communityWeb.dto;

import lombok.*;

@Getter
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String username;
    private String email;
}