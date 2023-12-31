import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";

export default function Home() {
  return (
    <main className="text-center p-40 flex flex-col items-center justify-center">
      <div className="mb-12">
        <Image
          src="/icon/smart-home.png"
          alt="smarthome icon"
          width={1000}
          height={1000}
          className="w-36 h-36"
        />
      </div>
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-600">
        Welcome to Smart Home Portal v2
      </h1>

      <p className="font-semibold italic text-gray-400 mb-4 mt-4 ">
        Silahkan Login Untuk Masuk Kedalam Portal
      </p>

      <button className="bg-white border border-black text-black rounded-full p-3 text-sm mb-7 w-32 font-bold hover:bg-black hover:text-white">
        <LoginLink>Sign in</LoginLink>
      </button>
      <p className="font-semibold text-gray-500 mb-8 ">
        Belum Punya Akun?{" "}
        <RegisterLink className="text-blue-700">Register</RegisterLink>
      </p>
    </main>
  );
}
