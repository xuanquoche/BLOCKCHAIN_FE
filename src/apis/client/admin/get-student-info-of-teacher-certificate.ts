import instance from '@/apis/instance';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';


interface GetStudentInfoOfTeacherCertificateAgrs {
    teacherId: string;
}

export interface GetStudentInfoOfTeacherCertificateResponse {
    student: {
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
    teacherInfo: {
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
        status: string; 
    },
    certificateType: {
        id: string;
        name: string;
        createdAt: number;
        updatedAt: number;
    }
}

const URL = 'certificate/teacher'
export const useGetStudentInfoOfTeacherCertificate = ({
    teacherId
}: GetStudentInfoOfTeacherCertificateAgrs): UseQueryResult<GetStudentInfoOfTeacherCertificateResponse[]> => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_STUDENT_INFO_OF_TEACHER_CERTIFICATE, teacherId],
        queryFn: async () => {
            const response = await instance.get<GetStudentInfoOfTeacherCertificateResponse[]>(`${URL}/${teacherId}`);
            return response.data;
        },
        enabled: !!teacherId
    });
};