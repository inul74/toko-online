import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function Login() {
  return (
    <main className="w-full flex justify-center items-center bg-gray-300 min-h-screen">
      <section className="flex flex-col gap-3">
        <div className="flex justify-center">
          <img className="h-12 md:h-16 mb-2" src="/logo.png" alt="Logo" />
        </div>
        <div className="flex flex-col gap-3 bg-white md:p-10 p-5 rounded-xl md:min-w-[440px] w-full">
          <h1 className="font-bold text-xl">Login with email</h1>
          <form className="flex flex-col gap-3">
            <input
              placeholder="Enter Your Email"
              type="email"
              name="user-email"
              id="user-email"
              className="px-3 py-2 rounded-xl border focus:outline-none w-full"
            />
            <input
              placeholder="Enter Your Password"
              type="password"
              name="user-password"
              id="user-password"
              className="px-3 py-2 rounded-xl border focus:outline-none w-full"
            />
            <Button type="submit" color="primary">
              Login
            </Button>
          </form>
          <div className="flex gap-4 justify-between">
            <Link href={`/sign-up`}>
              <button className="font-semibold text-sm text-blue-700">
                New? Create Account
              </button>
            </Link>
            <Link href={`/forget-password`}>
              <button className="font-semibold text-sm text-blue-700">
                Forget Password?
              </button>
            </Link>
          </div>
          <hr />
          <Button>Sign in with Google</Button>
        </div>
      </section>
    </main>
  );
}
