# Smart control calls

* `/statusvars.js` GET
	displays current settings:
	```
	lang=1;lamp='4Ch';profNum=3;profile='Free days';tsimtime=1367;tsimact=0;csimact=0;brightness = [1,18,1,1];times=[0,375,540,690,720,755,855,930,945,1080,1140,1200,1260,1305,1380,1439];CH1=[0,0,26,82,82,53,53,91,91,91,79,67,39,9,0,0];CH2=[0,0,6,13,13,14,14,15,15,15,15,15,38,42,0,0];CH3=[0,0,10,37,37,25,26,37,37,10,10,10,9,4,0,0];CH4=[0,0,16,53,53,38,39,54,55,61,82,82,2,2,0,0];
	```

	`/profedit.html`
	use the profNum to do POST to profedit.html (with profNum as Form Data)
	```
	profNum: 4
	```

	then use
	`/profeditvars.js` GET

	to get all the variables you need to edit the settings, response:
	```
	lang=1;lamp='4Ch';live=0;profNum=4;profile='Profile 5';times=[0,420,480,510,720,735,885,900,1170,1200,1439,1439];cM=[0,0,0,0,0,0,0,0,0,0,0,0];cI=[0,0,0,0,0,0,0,0,0,0,0,0];CH1=[0,0,30,100,100,30,30,100,100,30,30,0];CH2=[10,10,15,50,50,30,30,50,50,20,20,10];CH3=[0,0,60,100,100,30,30,100,100,50,50,0];CH4=[0,0,80,100,100,30,30,100,100,100,100,0];
	```

	this one has the Cloud Intensity (cI) and Cloud Movement (cM) variables as well


* `/pedit` POST Form Data
	```
	action=30&PNAME=Profile%208&TIMES=%5B0,420,480,510,720,735,885,900,1170,1200,1290,1290,1439%5D&CH1=%5B0,0,30,100,100,30,30,100,100,30,0,0,0%5D&CH2=%5B10,10,15,50,50,30,30,50,50,20,10,10,10%5D&CH3=%5B0,0,60,100,100,30,30,100,100,50,0,0,0%5D&CH4=%5B0,0,80,100,100,30,30,100,100,100,0,0,0%5D&CINT=%5B0,0,0,0,0,0,0,0,0,0,0,0,0%5D&CMOT=%5B0,0,0,0,0,0,0,0,0,0,0,0,0%5D
	```
	```
	action: 30
	PNAME: Profile 8
	TIMES: [0,420,480,510,720,735,885,900,1170,1200,1290,1290,1439]
	CH1: [0,0,30,100,100,30,30,100,100,30,0,0,0]
	CH2: [10,10,15,50,50,30,30,50,50,20,10,10,10]
	CH3: [0,0,60,100,100,30,30,100,100,50,0,0,0]
	CH4: [0,0,80,100,100,30,30,100,100,100,0,0,0]
	CINT: [0,0,0,0,0,0,0,0,0,0,0,0,0]
	CMOT: [0,0,0,0,0,0,0,0,0,0,0,0,0]
	```

* `/wpvars.js` GET
	```
	lang=1;profiles=["Profile 1","Standard","Workdays","Free days","Profile 5","Profile 6","Profile 7","Profile 8"];profsel=[2,2,3,2,2,3,3];
	```