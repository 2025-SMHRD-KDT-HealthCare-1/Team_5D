# Frontend Implementation Status
- 화면명 | 경로 | 구현 상태 | 비고
- 관리자 로그인 | `admin/App.tsx` | Implemented | 로컬스토리지 기반 로그인/세션 (API 없음)
- 관리자 대시보드 | `admin/App.tsx` (dashboard) | Implemented | 요약 지표/최근 고위험 알림 UI
- 관리자 이벤트 모니터링 | `admin/components/Monitoring.tsx` (events) | Implemented | 실시간 목록/상태 변경/메모/알림 토글 로직
- 관리자 대상자 관리 | `admin/components/Monitoring.tsx` (targets) | Implemented | 대상자 상세/수정/활성화/보호자 연결 토글 로직
- 관리자 장치 관리 | `admin/components/Monitoring.tsx` (devices) | Implemented | 장치 등록/해제/재시작 요청 로직
- 관리자 통계/분석 | `admin/components/Statistics.tsx` | Implemented | 차트 UI 및 기간 전환 로직
- 보호자 홈 | `guardian/components/Home.tsx` | Implemented | 상태/최근 알림/모니터링 UI
- 보호자 알림 | `guardian/components/Notifications.tsx` | Implemented | 목록/상세 보기 UI
- 보호자 리포트 | `guardian/components/Report.tsx` | Implemented | 일/주간 UI 전환 및 차트
- 관리자 설정 | (라우팅 미구현) | Placeholder | 메뉴/라우트 없음, 대시보드 링크만 존재
- 보호자 설정 | `guardian/components/Settings.tsx` | UI Only | UI 토글/버튼 존재, 실제 기능/API 없음 (또한 설정 기능은 제외 규칙)

# Database Overview
- 설계 원칙
  - Implemented + UI Only 화면에서 **직접 드러난 데이터**만 반영한다.
  - Placeholder 화면은 DB 설계에 포함하지 않는다.
  - 관리자/보호자/대상자/이벤트(알림) 중심으로 구성하고, 과도한 정규화는 피한다.
  - 이벤트는 원본 데이터를 중심으로 저장하고, 통계는 필요 시 집계한다.
  - 원본 영상/이미지는 저장하지 않는다(UI 문구 기준).
- 프론트 미완성 화면 제외 방식
  - Placeholder로 분류된 화면은 DB 설계에서 제외하고, "Excluded / Future Screens"에만 기록한다.
  - 설정(Settings) 관련 기능은 규칙상 제외한다.

# Feature → Data Mapping
- 관리자 로그인/세션
  - 프론트 구현 상태: Implemented
  - 필요한 테이블: 없음
- 관리자 대시보드(요약 지표/최근 고위험 알림/장치 상태)
  - 프론트 구현 상태: Implemented
  - 필요한 테이블: `users`, `targets`, `devices`, `alerts`
- 관리자 이벤트 모니터링
  - 프론트 구현 상태: Implemented
  - 필요한 테이블: `alerts`, `alert_history`
- 관리자 대상자 관리
  - 프론트 구현 상태: Implemented
  - 필요한 테이블: `targets`, `users`, `alerts`
- 관리자 장치 관리
  - 프론트 구현 상태: Implemented
  - 필요한 테이블: `devices`, `device_error_logs`
- 관리자 통계/분석
  - 프론트 구현 상태: Implemented
  - 필요한 테이블: `alerts`, `device_error_logs`, `targets`, `devices`
- 보호자 홈(상태 카드/환경 지표/최근 알림)
  - 프론트 구현 상태: Implemented
  - 필요한 테이블: `targets`, `devices`, `environment_metrics`, `alerts`
- 보호자 알림
  - 프론트 구현 상태: Implemented
  - 필요한 테이블: `alerts`
- 보호자 리포트
  - 프론트 구현 상태: Implemented
  - 필요한 테이블: `alerts`

# Tables
## Table: users
- Purpose: 보호자 계정(역할 포함)을 식별하고 대상자와 연결하기 위함.
- Columns:
  | column | type | description |
  | --- | --- | --- |
  | user_id | string | 사용자 ID |
  | name | string | 사용자 이름 |
  | email | string | 이메일 |
  | role | enum('GUARDIAN','ADMIN') | 사용자 역할 |
  | created_at | datetime | 가입 일시 |
  | last_login_at | datetime | 마지막 로그인 일시 |
- Relations:
  - `targets.guardian_id` → `users.user_id`
- Notes:
  - 현재 UI에서는 관리자 로그인은 하드코딩되어 있어 실제 DB 인증은 미구현(TBD).

## Table: targets
- Purpose: 보호 대상자(피보호자) 기본 정보와 운영 상태를 관리.
- Columns:
  | column | type | description |
  | --- | --- | --- |
  | target_id | string | 대상자 ID |
  | guardian_id | string | 보호자 사용자 ID |
  | name | string | 대상자 이름 |
  | age | int | 나이 |
  | gender | enum('M','F') | 성별 |
  | created_at | datetime | 등록 일시 |
  | address | string | 주소 |
  | guardian_name | string | 보호자 이름(표시용) |
  | guardian_phone | string | 보호자 연락처 |
  | current_status | enum('SAFE','WARNING','DANGER') | 현재 상태 |
  | last_activity_at | datetime | 마지막 활동 시각 |
  | active_alert_count | int | 활성 알림 건수 |
  | last_event_summary | string | 최근 이벤트 요약 |
  | image_url | string | 프로필 이미지 URL |
  | notes | string | 특이사항 메모 |
  | is_active | boolean | 활성/비활성 |
  | guardian_linked | boolean | 보호자 연결 여부 |
  | risk_criteria | string | 위험 기준 설명(읽기 전용) |
  | is_deleted | boolean | 논리 삭제 여부 (default false) |
  | deleted_at | datetime | 삭제 시각 (nullable) |
