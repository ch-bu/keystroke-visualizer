# Keystroke visualizer

This little app visualizes the keystrokes you make while you are typing. A demo can be found [here](https://ch-bu.github.io/keystroker/).


## How to run locally

Install node.js, gulp and bower

```
$ npm install
$ bower install
$ npm install -g gulp
```
### For development

Serve the application with gulp:

```
$ gulp serve
```

A new tab in your browser should be opened with the following url:

```
http://localhost:3000
```

### For production

Run:

```
$ gulp
```

This will put all important files in the `dist` directory. As we wrote the project in require.js we need to use their build in optimizer. Therefore run:

```
node r.js -o build.js
```

All relevant scripts will be put into the `dist` directory. Now fire up the server:

```
gulp serve:dist
```

A new tab in your browser should be opened with the following url:

```
http://localhost:3002
```