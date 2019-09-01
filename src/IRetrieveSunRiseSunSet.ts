import { SunSetSunRise } from "./Models/SunSetSunRise";

export interface IRetrieveSunSetSunRise {
	GetSunSetSunRise(today: Date, latitude: number, longitude: number) : Promise<SunSetSunRise>
}