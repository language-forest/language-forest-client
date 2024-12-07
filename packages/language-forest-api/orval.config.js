module.exports = {
    api: {
        input: "../../language-forest-api/api.yml", // OpenAPI 스펙 파일 경로
        output: {
            target: "./src/generated/api", // API 클라이언트 생성 위치
            mode: "tags-split", // 태그별로 파일 분리
            schemas: "./src/generated/schemas", // DTO(스키마) 파일 생성 위치
            client: "react-query", // React Query 사용
            mock: false, // Mocking 비활성화
            override: {
                title: (title) => `${title}Api`,
                mutator: {
                    path: "./fetchClient.ts", // 커스텀 axios 클라이언트 파일 경로
                    name: "fetchClient", // 사용될 인스턴스 이름
                },
                query: {

                    useMutation: false, // 모든 엔드포인트에서 useMutation 비활성화
                    useQuery: true,
                },
            },
        },
    },
};
