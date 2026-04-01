package myh.com.communityWeb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    // 이메일 : 인증코드 임시 저장 (5분 후 자동 삭제)
    private final Map<String, String> codeStore = new ConcurrentHashMap<>();

    // 6자리 인증코드 생성 및 발송
    public void sendVerificationCode(String email) {
        String code = String.format("%06d", (int)(Math.random() * 1000000));
        codeStore.put(email, code);

        // 5분 후 자동 삭제
        Executors.newSingleThreadScheduledExecutor()
                .schedule(() -> codeStore.remove(email), 5, TimeUnit.MINUTES);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(email);
            helper.setSubject("[CommuniTy] 이메일 인증 코드");
            helper.setText(
                    "<div style='font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;border:1px solid #eee;border-radius:12px'>"
                            + "<h2 style='color:#4f46e5'>🌐 CommuniTy</h2>"
                            + "<p style='color:#374151'>아래 인증 코드를 입력해 주세요.</p>"
                            + "<div style='background:#f3f4f6;border-radius:8px;padding:24px;text-align:center;margin:24px 0'>"
                            + "<span style='font-size:32px;font-weight:bold;letter-spacing:8px;color:#4f46e5'>" + code + "</span>"
                            + "</div>"
                            + "<p style='color:#9ca3af;font-size:13px'>이 코드는 5분간 유효합니다.</p>"
                            + "</div>",
                    true
            );
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("이메일 발송에 실패했습니다.");
        }
    }

    // 코드 검증
    public boolean verifyCode(String email, String code) {
        String stored = codeStore.get(email);
        if (stored != null && stored.equals(code)) {
            codeStore.remove(email); // 인증 완료 후 삭제
            return true;
        }
        return false;
    }
}