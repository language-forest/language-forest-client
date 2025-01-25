/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Sample API
 * OpenAPI spec version: 1.0.0
 */
import type { GenderEnum } from './genderEnum';
import type { LanguageEnum } from './languageEnum';

export interface UpdateUserInfo {
  /** 옵션 - 성별 */
  gender?: GenderEnum;
  /** 옵션 - 관심사 */
  interest?: string;
  /** 옵션 - 2차 언어 (ex. JP) */
  languageSecond?: LanguageEnum;
  /** 옵션 - MBTI */
  mbti?: string;
  /** 옵션 - 직업 */
  occupation?: string;
  /** 옵션 - 학습 목적 */
  purpose?: string;
  /** 옵션 - 학습 장소 (ex. ONLINE, OFFLINE) */
  studyPlace?: string;
  /** 옵션 - 태어난 해 */
  yearOfBirth?: number;
}
