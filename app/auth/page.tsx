import Form from '@/components/auth/authform'
import Footer from '@/components/home/footer'
import Navbar from '@/components/home/navbar'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'

export default function Home() {
    return (
        <div>
            <ToastContainer position="top-right" />
            <Navbar />
            <Form />
            <Footer />
        </div>
    )
}