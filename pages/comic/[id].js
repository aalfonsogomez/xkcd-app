import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from 'components/Header'
import { stat, readdir, readFile } from 'fs/promises'
import { basename } from 'path'

export default function Comic({ id, img, alt, title, width, height, nextId, prevId, hasNext, hasPrevious }) {
    return <>
        <Head>
            <title>xkcd - Comics for developers</title>
            <meta name="description" content="Comics for developers" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main>
            <section className="max-w-lg m-auto">
                <h1 className="font-bold text-xl text-center">{title}</h1>
                <div className="max-w-xs m-auto mb-4">
                    <Image
                        layout='responsive'
                        width={width}
                        height={height}
                        src={img}
                        alt={alt}
                    />
                </div>
                <p>{alt}</p>
                <div class="flex justify-between mt-4 font-bold">
                    {hasPrevious && <Link href={`/comic/${prevId}`}>
                        <span className="text-blue-500">⬅ Previous</span>
                    </Link>}
                    {hasNext && <Link href={`/comic/${nextId}`}>
                        <span className="text-blue-500">Next ➡</span>
                    </Link>}
                </div>
            </section>
        </main>
    </>
}

export async function getStaticPaths() {
    const files = await readdir('comics')

    const paths = files.map((file) => {
        const id = basename(file, '.json')
        return { params: { id } }
    })

    return {
        paths,
        fallback: false
    }

}

export async function getStaticProps({ params }) {
    const { id } = params

    const content = await readFile(`comics/${id}.json`, 'utf8')
    const comic = JSON.parse(content)

    const idNumber = +id
    const prevId = idNumber - 1
    const nextId = idNumber + 1

    const [prevResult, nextResult] = await Promise.allSettled([
        stat(`./comics/${prevId}.json`),
        stat(`./comics/${nextId}.json`)
    ])

    const hasPrevious = prevResult.status === 'fulfilled'
    const hasNext = nextResult.status === 'fulfilled'

    return {
        props: {
            ...comic,
            hasPrevious,
            hasNext,
            prevId,
            nextId
        }
    }
}
