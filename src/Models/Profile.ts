import { tsConstructorType } from "@babel/types";

export class Profile {
	public Name: string;
	public Times: Date[];
	public LightOne: number[];
	public LightTwo: number[];
	public LightThree: number[];
	public LightFour: number[];
	public CloudIntensity: number[];
	public CloudMotion: number[];

	constructor(
		Name: string,
		timesAsDate: Date[],
		lightOne: number[],
		lightTwo: number[],
		lightThree: number[],
		lightFour: number[],
		cloudIntensity: number[],
		cloudMotion: number[]
	);
	constructor(
		Name: string,
		timesAsNumber: number[],
		lightOne: number[],
		lightTwo: number[],
		lightThree: number[],
		lightFour: number[],
		cloudIntensity: number[],
		cloudMotion: number[]
	);
	constructor(
		name: string,
		timesAsNumber: number[] | null,
		timesAsDate: Date[] | null,
		lightOne: number[],
		lightTwo: number[],
		lightThree: number[],
		lightFour: number[],
		cloudIntensity: number[],
		cloudMotion: number[]) {
			this.Name = name;
			if(timesAsDate !== null){
				this.Times = timesAsDate;
			}
			if(timesAsNumber !== null){
				this.Times = this.GetTimesAsDate(timesAsNumber);
			}
			this.LightOne = lightOne;
			this.LightTwo = lightTwo;
			this.LightThree = lightThree;
			this.LightFour = lightFour;
			this.CloudIntensity = cloudIntensity;
			this.CloudMotion = cloudMotion;
	}


	GetTimesAsDate(timesInMinutes: number[]): Date[]{
		let times : Date[] = [];
		timesInMinutes.forEach(time => {
			var date = new Date();
			date.setSeconds(0);
			date.setMilliseconds(0);
			date.setHours(Math.floor(time/60));
			date.setMinutes(time % 60);
			times.push(date);
		});
		return times;
	}

}