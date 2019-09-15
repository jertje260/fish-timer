import { IRetrieveSunSetSunRise } from "../src/IRetrieveSunRiseSunSet";
import { SunSetSunRise } from "../src/Models/SunSetSunRise";

export class InmemorySunRiseRetriever implements IRetrieveSunSetSunRise {
	public SunSetSunRises: SunSetSunRise[] = [];
	public Retrieved: boolean = false;

	GetSunSetSunRise(latitude: number, longitude: number, day: Date): Promise<SunSetSunRise> {
		return new Promise<SunSetSunRise>((resolve, reject) =>{		
			var toReturn = this.SunSetSunRises.find((element) =>{
				return element.SunRise.getFullYear() === day.getFullYear() && 
					element.SunRise.getMonth() === day.getMonth() && 
					element.SunRise.getDate() === day.getDate();
			})
			if(toReturn !== undefined){
				this.Retrieved = true;
				resolve(toReturn);
			} else {
				reject(new Error("SunSetSunRise not set"));
			}
		});

	}
	
}