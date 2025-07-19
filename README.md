# Google chrome native messaging example

Example of usage native messaging chrome api for communication between browser extension and native host process

Correct name of application: `com.xprgv.messenger`

## Usage

Prepare extension

```sh
# install necessary libraries
npm install

# build extension
npm run build
```

Next move extension native messaging manifest to special folder:

Linux (user-specific, default path)
Google Chrome: ~/.config/google-chrome/NativeMessagingHosts/com.my_company.my_application.json
Chromium: ~/.config/chromium/NativeMessagingHosts/com.my_company.my_application.json

Next build golang program

```sh
go build -o chrome-messenger main.go
```
