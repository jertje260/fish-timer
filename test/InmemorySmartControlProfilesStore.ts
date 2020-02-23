import { IStoreSmartControlProfiles } from "../src/IStoreSmartControlProfiles";
import { Profile } from "../src/Models/Profile";
import { ProfileSchedule } from "../src/Models/ProfileSchedule";

export class InmemorySmartControlProfilesStore implements IStoreSmartControlProfiles {
	public ActiveProfile: Profile | null = null;
	public UpdatedProfile: Profile | null = null;
	public IsActiveProfileRetrieved = false;
	public IsProfileUpdated = false;


	GetActiveProfile(): Promise<Profile> {
		return new Promise((resolve, reject) => {
			this.IsActiveProfileRetrieved = true;
			if (this.ActiveProfile !== null) {
				return resolve(this.ActiveProfile);
			}
			reject(new Error("No profile given"));
		})
	}

	UpdateProfile(profile: Profile): Promise<void> {
		return new Promise((resolve, reject) => {
			this.IsProfileUpdated = true;
			this.UpdatedProfile = profile;
			resolve();
		})
	}
}