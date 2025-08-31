# Homecare Caregiver Application

요양보호사를 위한 웹 애플리케이션과 모바일 앱입니다.

## 📱 애플리케이션 종류

1. **Web Application** (`caregiver_web/`) - Remix.js 기반 웹 앱
2. **Mobile Application** (`caregiver_app/`) - Flutter WebView 앱 (웹 앱을 모바일에서 실행)

## 🚀 실행 방법

### Web Application (Remix.js)

#### 1. 의존성 설치

```bash
cd homecare_caregiver/caregiver_web
npm install
```

#### 2. 환경 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경변수를 설정하세요:

```env
# 백엔드 API 서버 URL
VITE_API_BASE_URL=http://localhost:8080/api

# 개발 서버 포트 (기본값: 5174)
VITE_PORT=5174
```

#### 3. 개발 서버 실행

```bash
npm run dev
```

애플리케이션이 `http://localhost:5174`에서 실행됩니다.

#### 4. 빌드

```bash
npm run build
```

빌드된 파일은 `build/` 디렉토리에 생성됩니다.

### Mobile Application (Flutter WebView)

#### 1. Flutter 환경 설정

```bash
# Flutter 설치 (macOS)
brew install flutter

# Flutter 환경 확인
flutter doctor
```

#### 2. 의존성 설치

```bash
cd homecare_caregiver/caregiver_app
flutter pub get
```

#### 3. 실행

```bash
# iOS 시뮬레이터로 실행
flutter run

# Android 에뮬레이터로 실행
flutter run
```

#### 4. 빌드

```bash
# Android APK 빌드
flutter build apk

# iOS 빌드 (macOS에서만 가능)
flutter build ios
```

## 📁 프로젝트 구조

```
homecare_caregiver/
├── caregiver_web/                 # 웹 애플리케이션 (Remix.js)
│   ├── app/
│   │   ├── components/           # 재사용 가능한 컴포넌트
│   │   ├── routes/              # 페이지 라우트
│   │   ├── api/                 # API 통신 모듈
│   │   ├── types/               # TypeScript 타입 정의
│   │   └── utils/               # 유틸리티 함수
│   ├── public/                  # 정적 파일
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── caregiver_app/                # 모바일 애플리케이션 (Flutter WebView)
│   ├── lib/                     # WebView 인터페이스
│   ├── android/                 # Android 설정
│   ├── ios/                     # iOS 설정
│   └── pubspec.yaml             # Flutter 의존성 정의
└── README.md                    # 이 파일
```

## 🛠 기술 스택

### Web Application
- **Framework**: Remix.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Build Tool**: Vite

### Mobile Application
- **Framework**: Flutter
- **Language**: Dart
- **WebView**: webview_flutter
- **Purpose**: 웹 앱을 모바일에서 실행하기 위한 인터페이스

## 🔧 주요 기능

### 인증
- 로그인/로그아웃
- JWT 토큰 기반 인증
- 자동 로그인 상태 유지

### 일정 관리
- 주간/월간 일정 조회
- 일정 상세 정보 확인
- 일정 상태 관리 (예정, 완료, 취소)

### 서비스 요청
- 새로운 서비스 요청 조회
- 요청 상태 관리
- 요청 상세 정보 확인

### 리뷰 관리
- 리뷰 작성
- 작성된 리뷰 조회
- 리뷰 수정

### 프로필 관리
- 개인 정보 조회/수정
- 계정 설정

## 🔌 API 연동

### 백엔드 서버
- **URL**: `http://localhost:8080/api`
- **인증**: Bearer Token (JWT)
- **Content-Type**: `application/json`

### 주요 API 엔드포인트
- `POST /caregiver/login` - 로그인
- `GET /caregiver/schedule` - 일정 조회
- `GET /caregiver/schedule/{id}` - 일정 상세 조회
- `GET /caregiver/service-request` - 서비스 요청 조회
- `POST /caregiver/review` - 리뷰 작성
- `GET /caregiver/profile` - 프로필 조회

## 🚨 주의사항

### Web Application
1. **백엔드 서버 실행 필요**: 애플리케이션 실행 전 백엔드 서버가 실행되어야 합니다.
2. **포트 충돌**: 기본 포트 5174가 사용 중인 경우 `.env` 파일에서 포트를 변경하세요.
3. **CORS 설정**: 백엔드에서 프론트엔드 도메인에 대한 CORS 설정이 필요합니다.

### Mobile Application
1. **웹 앱 실행 필요**: Flutter 앱 실행 전 웹 앱이 실행되어야 합니다.
2. **시뮬레이터/에뮬레이터**: iOS 시뮬레이터 또는 Android 에뮬레이터가 필요합니다.
3. **iOS 개발**: iOS 빌드는 macOS에서만 가능합니다.

## 🐛 문제 해결

### Web Application

#### 빌드 오류
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

#### 포트 충돌
```bash
# 다른 포트로 실행
npm run dev -- --port 3000
```

#### API 연결 오류
1. 백엔드 서버가 실행 중인지 확인
2. `.env` 파일의 API URL이 올바른지 확인
3. 네트워크 연결 상태 확인

### Mobile Application

#### Flutter 설치 문제
```bash
flutter doctor
flutter clean
flutter pub get
```

#### 빌드 오류
```bash
flutter clean
flutter pub get
flutter run
```

#### WebView 연결 오류
1. 웹 앱이 실행 중인지 확인
2. 네트워크 연결 상태 확인
