import instance from '@/apis/instance';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

interface CreateCertificateArgs {
    name: string;
}

interface CreateCertificateResponse {
    id: string;
    createdAt: number;
    updatedAt: number;
    name: string;
}

const URL = '/certificate/type/create';

export const useCreateCertificate = (): UseMutationResult<CreateCertificateResponse, unknown, CreateCertificateArgs> => {
    return useMutation<CreateCertificateResponse, unknown, CreateCertificateArgs>({
        mutationFn: async ({ name,}) => {
            const response = await instance.post(URL, {
                name,
            });

            return response.data;
        }
    });
};