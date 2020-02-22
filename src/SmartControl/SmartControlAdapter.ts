import { IStoreSmartControlProfiles } from "../IStoreSmartControlProfiles";
import { Profile } from "../Models/Profile";
import * as http from "http";
import * as querystring from "querystring";
import { TimesAsNumbers } from "../Models/TimesAsNumber";

export class SmartControlAdapter implements IStoreSmartControlProfiles {
	private Ip: string;
	constructor(ip: string) {
		this.Ip = ip;
	}


	public GetActiveProfile(today: Date): Promise<Profile> {
		// get current profile
		// then form post to set current profile to edit
		// then get editvars to get all profile settings

		

	}

	private getCurrentEditableProfileVariables(): Promise<Profile> {
		return new Promise((resolve, reject) => {
			http.get({
				host: this.Ip,
				port: 80,
				path: 'profeditvars.js',
			}, (res) => {
				if (res.statusCode === 200) {
					let body = "";
					res.on("data", (chunk) => {
						body += chunk;
					});
					res.on("end", () =>{
						return resolve(this.parseBodyAsProfile(body));
					})
				} else {
					return reject("Didn't receive successfull status code when getting active profile");
				}
			}).on("error", (error) => {
				return reject(`Failed with error: ${error}`);
			});
		});
	}

	private setCurrentProfileAsEditable(profileNumber: number): Promise<void> {
		return new Promise((resolve, reject) => {
			const data = querystring.stringify({
				profNum: profileNumber
			});
			const req = http.request({
				method: "POST",
				host: this.Ip,
				port: 80,
				path: 'profedit.html',
				headers: {
					"Content-Type": "multipart/form-data",
					"Content-Length": Buffer.byteLength(data),
				}
			}, (res) => {
				res.on("end", () => {
					return resolve();
				})
			});
			req.on("error", (error) => {
				return reject(`Failed to set profile to edit: ${error}`)
			});

			req.write(data);
			req.end();
		});
	}

	private getCurrentProfileNumber(): Promise<number> {
		return new Promise((resolve, reject) => {
			http.get({
				host: this.Ip,
				port: 80,
				path: 'statusvars.js',
			}, (res) => {
				if (res.statusCode === 200) {
					let body = "";
					res.on("data", (chunk) => {
						body += chunk;
					});
					res.on("end", () =>{
						return resolve(this.parseBodyAsProfile(body).Number);
					})
				} else {
					return reject("Didn't receive successfull status code when getting active profile");
				}
			}).on("error", (error) => {
				return reject(`Failed with error: ${error}`);
			});
		});
	}

	private parseBodyAsProfile(body: string): Profile {
		const keyValuePairs = body.split(";");
		let profileNumber: number = -1;
		let profileName: string = "broken";
		let times: number[] = [];
		let lightOne: number[] = [];
		let lightTwo: number[] = [];
		let lightThree: number[] = [];
		let lightFour: number[] = [];
		let cloudIntensity: number[] = [];
		let cloudMovement: number[] = [];

		for (const pair of keyValuePairs) {
			const splitPair = pair.split("=");
			switch (splitPair[0]){
				case "profNum": {
					profileNumber = parseInt(splitPair[1]);
					break;
				}
				case "profile":{
					profileName = splitPair[1];
					break;
				}
				case "times":{
					times = this.parseAsIntArray(splitPair[1]);
					break;
				}
				case "CH1":{
					lightOne = this.parseAsIntArray(splitPair[1]);
					break;
				}
				case "CH2":{
					lightTwo = this.parseAsIntArray(splitPair[1]);
					break;
				}
				case "CH3":{
					lightThree = this.parseAsIntArray(splitPair[1]);
					break;
				}
				case "CH4":{
					lightFour = this.parseAsIntArray(splitPair[1]);
					break;
				}
				case "cI":{
					cloudIntensity = this.parseAsIntArray(splitPair[1]);
					break;
				}
				case "cM":{
					cloudMovement = this.parseAsIntArray(splitPair[1]);
					break;
				}
			}
		}

		return new Profile(profileNumber, profileName, new TimesAsNumbers(times), lightOne, lightTwo, lightThree, lightFour, cloudIntensity, cloudMovement);
	}
	private parseAsIntArray(intArrayAsString: string): number[] {
		const splitted = intArrayAsString.replace("[", "").replace("]", "").split(",");
		const numbers: number[] = [];
		splitted.forEach(split => {
			numbers.push(parseInt(split));
		});

		return numbers;
	}
	public UpdateProfile(profile: Profile): Promise<void> {
		throw new Error("Method not implemented.");
	}


}