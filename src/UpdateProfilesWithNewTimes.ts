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

		var newProfile = this.updateProfileToMatchTimes(activeProfile.Clone(), sunInfo);

		this._profileStore.UpdateProfile(newProfile);
	}

	private updateProfileToMatchTimes(profile: Profile, sunInfo: ISunSetSunRise): Profile {
		const map = this._config.profileConfig[profile.Number];

		const times = profile.GetTimesAsArray();

		const sunUp = sunInfo.SunRise.getHours() * 60 + sunInfo.SunRise.getMinutes();
		const sunDown = sunInfo.SunSet.getHours() * 60 + sunInfo.SunSet.getMinutes();

		const beforeUpTimes: number[] = this.calculateNewTimes(times, 0, map.sunUpMatch, 0, sunUp, 0);
		const afterUpTimes: number[] = this.calculateNewTimes(times, map.sunUpMatch, map.sunDownMatch, sunUp, sunDown, beforeUpTimes[beforeUpTimes.length - 1]);
		const afterDownTimes: number[] = this.calculateNewTimes(times, map.sunDownMatch, times.length - 1, sunDown, 23 * 60 + 59, afterUpTimes[afterUpTimes.length - 1]);

		const newTimes = [0].concat(beforeUpTimes, afterUpTimes, afterDownTimes, 1439);
		newTimes.splice(newTimes.length - 1, 1);

		profile.Times = profile.GetTimesAsDate(newTimes);

		return profile;
	}

	private calculateNewTimes(times: number[], from: number, to: number, newStartTime: number, newEndTime: number, lastValue: number): number[] {
		const newTimes: number[] = [];
		const newLength = newEndTime - newStartTime;
		const totalLength = times[to] - times[from];
		let last = lastValue;
		for (let i = from + 1; i <= to; i++) {
			const distance = times[i] - times[i - 1];
			last += distance / totalLength * newLength;
			newTimes.push(Math.round(last));
		}

		return newTimes;
	}
}


[0, 2, 5, 7, 10]