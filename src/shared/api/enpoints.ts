import type { ICharacter, IEpisode, ILocation } from "../types/types";
import axiosInstance from "./axios.config"

export const getCharacters = async (page: number): Promise<{info: {next: string | null}, results: ICharacter[]}>=>{
    try{
        const data = await axiosInstance.get(`/character?page=${page}`)
        return data.data;
    }catch(err){
        console.log(err);
        throw err;
    }
}

export const getEpisodes = async (page: number): Promise<{info: {next: string | null}, results: IEpisode[]}>=>{
    try{
        const data = await axiosInstance.get(`/episode?page=${page}`)
        return data.data;
    }catch(err){
        console.log(err);
        throw err;
    }
}

export const getLocations = async (page: number): Promise<{info: {next: string | null}, results: ILocation[]}>=>{
    try{
        const data = await axiosInstance.get(`/location?page=${page}`)
        return data.data;
    }catch(err){
        console.log(err);
        throw err;
    }
}