export interface IConfiguration {
	location: ILocation
	profileConfig: IProfilesConfig
}

export interface ILocation {
	latitude: number,
	longitude: number
}

export interface IProfilesConfig {
	[key:number] : IProfileConfig
}

export interface IProfileConfig {
	sunUpMatch: number,
	sunDownMatch: number
}