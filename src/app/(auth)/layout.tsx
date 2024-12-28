import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-beige100">
      {/* Logo on small screens */}
      <div className="flex h-16 items-center justify-center bg-grey900 px-5 md:hidden">
        <Image
          src="/images/logo-large.svg"
          alt="Finance logo"
          width={120}
          height={22}
        />
      </div>

      {/* Main content */}
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center gap-5 p-5">
        <div className="relative hidden h-full w-full max-w-[560px] md:block">
          <Image
            src="/images/illustration-authentication.svg"
            alt="Personal finance"
            height={920}
            width={560}
            className="rounded-xl object-cover"
            // priority for faster loading (default is lazy)
            priority
          />
          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-10 text-white">
            {/* Logo */}
            <Image
              src="/images/logo-large.svg"
              alt="Finance logo"
              width={120}
              height={22}
              priority
            />

            {/* Bottom text */}
            <div>
              <h2 className="mb-4 text-preset-1">
                Keep track of your money
                <br /> and save for your future
              </h2>
              <p className="text-preset-4">
                Personal finance app puts you in control of your spending. Track
                transactions, set budgets, and add to savings just easily.
              </p>
            </div>
          </div>
        </div>
        {/* Right side with form */}
        <main className="flex w-full max-w-[840px] items-center justify-center">
          <div className="w-full max-w-[560px] rounded-xl bg-white p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
