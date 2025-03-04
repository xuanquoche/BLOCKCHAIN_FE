'use client';

import { FormItem, FormLabel, FormControl, FormMessage, FormField } from '@/components/ui/form';
import { Control, FieldValues, FieldPath } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';
import { Button } from '@/components/custom/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TextInputFieldProps<T extends FieldValues> {
    label: string;
    name: FieldPath<T>;
    control: Control<T>;
    placeholder?: string;
    type?: string;
    isPasswordField?: boolean;
    className?: string;
}

const TextInputField = <T extends FieldValues>({
    label,
    name,
    control,
    placeholder,
    isPasswordField,
    className
}: TextInputFieldProps<T>) => {
    const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setIsVisiblePassword((prev) => !prev);
    };

    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem className="dark:bg-form-foreground">
                    <FormLabel className='text-base'>{label}</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                type={isPasswordField && !isVisiblePassword ? 'password' : 'text'}
                                placeholder={placeholder || label}
                                {...field}
                                className={cn('pr-10', className)}
                            />
                            {isPasswordField && (
                                <Button
                                    type="button"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer hover:bg-transparent"
                                    onClick={togglePasswordVisibility}
                                    aria-label={isVisiblePassword ? 'Hide Password' : 'Show Password'}
                                    variant="ghost"
                                >
                                    {isVisiblePassword ? <FaEyeSlash /> : <IoEyeSharp />}
                                </Button>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default TextInputField;