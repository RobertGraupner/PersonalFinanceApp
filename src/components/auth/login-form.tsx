'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import Image from 'next/image';
import Link from 'next/link';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      router.push('/transactions');
    } catch (error) {
      setError('An error occurred during login:' + error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-preset-1 text-grey900">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <div className="space-y-[16px]">
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
              placeholder="johny@english.com"
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
                    message: 'Password contains at least 8 characters',
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
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </button>
          {error && <p className="absolute text-xs text-red">{error}</p>}
        </div>
      </form>

      <div className="text-center">
        <p className="text-preset-4 text-grey500">
          Need to create an account?{' '}
          <Link
            href="/register"
            className="text-preset-4 font-bold text-grey900 underline underline-offset-4 focus:rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige500 focus-visible:ring-offset-2"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
