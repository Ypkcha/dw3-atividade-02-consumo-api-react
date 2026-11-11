import Head from "next/head";
import Container from "@/components/Container";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import CharacterDetails from "@/components/CharacterDetails";

// Página de detalhes ("/personagem/[id]"): dados completos de um personagem
export default function CharacterPage() {
  return (
    <>
      <Head>
        <title>Rick and Morty - Detalhes</title>
        <meta
          name="description"
          content="Detalhes de um personagem da Rick and Morty API"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Menu />
        <Container>
          <CharacterDetails />
        </Container>
      </main>
      <Footer />
    </>
  );
}
