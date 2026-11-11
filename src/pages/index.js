import Head from "next/head";
import Container from "@/components/Container";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import CatalogContent from "@/components/CatalogContent";

// Página principal ("/"): catálogo de personagens
export default function Home() {
  return (
    <>
      <Head>
        <title>Rick and Morty - Catálogo</title>
        <meta
          name="description"
          content="Catálogo de personagens consumindo a Rick and Morty API com React e Next.js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Menu />
        <Container>
          <CatalogContent />
        </Container>
      </main>
      <Footer />
    </>
  );
}
