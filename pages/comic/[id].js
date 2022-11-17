import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from 'components/Header'
import { readFile } from 'fs/promises'

export default function Comic({ id, img, alt, title, width, height }) {
    return <>
        <Head>
            <title>xkcd - Comics for developers</title>
            <meta name="description" content="Comics for developers" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main>
            <section className="max-w-lg m-auto">
                <h1 className="font-bold">{title}</h1>
                <Image
                    width={width}
                    height={height}
                    src={img}
                    alt={alt}
                />
                <p>{alt}</p>
            </section>
        </main>
    </>
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { id: '2597' } },
        ],
        fallback: false
    }

}

export async function getStaticProps({ params }) {
    const { id } = params
    const content = await readFile(`comics/${id}.json`, 'utf8')
    const comic = JSON.parse(content)
    return {
        props: {
            ...comic
        }
    }
}
