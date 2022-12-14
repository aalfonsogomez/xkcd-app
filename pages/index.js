import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { Footer } from 'components/Footer'
import { Header } from 'components/Header'

import fs from 'node:fs'

export default function Home({ latestComics }) {
    return (
        <>
            <Head>
                <title>xkcd - Comics for developers</title>
                <meta name="description" content="Comics for developers" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main>
                <h1 className="text-4xl font-bold">Welcome to next<span className="font-light">xkcd</span></h1>
                <p className="text-lg">A simple xkcd viewer built with Next.js</p>
                <h2 className="text-2xl font-bold">Latest Comics</h2>
                <section className='grid grid-cols-1 gap-2 max-w-md m-auto sm:grid-cols-2 md:grid-cols-3'>
                    {latestComics.map((comic) => {
                        return (
                            <Link href={`/comic/${comic.id}`} key={comic.id}>
                                <div className="mb-4 pb-4 m-auto cursor-pointer">
                                    <h3 className='font-bold text-sm text-center pb-2'>
                                        {comic.title}
                                    </h3>
                                    <Image
                                        width={comic.width}
                                        height={comic.height}
                                        src={comic.img}
                                        alt={comic.alt} />
                                </div>
                            </Link>
                        )
                    })}

                </section>
            </main>
            <Footer />
        </>
    )
}

export async function getStaticProps(context) {
    const files = fs.readdirSync('comics')
    const lastestComicsFiles = files.slice(-8, files.length)

    const promisesReadFiles = lastestComicsFiles.map(async (file) => {
        const content = await fs.readFileSync(`comics/${file}`, 'utf8')
        return JSON.parse(content)
    })

    const latestComics = await Promise.all(promisesReadFiles)

    return {
        props: {
            latestComics
        }
    }
}
