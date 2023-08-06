import Head from 'next/head'
import Contact from '../src/contact/Contact'
import { useDispatch } from 'react-redux';
import { getContacts } from '../src/redux/slice/contact';
import { useEffect } from 'react';

export default function Home() {

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <Contact/>
      </main>
    </>
  )
}
