/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Sample API
 * OpenAPI spec version: 1.0.0
 */
import type { LevelEnum } from './levelEnum';
import type { VoiceTypeEnum } from './voiceTypeEnum';

export interface UpdateUserStudyInfo {
  id: string;
  /** 학습 난이도 */
  level?: LevelEnum;
  /** 학습할 문장 수 */
  sentenceAmount?: number;
  /** ai 목소리 타입 */
  voiceType?: VoiceTypeEnum;
}
