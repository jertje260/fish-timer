import { UpdateProfilesWithNewTimes } from "../src/UpdateProfilesWithNewTimes";
import { InmemorySunRiseRetriever } from "./InmemorySunRiseRetriever";
import { IConfiguration } from "../src/IConfiguration";
import { SunSetSunRise } from "../src/Models/SunSetSunRise";
import { InmemorySmartControlProfilesStore } from "./InmemorySmartControlProfilesStore";
import { Profile } from "../src/Models/Profile";
import { TimesAsNumbers } from "../src/Models/TimesAsNumber";

let _useCase: UpdateProfilesWithNewTimes;
let _sunsetStore: InmemorySunRiseRetriever;
let _config: IConfiguration;
let _profileStore: InmemorySmartControlProfilesStore;

describe("When Updating profiles", () => {
	beforeEach(() => {
		_profileStore = new InmemorySmartControlProfilesStore();
		_sunsetStore = new InmemorySunRiseRetriever();
		_sunsetStore.SunSetSunRises = [{
			SunRise: new Date(2019, 0, 1, 5, 35, 0),
			SunSet: new Date(2019, 0, 1, 22, 59, 0),
			DayLength: 51444
		}];
		_config = {
			location: {
				latitude: 1.1,
				longitude: 1.1
			},
			smartControlIp: "http://127.0.0.1"
		}
		_useCase = new UpdateProfilesWithNewTimes(_sunsetStore, _config, _profileStore);


	});
	it("Should retrieve sunrise & sunset", async () => {
		GivenAProfile();
		await _useCase.execute();
		expect(_sunsetStore.Retrieved)
			.toBe(true);
	});

	it("Should get todays active profile", async () => {
		GivenAProfile();
		await _useCase.execute();
		expect(_profileStore.IsActiveProfileRetrieved)
			.toBe(true);
	});

	it("Should store updated profile", async () => {
		GivenAProfile();
		await _useCase.execute();
		expect(_profileStore.IsProfileUpdated)
			.toBe(true);
	});

	it("Should have different times on profile", async () => {
		GivenAProfile();
		await _useCase.execute();
		expect(_profileStore.UpdatedProfile!.Times)
			.not
			.toBe(_profileStore.ActiveProfile!.Times);
			
	});
});

function GivenAProfile() {
	_profileStore.ActiveProfile = new Profile(
		0,
		"profile1",
		new TimesAsNumbers([0,420,480,510,720,735,885,900,1170,1200,1290,1290,1439]),
		[0,0,30,100,100,30,30,100,100,30,0,0,0],
		[10,10,15,50,50,30,30,50,50,20,10,10,10],
		[0,0,60,100,100,30,30,100,100,50,0,0,0],
		[0,0,80,100,100,30,30,100,100,100,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
	);
}

