'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/custom/button';
import { Form } from '@/components/ui/form';
import TextInputField from './text-input-field';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/apis/auth';
import { toast } from 'react-toastify';

const SignInForm = () => {
    const router = useRouter();


    const formSchema = z.object({
        code: z.string({required_error: "ID is required"}).min(1, { message: "ID is required" }),
        password: z
            .string({
                required_error: "Password is required"
            })
            .min(6, { message: "Password must be at least 8 characters" })
            .max(50, { message: "Password must be at most 50 characters" })
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: '',
            password: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await signIn(values);
            console.log("success", response)
            localStorage.setItem('token', JSON.stringify(response.token));
            localStorage.setItem('role', JSON.stringify(response.role));
            toast.success('login success')
            router.push('/admin');
        } catch (error) {
            console.log("login failed", error)
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                <TextInputField
                    label="ID"
                    name="code"
                    control={form.control}
                    type="text"
                    placeholder="Your code id"
                />
                <TextInputField
                    label="Password"
                    name="password"
                    control={form.control}
                    placeholder="Your password"
                    isPasswordField
                />
                <Link
                    href="#"    
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer w-fit"
                >
                    Forgot your password?
                </Link>
                <Button
                    type="submit"
                    variant="default"
                    className="bg-foreground dark:bg-primary "
                    loading={form.formState.isSubmitting}
                >
                    Sign In
                </Button>
                <div className="flex items-center justify-center my-5">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-2 text-sm font-semibold dark:text-foreground">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <Button className="bg-foreground space-x-2 dark:bg-background hover:dark:bg-background/90">
                    <FcGoogle />
                    <p className="text-xs sm:text-sm dark:text-foreground font-semibold">Sign In with Google</p>
                </Button>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                    You don't have an account?
                        <Link
                            href="#"
                            className="font-medium text-foreground hover:text-primary transition-colors"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </form>
        </Form>
    );
};

export default SignInForm;