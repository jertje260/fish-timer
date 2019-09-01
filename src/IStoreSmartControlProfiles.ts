import { Profile } from "./Models/Profile";

export interface IStoreSmartControlProfiles {
	GetActiveProfile(today: Date) : Promise<Profile>
	UpdateProfile(profile: Profile): Promise<void> 
}