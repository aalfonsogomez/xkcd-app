import { Text } from "@nextui-org/react";
import Link from "next/link";

export function Header() {
    return <header>
        <div>
            <Text small>next<Text>xkcd</Text></Text>
        </div>
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/">About</Link></li>
                <li><Link href="/">Search</Link></li>
            </ul>
        </nav>
    </header>
}