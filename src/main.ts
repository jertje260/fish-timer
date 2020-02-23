import { UpdateProfilesWithNewTimes } from "./UpdateProfilesWithNewTimes";
import { SunRiseSunSetAdapter } from "./SunRiseSunSet/SunRiseSunSetAdapter";
import { SmartControlAdapter } from "./SmartControl/SmartControlAdapter";
import { IConfiguration } from "./IConfiguration";

var configString = process.env["SmartControlConfig"];
if(configString === undefined){
	console.error("missing config, please add the 'SmartControlConfig' environment variable");
	process.exit(1);
}

var smartControlIp = process.env["SmartControlHost"];
if(smartControlIp === undefined){
	console.error("missing config, please add the 'SmartControlHost' environment variable, should be ip. Example: 'http://192.169.1.10'");
	process.exit(1);
}

var config: IConfiguration = JSON.parse(configString);

const usecase = new UpdateProfilesWithNewTimes(
	new SunRiseSunSetAdapter(), 
	config,
	new SmartControlAdapter(smartControlIp));
usecase.execute()
.then(() => {
	console.info("updated profile successfully");
})
.catch((err: any) => {
	console.error("failed to update", err);
	process.exit(1)
});