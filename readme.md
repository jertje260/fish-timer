# Fish Timer

This is updating the profiles for the HeliaLux Spectrum with the HeliaLux SmartControl. It gets the times of dusk & dawn and update the used profiles times in comparison with this.

## Configuration

This application requires two environment variables to run:

* `SmartControlConfig`
* `SmartControlHost`

The `SmartControlConfig` is a json structure looking as below:
```json
{
	"location": { // used to get the sunrise & sunset times
		"latitude": 52.3, // can be more specific
		"longitude": 5.0, // can be more specific
	},
	"profileConfig": {
		"0" : { // number for each profile (only requires the ones you have in your weekly profile). P1 is profile number 0
			"sunUpMatch" : 3, // makes the sunrise time match with your 3rd editable time in the profile edit page
			"sunDownMatch": 9 // makes the sunset time match with your 9th editable time in the profile edit page
		}
	}
}
```

The `SmartControlHost` is a simple environment variable which should contain the host of your smart control. E.G. `http://192.168.1.10`