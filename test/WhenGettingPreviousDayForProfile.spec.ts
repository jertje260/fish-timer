import { ProfileSchedule } from "../src/Models/ProfileSchedule";
import { Profile } from "../src/Models/Profile";
import { DayOfWeek } from "../src/Models/Weekday";

describe('When getting previous day for profile', () => {
    describe('Given same profile everyday', () => {

        it('running on wednesday, should result on tuesday', () => {
            const schedule = GivenSameSchedule();
            const profile = GivenFirstProfile();
            const result = schedule.GetPreviousDayForProfile(profile, new Date(2019, 8, 25));

            expect(result.GetDayOfWeek())
                .toBe(DayOfWeek.Tuesday);
        });

        it('running on monday, should result on sunday', () => {
            const schedule = GivenSameSchedule();
            const profile = GivenFirstProfile();
            const result = schedule.GetPreviousDayForProfile(profile, new Date(2019, 8, 23));

            expect(result.GetDayOfWeek())
                .toBe(DayOfWeek.Sunday);
        });
    });
    describe('Given different profile everyday', () => {
        it('running on wednesday, should result on monday', () => {
            const schedule = GivenDifferentSchedule();
            const profile = GivenFirstProfile();
            const result = schedule.GetPreviousDayForProfile(profile, new Date(2019, 8, 25));

            expect(result.GetDayOfWeek())
                .toBe(DayOfWeek.Monday);
        });

        it('running on monday, should result on saturday', () => {
            const schedule = GivenDifferentSchedule();
            const profile = GivenFirstProfile();
            const result = schedule.GetPreviousDayForProfile(profile, new Date(2019, 8, 25));

            expect(result.GetDayOfWeek())
                .toBe(DayOfWeek.Saturday);
        });
    });

    describe('Given same profile last week', () => {
        it('running on monday return last week', () => {
            const schedule = GivenMondayOnlySchedule();
            const profile = GivenFirstProfile();
            const result = schedule.GetPreviousDayForProfile(profile, new Date(2019, 8, 23));

            expect(result)
                .toBe(new Date(2019, 8, 16));
        });
    });

});


function GivenSameSchedule(): ProfileSchedule {
    return new ProfileSchedule(['1', '2', '3', '4', '5', '6', '7'], [0, 0, 0, 0, 0, 0, 0]);
}

function GivenDifferentSchedule(): ProfileSchedule {
    return new ProfileSchedule(['1', '2', '3', '4', '5', '6', '7'], [0, 1, 0, 0, 1, 0, 1]);
}

function GivenMondayOnlySchedule(): ProfileSchedule {
    return new ProfileSchedule(['1', '2', '3', '4', '5', '6', '7'], [0, 1, 1, 1, 1, 1, 1]);
}

function GivenFirstProfile(): Profile {
    return new Profile(0, '', [], [], [], [], [], [], []);
}