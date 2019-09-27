import { tsConstructorType } from "@babel/types";
import { TimesAsNumbers } from "./TimesAsNumber";
import { TimesAsDates } from "./TimesAsDates";

export class Profile {
	public Number: number;
	public Name: string;
	public Times: Array<Date>;
	public LightOne: number[];
	public LightTwo: number[];
	public LightThree: number[];
	public LightFour: number[];
	public CloudIntensity: number[];
	public CloudMotion: number[];

	constructor(
		number: number,
		name: string,
		times: TimesAsDates,
		lightOne: number[],
		lightTwo: number[],
		lightThree: number[],
		lightFour: number[],
		cloudIntensity: number[],
		cloudMotion: number[]
	)
	constructor(
		number: number,
		name: string,
		times: TimesAsNumbers,
		lightOne: number[],
		lightTwo: number[],
		lightThree: number[],
		lightFour: number[],
		cloudIntensity: number[],
		cloudMotion: number[]
	)
	constructor(
		number: number,
		name: string,
		times: TimesAsNumbers | TimesAsDates,
		lightOne: number[],
		lightTwo: number[],
		lightThree: number[],
		lightFour: number[],
		cloudIntensity: number[],
		cloudMotion: number[]) {
		this.Name = name;
		this.Number = number;
		if (times instanceof TimesAsDates) {
			this.Times = times.Content;
		} else if (times instanceof TimesAsNumbers) {
			this.Times = this.GetTimesAsDate(times.Content);
		} else{
			throw new Error("did you use the proper constructor?");
		}
		this.LightOne = lightOne;
		this.LightTwo = lightTwo;
		this.LightThree = lightThree;
		this.LightFour = lightFour;
		this.CloudIntensity = cloudIntensity;
		this.CloudMotion = cloudMotion;
	}


	GetTimesAsDate(timesInMinutes: number[]): Date[] {
		let times: Date[] = [];
		timesInMinutes.forEach(time => {
			var date = new Date();
			date.setSeconds(0);
			date.setMilliseconds(0);
			date.setHours(Math.floor(time / 60));
			date.setMinutes(time % 60);
			times.push(date);
		});
		return times;
	}

}