import Link from "next/link";
import Image from "next/image";
import Candles from "@/public/assets/images/candles.png"

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6 grid lg:grid-cols-[1fr_500px] gap-12 items-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-sans text-gray-900 dark:text-gray-100">
            Enter the new era: the fastest, most secure gateway to the future of
            finance.
          </h1>
          <p className="max-w-[600px] text-gray-700 md:text-xl dark:text-gray-400 font-sans">
            Fortress your future. Buy, sell, and securely store your crypto.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-[#f0f0f0] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9333ea] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#9333ea] dark:text-gray-100 dark:hover:bg-[#7e22ce] dark:focus-visible:ring-white font-sans"
              href="#"
            >
              Trade Now
            </Link>
          </div>
        </div>
        <Image
          alt="Hero"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
          height="550"
          src={Candles}
          width="550"
        />
      </div>
    </section>
  );
}
