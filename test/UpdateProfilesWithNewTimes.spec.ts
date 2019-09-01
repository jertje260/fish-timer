import { UpdateProfilesWithNewTimes } from "../src/UpdateProfilesWithNewTimes";
import { InmemorySunRiseRetriever } from "./InmemorySunRiseRetriever";
import { IConfiguration } from "../src/IConfiguration";
import { SunSetSunRise } from "../src/Models/SunSetSunRise";
import { InmemorySmartControlProfilesStore } from "./InmemorySmartControlProfilesStore";

let _usecase: UpdateProfilesWithNewTimes;
let _sunsetStore: InmemorySunRiseRetriever;
let _config: IConfiguration;
let _profileStore: InmemorySmartControlProfilesStore;

describe("When Updating profiles", () => {
	beforeEach(() => {
		_profileStore = new InmemorySmartControlProfilesStore();
		_sunsetStore = new InmemorySunRiseRetriever();
		_sunsetStore.SunSetSunRise = {
			SunRise: new Date(2019, 0, 1, 5, 35, 0),
			SunSet: new Date(2019, 0, 1, 22, 59, 0),
			DayLength: 51444
		};
		_config = {
			location: {
				latitude: 1.1,
				longitude: 1.1
			},
			smartControlIp: "http://192.168.0.1"
		}
		_usecase = new UpdateProfilesWithNewTimes(_sunsetStore, _config, _profileStore);


	});
	it("Should retrieve sunrise & sunset", async () => {
		GivenAProfile();
		await _usecase.execute();
		expect(_sunsetStore.Retrieved)
			.toBe(true);
	});

	it("Should get todays active profile", async () => {
		GivenAProfile();
		await _usecase.execute();
		expect(_profileStore.IsActiveProfileRetrieved)
			.toBe(true);
	});

	it("Should store updated profile", async () => {
		GivenAProfile();
		await _usecase.execute();
		expect(_profileStore.IsProfileUpdated)
			.toBe(true);
	});
});

function GivenAProfile() {
	_profileStore.ActiveProfile = {

	}
}