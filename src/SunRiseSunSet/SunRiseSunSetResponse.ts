export interface SunRiseSunSetResponse {
	results: SunRiseSunSetContent,
	status: string
}

export interface SunRiseSunSetContent {
	sunrise: Date,
	sunset: Date,
	solar_noon: Date,
	day_length: number,
	civil_twilight_begin: Date,
	civil_twilight_end: Date,
	nautical_twilight_begin: Date,
	nautical_twilight_end: Date,
	astronomical_twilight_begin: Date,
	astronomical_twilight_end: Date
}