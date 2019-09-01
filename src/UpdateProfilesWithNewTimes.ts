import { IRetrieveSunSetSunRise } from "./IRetrieveSunRiseSunSet";

export class UpdateProfilesWithNewTimes {
	constructor(private sunSetRetriever: IRetrieveSunSetSunRise) {

	}

	public async execute(): Promise<void> {

	}
}