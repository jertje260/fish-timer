import { IStoreSmartControlProfiles } from "../IStoreSmartControlProfiles";
import { Profile } from "../Models/Profile";
import * as request from "request-promise";
import { TimesAsNumbers } from "../Models/TimesAsNumber";

export class SmartControlAdapter implements IStoreSmartControlProfiles {
	private Ip: string;

	constructor(ip: string) {
		this.Ip = ip;

	}

	public UpdateProfile(profile: Profile): Promise<void> {
		return new Promise((resolve, reject) => {
			request
				.post("pedit", {
					baseUrl: this.Ip,
					encoding: "UTF8",
					headers: {
						"Content-Type": "multipart/form-data",
					},
					formData: {
						action: 30,
						PNAME: profile.Name,
						TIMES: profile.GetTimesAsArray(),
						CH1: profile.LightOne,
						CH2: profile.LightTwo,
						CH3: profile.LightThree,
						CH4: profile.LightFour,
						CINT: profile.CloudIntensity,
						CMOT: profile.CloudMotion,
					}
				})
				.then(() => {
					return resolve();
				})
				.catch((err) => {
					return reject(`Failed to store updated profile ${err}`);
				});
		});
	}

	public async GetActiveProfile(): Promise<Profile> {
		const profileNumber = await this.getCurrentProfileNumber();
		await this.setCurrentProfileAsEditable(profileNumber);
		return await this.getCurrentEditableProfileVariables();
	}

	private getCurrentEditableProfileVariables(): Promise<Profile> {
		return new Promise((resolve, reject) => {
			request
				.get("profeditvars.js",
					{
						baseUrl: this.Ip
					})
				.then(res => {
					return resolve(this.parseBodyAsProfile(res));
				}).catch(err => {
					return reject(`Didn't receive successfull response when retrieving profile vars ${err}`);
				});
		});
	}

	private setCurrentProfileAsEditable(profileNumber: number): Promise<void> {
		return new Promise((resolve, reject) => {
			request
				.post("profedit.html", {
					baseUrl: this.Ip,
					headers: {
						"Content-Type": "multipart/form-data",
					},
					formData: {
						profNum: profileNumber
					}
				})
				.then(() => {
					return resolve();
				})
				.catch(error => {
					return reject(`Failed to set profile to edit: ${error}`);
				});
		});
	}

	private getCurrentProfileNumber(): Promise<number> {
		return new Promise((resolve, reject) => {
			request
				.get("statusvars.js", {
					baseUrl: this.Ip,
				})
				.then(result => {
					return resolve(this.parseBodyAsProfile(result).Number);
				})
				.catch(error => {
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
			switch (splitPair[0]) {
				case "profNum": {
					profileNumber = parseInt(splitPair[1]);
					break;
				}
				case "profile": {
					profileName = splitPair[1].replace("'", "");
					break;
				}
				case "times": {
					times = this.parseAsIntArray(splitPair[1]);
					break;
				}
				case "CH1": {
					lightOne = this.parseAsIntArray(splitPair[1]);
					break;
				}
				case "CH2": {
					lightTwo = this.parseAsIntArray(splitPair[1]);
					break;
				}
				case "CH3": {
					lightThree = this.parseAsIntArray(splitPair[1]);
					break;
				}
				case "CH4": {
					lightFour = this.parseAsIntArray(splitPair[1]);
					break;
				}
				case "cI": {
					cloudIntensity = this.parseAsIntArray(splitPair[1]);
					break;
				}
				case "cM": {
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



}