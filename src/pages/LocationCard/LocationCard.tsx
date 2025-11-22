import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import locationData from "../../mocks/location.json";
import { publickRoutes } from "../../shared/config/routes.config";

export const LocationCard = () => {
    const {id} = useParams()
    const location = locationData.find(location => location.id.toString() === id);
    const navigate = useNavigate();

    useEffect(() => {
        if(!id || !location)
            navigate(publickRoutes.notFound)
    }, [id, location, navigate]);

    return (
        <div className="location-card">
            <h1>{location && location.name} </h1>
            <p>dimension: {location && location.dimension}</p>
            <p>type: {location && location.type}</p>
            <p>created: {location && new Date(location.created).toLocaleDateString()}</p>
        </div>
    );
}