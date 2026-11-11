import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/components/CharacterDetails/CharacterDetails.module.css";
import Loading from "@/components/Loading";
import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api/character";

// Traduções dos valores retornados pela API
const STATUS = { Alive: "Vivo", Dead: "Morto", unknown: "Desconhecido" };
const GENDER = {
  Female: "Feminino",
  Male: "Masculino",
  Genderless: "Sem gênero",
  unknown: "Desconhecido",
};
const STATUS_CLASS = { Alive: "alive", Dead: "dead", unknown: "unknown" };

const CharacterDetails = () => {
  const router = useRouter();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Identificador recebido pela rota (/personagem/[id]) e página de origem do catálogo
  const { id, page } = router.query;
  const backHref = page ? `/?page=${page}` : "/";

  // Busca os dados completos do personagem pelo identificador
  useEffect(() => {
    if (!router.isReady) return;

    let cancelled = false;

    const fetchCharacter = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        if (cancelled) return;
        setCharacter(response.data);
      } catch (err) {
        if (cancelled) return;
        setCharacter(null);
        setError(
          err.response && err.response.status === 404
            ? "Personagem não encontrado."
            : "Não foi possível carregar o personagem. Tente novamente mais tarde."
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchCharacter();

    return () => {
      cancelled = true;
    };
  }, [router.isReady, id]);

  return (
    <div className={styles.detailsContent}>
      <div className={styles.detailsCard}>
        {/* BOTÃO PARA VOLTAR AO CATÁLOGO */}
        <Link href={backHref} className={styles.backBtn}>
          &larr; Voltar ao catálogo
        </Link>

        {loading ? (
          <Loading loading={loading} />
        ) : error ? (
          <p className={styles.message}>{error}</p>
        ) : (
          <div className={styles.character}>
            <img src={character.image} alt={character.name} />
            <div className={styles.info}>
              <h2>{character.name}</h2>
              <span
                className={`${styles.badge} ${styles[STATUS_CLASS[character.status] || "unknown"]}`}
              >
                {STATUS[character.status] || character.status}
              </span>
              <ul>
                <li>
                  <strong>Espécie:</strong> {character.species}
                </li>
                <li>
                  <strong>Tipo:</strong> {character.type || "Não informado"}
                </li>
                <li>
                  <strong>Gênero:</strong>{" "}
                  {GENDER[character.gender] || character.gender}
                </li>
                <li>
                  <strong>Origem:</strong> {character.origin.name}
                </li>
                <li>
                  <strong>Última localização:</strong> {character.location.name}
                </li>
                <li>
                  <strong>Criado na API em:</strong>{" "}
                  {new Date(character.created).toLocaleDateString("pt-BR")}
                </li>
                <li>
                  <strong>Aparece em {character.episode.length} episódio(s):</strong>
                </li>
              </ul>
              <div className={styles.episodes}>
                {character.episode.map((url) => (
                  <span key={url}>Ep. {url.split("/").pop()}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterDetails;
