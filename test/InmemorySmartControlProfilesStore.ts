import { IStoreSmartControlProfiles } from "../src/IStoreSmartControlProfiles";
import { Profile } from "../src/Models/Profile";

export class InmemorySmartControlProfilesStore implements IStoreSmartControlProfiles {

	public ActiveProfile: Profile | null = null;
	public UpdatedProfile: Profile | null = null;
	public IsActiveProfileRetrieved: boolean = false
	public IsProfileUpdated: boolean = false;


	GetActiveProfile(today: Date): Promise<Profile> {
		return new Promise((resolve, reject) => {
			this.IsActiveProfileRetrieved = true;
			if (this.ActiveProfile !== null) {
				resolve(this.ActiveProfile);
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