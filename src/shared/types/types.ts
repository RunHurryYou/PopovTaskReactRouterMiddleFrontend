export interface ICharacter {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    image: string;
    created: string;
    origin: ILocation;
    location: ILocation;
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

export interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  onIntersect?: () => void;
  enabled?: boolean;
}

export interface UseInfinityScrollProps<T> {
  fetchData: (page: number) => Promise<T[]>;
  initialPage?: number;
  hasMore?: boolean;
  threshold?: number;
  enabled?: boolean;
}