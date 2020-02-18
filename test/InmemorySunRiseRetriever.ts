import { IRetrieveSunSetSunRise } from "../src/IRetrieveSunRiseSunSet";
import { ISunSetSunRise } from "../src/Models/ISunSetSunRise";

export class InmemorySunRiseRetriever implements IRetrieveSunSetSunRise {
	public SunSetSunRises: ISunSetSunRise[] = [];
	public Retrieved: boolean = false;

	GetSunSetSunRise(latitude: number, longitude: number, day: Date): Promise<ISunSetSunRise> {
		return new Promise<ISunSetSunRise>((resolve, reject) =>{		
			var toReturn = this.SunSetSunRises.find((element) =>{
				return element.SunRise.getFullYear() === day.getFullYear() && 
					element.SunRise.getMonth() === day.getMonth() && 
					element.SunRise.getDate() === day.getDate();
			})
			if(toReturn !== undefined){
				this.Retrieved = true;
				return resolve(toReturn);
			} else {
				return reject(new Error("SunSetSunRise not set"));
			}
		});

	}
	
}