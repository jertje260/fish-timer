import { IRetrieveSunSetSunRise } from "../src/IRetrieveSunRiseSunSet";
import { SunSetSunRise } from "../src/Models/SunSetSunRise";

export class InmemorySunRiseRetriever implements IRetrieveSunSetSunRise {
	public SunSetSunRise: SunSetSunRise | null = null;
	public Retrieved: boolean = false;

	GetSunSetSunRise(latitude: number, longitude: number): Promise<SunSetSunRise> {
		return new Promise<SunSetSunRise>((resolve, reject) =>{		
			if(this.SunSetSunRise !== null){
				this.Retrieved = true;
				resolve(this.SunSetSunRise);
			} else {
				reject(new Error("SunSetSunRise not set"));
			}
		});

	}
	
}