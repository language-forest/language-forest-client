/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Sample API
 * OpenAPI spec version: 1.0.0
 */
import type { LanguageEnum } from './languageEnum';
import type { LevelEnum } from './levelEnum';

export interface CreateUserStudyInfo {
  /** 학습할 언어 */
  language: LanguageEnum;
  /** 학습 난이도 */
  level: LevelEnum;
}
