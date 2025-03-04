'use client';

import SignInForm from '@/components/form/sign-in-form';
import React from 'react';

const SignInPage = () => {
    return (
        <div className="shadow-lg p-8 sm:p-10 dark:bg-form-foreground rounded-xl flex gap-6 mx-5 w-[900px]">
            <div className="hidden sm:flex justify-center items-start flex-col w-1/2">
                <h2 className="font-semibold text-3xl lg:text-4xl w-full mb-4">
                    Sign In
                </h2>
                <p className='text-lg font-normal'>
                    Sign in to your account to access your dashboard and manage
                    your profile.
                </p>
            </div>
            <div className="w-full sm:w-1/2">
                <SignInForm />
            </div>
        </div>
    );
};

export default SignInPage;