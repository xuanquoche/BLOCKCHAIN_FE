import instance from '@/apis/instance';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

interface AddTeacherArgs {
    code: string;
    name: string;
    password: string;
    dateOfBirth: string;
    role: string;
}

interface AddTeacherResponse {
    id: string;
    createdAt: number;
    updatedAt: number;
    name: string;
    code: string;
    dateOfBirth: string;
    role: number;
    walletId: string;
}

const URL = '/users';

export const useCreateUser = (): UseMutationResult<AddTeacherResponse, unknown, AddTeacherArgs> => {
    return useMutation<AddTeacherResponse, unknown, AddTeacherArgs>({
        mutationFn: async ({ name, code, password, dateOfBirth, role }) => {
            const response = await instance.post<AddTeacherResponse>(URL, {
                name,
                code,
                password,
                dateOfBirth,
                role
            });

            return response.data;
        }
    });
};