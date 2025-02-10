/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Sample API
 * OpenAPI spec version: 1.0.0
 */

export interface BaseStudySummary {
  /** 하루 일지 기반 이모티콘 */
  emoji: string;
  id: string;
  /** 하루 일지 150자 이내 요약 */
  message: string;
  /** 유저가 선택한 키워드 */
  selectedTag: string;
  studyId: string;
  /** 하루 일지 한 문장 요약 */
  summary: string;
  /** 하루 일지 기반 4가지 키워드 */
  tags: string[];
}
