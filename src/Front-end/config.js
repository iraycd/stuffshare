let WEB_CONFIG = {
    API_URL: {
        production: "https://stuffshare-web.herokuapp.com",
        //dev: "http://localhost:1337"
        dev:"https://stuffshare-web.herokuapp.com"
    }
}
if (process.env.NODE_ENV == undefined) {
    process.env.NODE_ENV = "dev";
}
export default WEB_CONFIG