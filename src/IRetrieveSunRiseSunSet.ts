import { SunSetSunRise } from "./Models/SunSetSunRise";

export interface IRetrieveSunSetSunRise {
	GetSunSetSunRise(latitude: number, longitude: number, day: Date): Promise<SunSetSunRise>
}