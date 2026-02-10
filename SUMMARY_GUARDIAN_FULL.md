# Guardian 기능 정리 (화면/컴포넌트/데이터)

## 1) 화면/페이지 단위 요약
- Auth 진입 (Login): ID/PW 입력, 로그인 버튼, 아이디/비밀번호 찾기 링크, 회원가입 이동.
- Signup: 회원가입 폼(ID/이름/비밀번호/확인/이메일), 중복확인 버튼, 약관 문구, 로그인 복귀.
- FindAccount: 아이디/비밀번호 찾기 탭, 입력 폼(이름/이메일 + 비밀번호 모드 시 아이디), 로그인 복귀.
- Home: 상태 카드(정상/주의/위험), 온습도 카드, 최근 알림, 실시간 모니터링 프리뷰.
- Notifications: 알림 목록, 알림 상세(읽음/미읽음, 위험도, 위치/설명), 긴급 연락 버튼(위험 시).
- Report: 일간/주간 활동 리포트, 차트(Bar/Line), 이상 징후 배너.
- Settings: 알림 설정 토글(야간 알림), 가족/공유/대상자 관리 메뉴, 오류 신고/로그아웃/회원 탈퇴.

## 2) 컴포넌트별 기능 요약
- `guardian/App.tsx`
  - 화면 전환 상태: `login | signup | find | app`.
  - 로그인 성공 시 홈 탭 렌더링.
- `guardian/components/AuthLayout.tsx`
  - 공통 Auth 레이아웃: 중앙 컨테이너, 로고/타이틀/카드 구성.
- `guardian/components/Login.tsx`
  - 로그인 폼 + FindAccount 이동 링크 + 회원가입 이동.
- `guardian/components/Signup.tsx`
  - 회원가입 폼, 중복확인 버튼, 가입 완료 후 로그인 복귀.
- `guardian/components/FindAccount.tsx`
  - ID/PW 탭 전환, `initialMode`로 기본 탭 지정.
- `guardian/components/Layout.tsx`
  - 상단 헤더(로고/로그아웃), 하단 탭 네비게이션.
- `guardian/components/Home.tsx`
  - 상태/환경 카드, 최근 알림 2건 표시, 실시간 모니터링 프리뷰.
- `guardian/components/Notifications.tsx`
  - 알림 리스트 및 상세 보기, 읽음/미읽음 처리 UI.
- `guardian/components/Report.tsx`
  - 일간/주간 리포트, 활동량 차트, 이상 감지 표시.
- `guardian/components/Settings.tsx`
  - 토글 설정 및 메뉴형 액션 버튼들.

## 3) 데이터/모듈/서비스 요약
- `guardian/data/mock.ts`
  - 사용자/대상자/장치/알림/상태/통계/환경 데이터 모의 값.
  - 알림 타입/위험도/상태 매핑 및 시간 포맷 유틸.

## 실행 관련
- 개발 서버: `npm run dev:guardian`
- 빌드: `npm run build:guardian`
- 프리뷰: `npm run preview` 또는 `npm run preview:guardian` (guardian 폴더)

## PWA 관련
- `vite.guardian.config.ts`: manifest + generateSW 설정.
- `guardian/main.tsx`: 서비스워커 등록.
- `guardian/public/icons/*`: PWA 아이콘.
