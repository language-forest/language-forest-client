import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { AuthKey } from "@repo/shared/storage";
import { loadCustomEnv } from "./loadEnv";

const { API_BASE_URL } = loadCustomEnv();
// 클라이언트 환경에서 요청 쿠키를 가져오는 함수
const getClientCookie = (name: string): string | undefined => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : undefined;
};

// Axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json", // 기본 Content-Type
  },
  withCredentials: true, // 쿠키 포함 요청 허용
});

// 요청 전 Authorization 헤더 추가
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getClientCookie(AuthKey.accessToken); // SSR 또는 클라이언트 환경에 따라 쿠키 처리

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가 (필요 시)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 응답 성공 처리
    return response;
  },
  (error) => {
    // 에러 처리
    if (error.response) {
      console.error("API 요청 중 오류 발생:", {
        status: error.response.status,
        data: error.response.data,
      });

      // 응답 데이터에서 에러 메시지를 추출
      if (error.response.data?.error) {
        console.error(
          "서버에서 반환된 에러 메시지:",
          error.response.data.error,
        );
      }
    } else {
      console.error("응답 없음 또는 네트워크 에러:", error.message);
    }
    return Promise.reject(error);
  },
);

// Axios 인스턴스를 사용하는 Mutator 함수 내보내기
export const fetchClient = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = axiosInstance({
    ...config,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};
