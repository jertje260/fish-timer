import { UpdateProfilesWithNewTimes } from "../src/UpdateProfilesWithNewTimes";
import { InmemorySunRiseRetriever } from "./InmemorySunRiseRetriever";

let _usecase : UpdateProfilesWithNewTimes;
let _sunsetStore: InmemorySunRiseRetriever;

describe("When Updating profiles", () => {
	beforeEach(()=>{
		_sunsetStore = new InmemorySunRiseRetriever();
		_usecase = new UpdateProfilesWithNewTimes(_sunsetStore)

	});
	it("Should retrieve sunrise & sunset", async () => {
		await _usecase.execute();
		expect(_sunsetStore.Retrieved).toBe(true);
	});
});