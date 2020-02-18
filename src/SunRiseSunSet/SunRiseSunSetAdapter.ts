import { IRetrieveSunSetSunRise } from "../IRetrieveSunRiseSunSet";
import { ISunSetSunRise } from "../Models/ISunSetSunRise";
import * as request from "request-promise";
import { SunRiseSunSetResponse } from "./SunRiseSunSetResponse";

export class SunRiseSunSetAdapter implements IRetrieveSunSetSunRise {
	private url = "https://api.sunrise-sunset.org/json?";
	private options: request.RequestPromiseOptions = {
		json: true
	};

	GetSunSetSunRise(latitude: number, longitude: number, day: Date): Promise<ISunSetSunRise> {
		return new Promise<ISunSetSunRise>((resolve, reject) => {
			request.get(`${this.url}lat=${latitude}&lng=${longitude}&date=${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}&formatted=0`, this.options)
				.then((response: SunRiseSunSetResponse) => {
					const returnModel: ISunSetSunRise = {
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