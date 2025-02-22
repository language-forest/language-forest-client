/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Sample API
 * OpenAPI spec version: 1.0.0
 */
import type { GenderEnum } from './genderEnum';
import type { LanguageEnum } from './languageEnum';

export interface BaseUserInfo {
  /**
   * 옵션 - 성별
   * @nullable
   */
  gender?: GenderEnum;
  /**
   * 옵션 - 관심사
   * @nullable
   */
  interest?: string[] | null;
  /**
   * 옵션 - 2차 언어 (ex. JP)
   * @nullable
   */
  languageSecond?: LanguageEnum;
  /**
   * 옵션 - MBTI
   * @nullable
   */
  mbti?: string | null;
  /**
   * 옵션 - 직업
   * @nullable
   */
  occupation?: string | null;
  /**
   * 옵션 - 학습 목적
   * @nullable
   */
  purpose?: string | null;
  /**
   * 옵션 - 학습 장소 (ex. ONLINE, OFFLINE)
   * @nullable
   */
  studyPlace?: string | null;
  uid: string;
  /**
   * 옵션 - 태어난 해
   * @nullable
   */
  yearOfBirth?: number | null;
}
