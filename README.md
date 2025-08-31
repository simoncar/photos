    "scripts": {
    	"start": "expo start",
    	"reset-project": "node ./scripts/reset-project.js",
    	"android": "expo start --android",
    	"ios": "expo start --ios",
    	"web": "expo start --web",
    	"test": "jest --watchAll",
    	"lint": "expo lint",
    	"predeploy": "expo export -p web",
    	"deploy-hosting": "npm run predeploy && firebase deploy --only hosting"
    },
