module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
		"no-console": ["error", { "allow": ["warn", "error", "log"] }],
        "indent": [
            "error",
            "tab"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
	},
	"globals": {
		// All of these needs to be removed, but for that we need something like webpack to build it all and allow real modules.
		"Phaser": true,
		"LifeSocks": true,
		"board": true,
		"socket": true,
		"controller": true
    }
};