- Relations:
  - `guardian_id` → `users.user_id`
- Notes:
  - 이벤트 히스토리는 `alerts`에서 조회해 표시(별도 테이블 불필요).
  - 기본 조회는 `is_deleted = false`만 반환.

## Table: devices
- Purpose: 대상자 설치 장치의 상태와 운영 정보를 관리.
- Columns:
  | column | type | description |
  | --- | --- | --- |
  | device_id | string | 장치 ID |
  | target_id | string | 연결 대상자 ID |
  | status | enum('ONLINE','OFFLINE') | 연결 상태 |
  | last_seen_at | datetime | 마지막 통신 시각 |
  | installed_at | datetime | 설치 일시 |
  | camera_count | int | 연결 카메라 수 |
  | firmware | string | 펌웨어 버전 |
  | device_health | enum('OK','ERROR') | 장치 건강 상태 |
  | restart_requested_at | datetime | 원격 재시작 요청 시각 |
  | is_registered | boolean | 등록 여부 |
  | is_deleted | boolean | 논리 삭제 여부 (default false) |
  | deleted_at | datetime | 삭제 시각 (nullable) |
- Relations:
  - `target_id` → `targets.target_id`
- Notes:
  - 가동 시간(uptime)은 표시용 값으로 계산 가능하므로 저장 대상에서 제외.
  - 기본 조회는 `is_deleted = false`만 반환.

## Table: alerts
- Purpose: 낙상/배회/무활동 등 이벤트(알림) 원본 기록.
- Columns:
  | column | type | description |
  | --- | --- | --- |
  | alert_id | string | 알림 ID |
  | target_id | string | 대상자 ID |
  | device_id | string | 장치 ID |
  | alert_type | enum('FALL','WANDER','INACTIVITY') | 이벤트 유형 |
  | risk_level | enum('LOW','MEDIUM','HIGH') | 위험도 |
  | detected_at | datetime | 발생 시각 |
  | status | enum('UNCONFIRMED','CONFIRMED','RESOLVED') | 처리 상태 |
  | is_read | boolean | 읽음 여부 |
  | guardian_notified | boolean | 보호자 알림 전송 여부 |
  | location | string | 발생 위치 |
  | description | string | 상세 설명 |
  | memo | string | 관리자 메모 |
- Relations:
  - `target_id` → `targets.target_id`
  - `device_id` → `devices.device_id`
- Notes:
  - 최근 고위험 알림, 대상자 이벤트 히스토리, 보호자 알림 목록의 원천 데이터.

## Table: alert_history
- Purpose: 알림 상태 변경/메모/알림 전송 등 이벤트 처리 히스토리 기록.
- Columns:
  | column | type | description |
  | --- | --- | --- |
  | id | string | 히스토리 ID |
  | alert_id | string | 알림 ID |
  | at | datetime | 기록 시각 |
  | status | enum('UNCONFIRMED','CONFIRMED','RESOLVED') | 당시 상태 |
  | note | string | 변경 내용 메모 |
- Relations:
  - `alert_id` → `alerts.alert_id`
- Notes:
  - 운영 감사/추적을 위해 삭제하지 않는 로그 성격.

## Table: device_error_logs
- Purpose: 장치 오류 이력을 추적(네트워크, 카메라 등).
- Columns:
  | column | type | description |
  | --- | --- | --- |
  | id | string | 오류 로그 ID |
  | device_id | string | 장치 ID |
  | at | datetime | 발생 시각 |
  | code | string | 오류 코드 |
  | detail | string | 상세 설명 |
- Relations:
  - `device_id` → `devices.device_id`
- Notes:
  - 장치 상태 요약 및 오류 유형 통계에 사용.

## Table: environment_metrics
- Purpose: 보호자 홈 화면의 온도/습도 표시를 위한 환경 지표 저장.
- Columns:
  | column | type | description |
  | --- | --- | --- |
  | id | string | 지표 ID |
  | temperature | number | 온도 |
  | humidity | number | 습도 |
  | measured_at | datetime | 측정 시각 |
- Relations:
  - 없음 (현재 UI는 단일 지표로만 사용)
- Notes:
  - 대상자/장치와의 연계는 코드에 드러나지 않아 미연결(TBD 가능).

# Excluded / Future Screens
- 관리자 설정
  - 제외 이유: 라우팅/메뉴 미구현(Placeholder)이며 현재 화면이 없음.
- 보호자 설정
  - 제외 이유: 설정 기능은 규칙상 제외. 또한 UI Only(토글/버튼만 존재, 실제 기능/API 없음).
- 보호자 설정 내 하위 항목(가족 초대/공유 권한/대상자 정보 수정/오류 신고/회원 탈퇴)
  - 제외 이유: 버튼/텍스트 수준의 UI만 존재하며 실제 기능/데이터 흐름이 없음.
