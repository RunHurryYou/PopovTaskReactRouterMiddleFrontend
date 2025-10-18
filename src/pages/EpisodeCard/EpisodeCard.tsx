import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import episodeData from "../../mocks/episode.json";
import { publickRoutes } from "../../routes/routes";

export const EpisodeCard = () => {
    const {id} = useParams()
    const episode = episodeData.find(episode => episode.id.toString() === id);
    const navigate = useNavigate();

    useEffect(() => {
        if(!id || !episode)
            navigate(publickRoutes.notFound)
    }, [id, episode, navigate]);

    return (
        <div className="episode-card">
            <h1>{episode && episode.name} </h1>
            <p>air date: {episode && episode.air_date}</p>
            <p>episode: {episode && episode.episode}</p>
            <p>created: {episode && new Date(episode.created).toLocaleDateString()}</p>
        </div>
    );
}