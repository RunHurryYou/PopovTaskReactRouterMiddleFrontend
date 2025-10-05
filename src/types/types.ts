export interface ICharacter {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    image: string;
    created: string;
}

export interface ILocation {
    id: number;
    name: string;
    type: string;
    dimension: string;
    created: string;
}

export interface IEpisode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    created: string;
}