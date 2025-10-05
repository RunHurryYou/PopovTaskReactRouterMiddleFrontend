import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import characterData from "../../mocks/characters.json";
import { publickRoutes } from "../../routes/routes";
import { Image } from "antd";

export const CharacterCard = () => {
    const {id} = useParams()
    const character = characterData.find(character => character.id.toString() === id);
    const navigate = useNavigate();

    useEffect(() => {
        if(!id || !character)
            navigate(publickRoutes.notFound)
    }, [id, character, navigate]);

    return (
        <div className="character-card">
            <h1>{character && character.name} </h1>
            <Image
                width={300}
                src={character && character.image}
            />
            <p>status: {character && character.status}</p>
            <p>species: {character && character.species}</p>
            <p>gender: {character && character.gender}</p>
            <p>type: {character && character.type}</p>
            <p>created: {character && new Date(character.created).toLocaleDateString()}</p>
        </div>
    );
}