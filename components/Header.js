import { Container, Text } from "@nextui-org/react";
import Link from "next/link";

export function Header() {
    return <header className="flex justify-between items-center p-4">
        <div>
            <h1 className='font-bold'>next<span className='font-light'>xkcd</span></h1>
        </div>
        <nav>
            <ul className="flex flex-row gap-2">
                <li><Link href="/"><span className='text-sm font-bold'>Home</span></Link></li>
                <li><Link href="/about"><span className='text-sm font-bold'>About</span></Link></li>
                <li><Link href="/search"><span className='text-sm font-bold'>Search</span></Link></li>
            </ul>
        </nav>
    </header>
}