import Image from "next/image";
import Link from "next/link";

function Header() {
    return (
        <header className=" flex justify-around items-center mx-auto mt-5 border-b-2 pb-7">
            <Link href="/" className="flex flex-row items-center">
                <Image className="grow" src="/question.png" alt={""}
                    width={32}
                    height={32}
                />
                <h1 className="sm:text-4xl text-2xl font-bold ml-2 ">
                    Ai Interviews
                </h1>
            </Link>
            <a
                href="https://github.com/andaloussi-dev"
                target="_blank"
                rel="noreferrer"
            >
                <Image
                    alt="Vercel Icon"
                    src="/logo.svg"
                    className="sm:w-24 sm:h-[50px] w-8 h-[50px]"
                    width={50}
                    height={50}
                />
            </a>
        </header>
    )
}

export default Header