import type { Faction } from "./faction_type";

export type Town = {
    id: number;
    name: string;
    mayor_name: string;
    faction: Faction;
    prosperity: number;
    population: number;
    isFactionCapita: boolean;
}