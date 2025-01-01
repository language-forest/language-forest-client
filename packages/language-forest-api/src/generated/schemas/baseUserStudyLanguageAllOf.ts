/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Sample API
 * OpenAPI spec version: 1.0.0
 */
import type { LanguageEnum } from './languageEnum';
import type { LevelEnum } from './levelEnum';

export type BaseUserStudyLanguageAllOf = {
  readonly id: string;
  language: LanguageEnum;
  level: LevelEnum;
  /** 학습 목적 */
  purpose: string;
  readonly uid: string;
};
