import instance from '@/apis/instance';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';



interface GetCertificateTeacherResponse {
    user: {
        id: string;
        name: string;
        role: string;
        code: string;
        dateOfBirth: string;
        walletAddress: string;
        walletPrivateKey: string;
        password: string;
        createdAt: number;
        updatedAt: number;
    },
    certificate: {
        id: string;
        name: string;
        createdAt: number;
        updatedAt: number;    
    }
}

const URL = 'certificate/teacherCertificate';
export const useGetCertificateTeacher = (): UseQueryResult<GetCertificateTeacherResponse[]> => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CERTIFICATE_TEACHER],
        queryFn: async () => {
            const response =  await instance.get(`${URL}`);
            return response.data;
        },
    });
};