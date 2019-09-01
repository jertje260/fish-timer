import { IRetrieveSunSetSunRise } from "../IRetrieveSunRiseSunSet";
import { SunSetSunRise } from "../Models/SunSetSunRise";

export class SunRiseSunSetAdapter implements IRetrieveSunSetSunRise {
	GetSunSetSunRise(today: Date, latitude: number, longitude: number): Promise<SunSetSunRise> {
		throw new Error("Method not implemented.");
	}

}