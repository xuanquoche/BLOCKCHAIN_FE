import instance from '@/apis/instance';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';



interface GetCertificateNameResponse {
    id: string;
    name: string;
    createdAt: number | string;
    updatedAt: number | string;
}

const URL = 'certificate/type/all'
export const useGetCertificateName = (): UseQueryResult<GetCertificateNameResponse[]> => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CERTIFICATE_NAME],
        queryFn: async () => {
            const response =  await instance.get(`${URL}`);
            return response.data;
        },
    });
};