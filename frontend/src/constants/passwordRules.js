export const passwordRules = [
  { label: "8자 이상", test: (p) => p.length >= 8 },
  { label: "영문 포함", test: (p) => /[a-zA-Z]/.test(p) },
  { label: "숫자 포함", test: (p) => /[0-9]/.test(p) },
  { label: "특수문자 포함", test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p) },
];