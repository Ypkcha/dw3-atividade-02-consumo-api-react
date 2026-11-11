// Importando os hooks useState e useEffect
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/components/CatalogContent/CatalogContent.module.css";
import Loading from "@/components/Loading";
// Importando a biblioteca Axios
import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api/character";

const CatalogContent = () => {
  const router = useRouter();
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState(null);
  // Estado para controlar o gif de carregamento
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // A página atual vem da URL (/?page=2), assim o botão "voltar" dos detalhes mantém a página
  const page = Number(router.query.page) > 0 ? Number(router.query.page) : 1;

  // Busca a lista de personagens na API sempre que a página mudar
  useEffect(() => {
    // Aguarda o Next carregar a query da URL
    if (!router.isReady) return;

    let cancelled = false;

    const fetchCharacters = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(API_URL, { params: { page } });
        if (cancelled) return;
        setCharacters(response.data.results);
        setInfo(response.data.info);
      } catch (err) {
        if (cancelled) return;
        setCharacters([]);
        setInfo(null);
        setError(
          err.response && err.response.status === 404
            ? "Nenhum personagem encontrado nesta página."
            : "Não foi possível carregar os personagens. Tente novamente mais tarde."
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchCharacters();

    return () => {
      cancelled = true;
    };
  }, [router.isReady, page]);

  return (
    <div className={styles.catalogContent}>
      <div className={styles.catalogCard}>
        {/* TITLE */}
        <div className="title">
          <h2>Catálogo de personagens</h2>
        </div>

        {loading ? (
          <Loading loading={loading} />
        ) : error ? (
          <p className={styles.message}>{error}</p>
        ) : (
          <>
            <div className={styles.characters}>
              {characters.map((character) => (
                // Cada card é um link para a página de detalhes do personagem
                <Link
                  key={character.id}
                  href={`/personagem/${character.id}?page=${page}`}
                  className={styles.card}
                >
                  <img src={character.image} alt={character.name} />
                  <div className={styles.cardInfo}>
                    <h3>{character.name}</h3>
                    <span>{character.species}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* PAGINAÇÃO */}
            {info && (
              <div className={styles.pagination}>
                {info.prev ? (
                  <Link href={`/?page=${page - 1}`} className={styles.pageBtn}>
                    &laquo; Anterior
                  </Link>
                ) : (
                  <span className={`${styles.pageBtn} ${styles.disabled}`}>
                    &laquo; Anterior
                  </span>
                )}
                <span className={styles.pageInfo}>
                  Página {page} de {info.pages}
                </span>
                {info.next ? (
                  <Link href={`/?page=${page + 1}`} className={styles.pageBtn}>
                    Próxima &raquo;
                  </Link>
                ) : (
                  <span className={`${styles.pageBtn} ${styles.disabled}`}>
                    Próxima &raquo;
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CatalogContent;
