import { useMutation, UseMutationResult } from '@tanstack/react-query';
import instance from '../instance';
import { AxiosRequestConfig } from 'axios';
import { publicInstance } from '../publicInstance';


interface SignInPayload {
    code: string;
    password: string;
}

interface SignInResponse {
    token: string;
    refreshToken: string;
    expireAt: number;
    role: string;
}

const URL = '/auth/sign-in';
export const signIn = async ({ code, password }: SignInPayload) => {
    const response = await publicInstance.post<SignInResponse>(URL, { code, password });
    return response.data
};
