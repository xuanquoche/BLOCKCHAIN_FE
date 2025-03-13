import instance from '@/apis/instance';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

interface CreateCertificateTeacherStudentArgs {
    teacherId: string;
    status: string;
    certificateTypeId: string;
    users: {
        id: string
    }[];
}

interface CreateCertificateTeacherStudentResponse {
    id: string;
    createdAt: number;
    updatedAt: number;
    name: string;
}

const URL = 'certificate/teacher';

export const useCreateCertificateTeacherStudent = (): UseMutationResult<CreateCertificateTeacherStudentResponse, unknown, CreateCertificateTeacherStudentArgs> => {
    return useMutation<CreateCertificateTeacherStudentResponse, unknown, CreateCertificateTeacherStudentArgs>({
        mutationFn: async ({ teacherId, status, certificateTypeId, users}) => {
            const response = await instance.post(`${URL}/${teacherId}`, {
                status,
                certificateTypeId,
                users
            });

            return response.data;
        }
    });
};