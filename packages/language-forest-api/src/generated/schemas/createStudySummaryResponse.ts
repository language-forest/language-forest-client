/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Sample API
 * OpenAPI spec version: 1.0.0
 */

export interface CreateStudySummaryResponse {
  /** 하루 일지 기반 이모티콘 */
  emoji?: string;
  /** 하루 일지 150자 이내 요약 */
  message?: string;
  studySummaryId?: string;
  /** 하루 일지 한 문장 요약 */
  summary?: string;
  /** 하루 일지 기반 4가지 키워드 */
  tags?: string[];
}
