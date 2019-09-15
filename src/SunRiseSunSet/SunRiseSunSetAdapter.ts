import { IRetrieveSunSetSunRise } from "../IRetrieveSunRiseSunSet";
import { SunSetSunRise } from "../Models/SunSetSunRise";
import * as request from "request-promise";
import { SunRiseSunSetResponse } from "./SunRiseSunSetResponse";

export class SunRiseSunSetAdapter implements IRetrieveSunSetSunRise {
	private url = "https://api.sunrise-sunset.org/json?";
	private options: request.RequestPromiseOptions = {
		json: true
	};

	GetSunSetSunRise(latitude: number, longitude: number, day: Date): Promise<SunSetSunRise> {
		return new Promise<SunSetSunRise>((resolve, reject) => {
			request.get(`${this.url}lat=${latitude}&lng=${longitude}&date=${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}&formatted=0`, this.options)
				.then((response: SunRiseSunSetResponse) => {
					const returnModel: SunSetSunRise = {
						DayLength: response.results.day_length,
						SunRise: response.results.sunrise,
						SunSet: response.results.sunset
					}
					resolve(returnModel);
				})
				.catch(()=>{
					reject(new Error("Failed to get an OK response from sunrise-sunset api"));
				})
		})


	}

}