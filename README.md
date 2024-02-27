# Design Token Android Generation - Demonstration

## The required modules which you will need to have are
```bash
npm install
npm install -g style-dictionary
npm install token-transformer -g
```

## In design/package.json, Alter the "scripts" as follows [on line.no 10]

For Linux and MacBook
```bash
  "scripts": {
    "build": "rm -rf build && token-transformer ./tokens/hds-token.json ./tokens/hds-token-transformer.json --resolveReferences=false && node ./build.js",
    "clean": "rm -rf build",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

For Windows 
```bash
"scripts": {
    "build": "del -f build && token-transformer ./tokens/hds-token.json ./tokens/hds-token-transformer.json --resolveReferences=false && node ./build.js",
    "clean": "del -f build",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```


## Once the app the is initialized , run the following in the /design directory

```bash
npm run build 
```

### Vary the config.json and build.js accordingly to generate your own custom tokens

The Expected Output is to be as follows
![Alt text](design-tokens.png)
