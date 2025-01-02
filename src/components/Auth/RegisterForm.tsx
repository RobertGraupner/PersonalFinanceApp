'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setError('');
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'An error occurred during registration');
        return;
      }

      // After successful registration, log in the user
      const signInResult = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.error) {
        setError(signInResult.error);
        return;
      }

      router.push('/transactions');
    } catch (error) {
      setError('An error occurred during registration:' + error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-preset-1 text-grey900">Sign up</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <div className="space-y-[16px]">
          <div className="relative">
            <label
              htmlFor="name"
              className="text-preset-5 font-bold text-grey500"
            >
              Name
            </label>
            <input
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              type="text"
              className="mt-1 flex h-10 w-full rounded-[8px] border border-beige500 px-3 py-2 text-preset-4 outline-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-beige500"
              placeholder="Jan Kowalski"
            />
            {errors.name && (
              <p className="absolute right-0 text-xs text-grey500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="email"
              className="text-preset-5 font-bold text-grey500"
            >
              Email
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              className="mt-1 flex h-10 w-full rounded-[8px] border border-beige500 px-3 py-2 text-preset-4 outline-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-beige500"
              placeholder="jan@example.com"
            />
            {errors.email && (
              <p className="absolute right-0 text-xs text-grey500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="text-preset-5 font-bold text-grey500"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      'Password must contain uppercase letter, number, and special character',
                  },
                })}
                type={showPassword ? 'text' : 'password'}
                className="mt-1 flex h-10 w-full rounded-[8px] border border-beige500 px-3 py-2 text-preset-4 outline-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-beige500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <Image
                    src="/images/icon-hide-password.svg"
                    alt="Hide password"
                    title="Hide password"
                    width={20}
                    height={20}
                  />
                ) : (
                  <Image
                    src="/images/icon-show-password.svg"
                    alt="Show password"
                    title="Show password"
                    width={20}
                    height={20}
                  />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="absolute right-0 text-xs text-grey500">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <div className="relative">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-[8px] bg-grey900 py-4 text-preset-4 font-bold text-white transition-colors hover:bg-grey900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
          {error && <p className="absolute text-xs text-red">{error}</p>}
        </div>
      </form>

      <div className="text-center">
        <p className="text-preset-4 text-grey500">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-preset-4 font-bold text-grey900 underline underline-offset-4 focus:rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige500 focus-visible:ring-offset-2"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
