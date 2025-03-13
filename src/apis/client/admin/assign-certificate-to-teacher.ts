import instance from '@/apis/instance';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

interface AssignCertificateToTeacherArgs {
    certificateTypeId: string;
    code: string;
}

interface AssignCertificateToTeacherResponse {
    id: string;
    createdAt: number;
    updatedAt: number;
    certificateTypeId: string;
    userId: string;
}

interface TeacherIdResponse {
    id: string;
    createdAt: number;
    updatedAt: number;
    code: string;
    dateOfBirth: string;
    name: string;
    role: string;
    walletAddress: string;
    walletPrivateKey: string;
    password: string;
}

const URL = 'certificate/teacherCertificate';
const GET_TEACHER_ID_URL = 'users/code'

const getIdTeacherByCode = async (code: string) => {
    const response = await instance.get<TeacherIdResponse>(`${GET_TEACHER_ID_URL}/${code}`);
    console.log("test", response.data);
    return response.data;
}

export const useAssignCertificateToTeacher = (): UseMutationResult<AssignCertificateToTeacherResponse, unknown, AssignCertificateToTeacherArgs> => {
    return useMutation<AssignCertificateToTeacherResponse, unknown, AssignCertificateToTeacherArgs>({
        mutationFn: async ({ certificateTypeId,code }) => {
            const userId = await getIdTeacherByCode(code);
            const response = await instance.post<AssignCertificateToTeacherResponse>(URL, {
                certificateTypeId,
                userId: userId.id
            });

            return response.data;
        }
    });
};