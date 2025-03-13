import instance from '@/apis/instance';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';


interface GetUsersByRoleAgrs {
    role: string;
}

interface GetUsersByRoleResponse {
    id: string;
    name: string;
    role: string;
    createdAt: number | string;
    updatedAt: number | string;
    code: string;
    dateOfBirth: string;
    walletAddress: string;
    walletPrivateKey: string;
    password: string;
}

const URL = 'users/role'
export const useGetUsersByRole = ({
    role
}: GetUsersByRoleAgrs): UseQueryResult<GetUsersByRoleResponse[]> => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_TEACHERS, role],
        queryFn: async () => {
            const response = await instance.get(`${URL}/${role}`);
            return response.data;
        },
        enabled: !!role
    });
};