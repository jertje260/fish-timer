import { Profile } from "./Models/Profile";
import { ProfileSchedule } from "./Models/ProfileSchedule";

export interface IStoreSmartControlProfiles {
	GetActiveProfile(today: Date) : Promise<Profile>
	UpdateProfile(profile: Profile): Promise<void> 
}