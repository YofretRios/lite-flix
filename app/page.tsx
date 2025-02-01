import { fetchHightlight, fetchPopular } from "@/services/moviesService";

export default async function Home() {
  const movie = await fetchHightlight();
  const popular = await fetchPopular();

  return (
    <div>
      <h1>Destacada</h1>
      <ul>
        <li key={movie.id}>{movie.title}</li>
      </ul>

      <h1>Popular</h1>
      <ul>
        {popular.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
