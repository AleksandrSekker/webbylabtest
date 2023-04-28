import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "@/layout/Layout";
import { Provider } from "react-redux";
import { store } from "../../store";
import {useRouter} from "next/router";
import {useEffect} from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken && router.pathname !== "/auth") {
      router.push("/auth");
    }
  }, [router, router.pathname]);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
