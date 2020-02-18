import { ISunSetSunRise } from "./Models/ISunSetSunRise";

export interface IRetrieveSunSetSunRise {
	GetSunSetSunRise(latitude: number, longitude: number, day: Date): Promise<ISunSetSunRise>
}