let WEB_CONFIG = {
    API_URL: {
        production: "http://api.stuffshare.online",
        dev: "http://localhost:1337"
    }
}
if (process.env.NODE_ENV == undefined) {
    process.env.NODE_ENV = "production";
}
export default WEB_CONFIG