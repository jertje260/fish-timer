import { SmartControlAdapter } from "../src/SmartControl/SmartControlAdapter";

const available = false;
const _adapter = new SmartControlAdapter("http://smartcontroller.local");

if (available) {
	describe("given correct locally available smart controller", () => {

		it("should retrieve active profile", async () => {
			const activeProfile = await _adapter.GetActiveProfile();

			expect(activeProfile).not.toBeNull();
		});
	});
} else {
	describe.skip("given correct locally available smart controller", () => {
		it("should retrieve active profile", () => {

		});
	});
}