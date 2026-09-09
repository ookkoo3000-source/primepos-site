# 프라임포스 (PrimePOS)

포스기·카드단말기·키오스크·테이블오더·무인자판기 비교 견적 랜딩페이지.
참고: hsupporter.com(픽포스) — 같은 상품군의 경쟁 페이지, 구조만 참고하고 문구·디자인은 자체 제작.

## 구성

| 파일 | 설명 |
|---|---|
| `index.html` | 원페이지 랜딩 (히어로+3초진단 / 카탈로그 탭 / 비용계산기 / 절차 / 업종별 세트 / 교체·철거 / FAQ / 견적폼) |
| `blog/index.html` | 블로그 목록 |
| `blog/pos-rental-vs-purchase.html` | 첫 글 (예시) |
| `blog/_template.html` | 새 글 템플릿 |
| `assets/style.css` | 전체 스타일 (딥 네이비 + 코럴 + Pretendard) |
| `assets/script.js` | 진단 로직 · 탭 · 계산기 · 모바일 메뉴. **단가는 `PRICE` 한 곳만 수정** |
| `assets/form.js` | 견적폼 → FormSubmit → `ookkoo12@naver.com` |
| `assets/img/*.jpg` | 장비 이미지 6종 |
| `CNAME` | `pos.primeadmit.co.kr` |

## 단가 수정

`assets/script.js` 상단 `PRICE` 객체를 고치면 **계산기 + 3초 진단** 금액이 바뀝니다.
카탈로그 탭·업종별 세트에 직접 적힌 금액(`렌탈 월 22,000원~` 등)은 `index.html`에서 함께 수정하세요.

## 폼

`assets/form.js` 의 `FORM_ENDPOINT` = FormSubmit AJAX (`ookkoo12@naver.com`).
다른 프로젝트와 같은 수신 이메일이라 이미 인증됨. 새 도메인에서 첫 제출 시 인증 메일이 한 번 더 올 수 있음 → 클릭.

## 배포 (GitHub Pages)

1. GitHub에 새 레포 생성: `ookkoo3000-source/primepos-site` (public)
2. ```
   cd ~/projects/primepos-site
   git add -A && git commit -m "init: 프라임포스 랜딩"
   git branch -M main
   git remote add origin https://github.com/ookkoo3000-source/primepos-site.git
   git push -u origin main
   ```
3. 레포 Settings → Pages → Source: `main` / `/ (root)` → Save
4. 가비아 DNS: `pos` CNAME → `ookkoo3000-source.github.io`
5. Pages 설정에서 Custom domain `pos.primeadmit.co.kr` 입력 → HTTPS 발급 대기
   (cert 안 나오면 커스텀 도메인 껐다 켜기 — 다른 프로젝트에서 검증된 방법)

## 로컬 미리보기

```
Start-Process "C:\Users\ookko\projects\primepos-site\index.html"
```

## 새 블로그 글 추가

1. `blog/_template.html` 복사 → `blog/<키워드-슬러그>.html`
2. `{{TITLE}}` 등 치환, 본문 작성 (서론 300자+, h2 6개+, FAQ 3개, LSI 키워드)
3. `blog/index.html` 의 `<!-- BLOG_GRID_START -->` 아래에 카드 추가 (최신순 맨 위)
4. `sitemap.xml` 에 URL 한 줄 추가
