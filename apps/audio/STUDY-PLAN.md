# Web Audio API 학습 체크리스트

## 1단계 — 기본기

- [x] `필` AudioContext — 생성, 생명주기(running/suspended/closed), 브라우저 autoplay 정책
- [x] `필` AudioNode 그래프 — 소스→이펙트→destination 연결 구조, connect/disconnect
- [x] `필` MediaElementSourceNode — `<audio>` 태그와 Web Audio API 연결 (포자랩스 방식)
- [ ] `필` AudioBuffer & decodeAudioData — fetch→arrayBuffer→decode 파이프라인
- [ ] `필` GainNode — 볼륨 제어, mute/solo 패턴
- [ ] `상` AnalyserNode — getByteTimeDomainData vs getByteFrequencyData, fftSize

## 2단계 — 시각화 & 실전

- [ ] `필` requestAnimationFrame 루프 — 플레이바, 실시간 UI 업데이트
- [ ] `필` Canvas 파형 그리기 — getChannelData→Float32Array→Canvas, DPR 대응
- [ ] `상` 실시간 시각화 루프 — requestAnimationFrame + AnalyserNode 결합
- [ ] `중` AudioBufferSourceNode — 버퍼 재생, loop, playbackRate, start/stop
- [ ] `필` 멀티 트랙 믹싱 — 트랙별 GainNode 직렬 연결, solo/mute 독립 제어
- [ ] `중` AudioParam 스케줄링 — setValueAtTime, linearRampToValueAtTime, exponentialRamp
- [ ] `중` OscillatorNode — 주파수 기반 합성, type(sine/square/sawtooth/triangle)
- [ ] `하` MediaStreamSourceNode — 마이크 입력 (getUserMedia)
- [ ] `하` OfflineAudioContext — 실시간이 아닌 렌더링

## 3단계 — 고급

- [ ] `상` Web MIDI API — requestMIDIAccess, noteOn/noteOff, MIDI→주파수 변환
- [ ] `중` ADSR 엔벨로프 — Attack/Decay/Sustain/Release, gain 스케줄링으로 구현
- [ ] `하` BiquadFilterNode — lowpass/highpass/bandpass, EQ 구현
- [ ] `하` ConvolverNode — 리버브 (Impulse Response)
- [ ] `하` WaveShaperNode — 디스토션
- [ ] `하` StereoPannerNode / PannerNode — 스테레오/3D 공간 오디오
- [ ] `하` AudioWorklet — 커스텀 오디오 처리 (메인 스레드 분리)
- [ ] `상` 성능 최적화 — AudioContext 재사용, 노드 disconnect 타이밍, React cleanup 패턴

## 보너스 — 관련 Web API

- [ ] `하` MediaRecorder API — 오디오 녹음
- [ ] `중` Media Session API — 미디어 알림/컨트롤 (포자랩스 플레이바에서 썼던 것)
- [ ] `하` WebRTC — 실시간 오디오 통신 기초
