import { IRetrieveSunSetSunRise } from "./IRetrieveSunRiseSunSet";
import { IConfiguration } from "./IConfiguration";
import { IStoreSmartControlProfiles } from "./IStoreSmartControlProfiles";
import { ISunSetSunRise } from "./Models/ISunSetSunRise";
import { Profile } from "./Models/Profile";
import { ProfileSchedule } from "./Models/ProfileSchedule";

export class UpdateProfilesWithNewTimes {
	constructor(private _sunSetRetriever: IRetrieveSunSetSunRise, private _config: IConfiguration, private _profileStore: IStoreSmartControlProfiles) {

	}

	public async execute(): Promise<void> {
		var today = new Date();

		var sunInfo = await this._sunSetRetriever.GetSunSetSunRise(this._config.location.latitude, this._config.location.longitude, today);

		var activeProfile = await this._profileStore.GetActiveProfile(today);

		var newProfile = this.updateProfileToMatchTimes(activeProfile, sunInfo);

		this._profileStore.UpdateProfile(newProfile);
	}

	private updateProfileToMatchTimes(profile: Profile, sunInfo: ISunSetSunRise) : Profile {
		const map = this._config.profileConfig[profile.Number];

		// TODO match start & end with sunup/down and make new times[] with new times
		map.sunDownMatch
		profile.Times

		return profile;
	}
}