import { Profile } from "./Profile";
import { WeekStartingMonday } from "./Weekday";
import "../DateExtensions";

export class ProfileSchedule {
    constructor(private ProfileNames : string[], private WeekProfile: number[]) {

    }

    public GetPreviousDayForProfile(profile: Profile, currentDate: Date): Date {
        let found = false;
        let daysBack = 0;
        let day = WeekStartingMonday.indexOf(currentDate.GetDayOfWeek());
        while(!found){
            daysBack++;
            day--;
            if(day < 0){
                day = 6;
            }
            if(this.WeekProfile[day] == profile.Number){
                found = true;
            }
        }

        return currentDate.AddDays(-daysBack);
    }
}