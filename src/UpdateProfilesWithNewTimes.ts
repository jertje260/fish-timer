import { IRetrieveSunSetSunRise } from "./IRetrieveSunRiseSunSet";
import { IConfiguration } from "./IConfiguration";
import { IStoreSmartControlProfiles } from "./IStoreSmartControlProfiles";
import { SunSetSunRise } from "./Models/SunSetSunRise";
import { Profile } from "./Models/Profile";

export class UpdateProfilesWithNewTimes {
	constructor(private _sunSetRetriever: IRetrieveSunSetSunRise, private _config: IConfiguration, private _profileStore: IStoreSmartControlProfiles) {

	}

	public async execute(): Promise<void> {
		var today = new Date();

		var sunInfo = await this._sunSetRetriever.GetSunSetSunRise(this._config.location.latitude, this._config.location.longitude);

		var activeProfile = await this._profileStore.GetActiveProfile(today);

		var newProfile = this.updateProfileToMatchTimes(activeProfile, sunInfo);

		this._profileStore.UpdateProfile(newProfile);
	}

	private updateProfileToMatchTimes(profile: Profile, sunInfo: SunSetSunRise) : Profile {
		return profile;
	}
}