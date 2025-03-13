import instance from '@/apis/instance';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';


interface GetUserByIdAgrs {
    teacherId: string;
}

interface GetUserByIdResponse {
    id: string;
    name: string;
    role: string;
    createdAt: number;
    updatedAt: number;
    code: string;
    dateOfBirth: string;
    walletAddress: string;
    walletPrivateKey: string;
    password: string;
}

const URL = 'users/userId'
export const useGetUserById = ({
    teacherId
}: GetUserByIdAgrs): UseQueryResult<GetUserByIdResponse> => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_TEACHER_CODE, teacherId],
        queryFn: async () => {
            const response = await instance.get(`${URL}/${teacherId}`);
            console.log("response ", response)
            return response.data
        },
        enabled: !! teacherId 

    });
};