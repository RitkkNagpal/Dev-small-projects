const puppeteer=require("puppeteer");
const id="bomope9847@irahada.com";
const pwd="PeakyBlinders"
let tab;

//to open a browser
let browserOpenPromise=puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args: ["--start-maximized"],
    slowMo:20,
})

// to get access of a page
browserOpenPromise
.then(function (browser) {
    let allPagesPromise=browser.pages();
    return allPagesPromise;
})

//to open facebook login page
.then(function (pages) {
    tab=pages[0]; //pages is an array of all the tabs opened in the browser
    let pageOpenPromise=tab.goto("https://www.facebook.com/");
    return pageOpenPromise;
})

// to type id
.then(function () {
    let idTypedPromise=tab.type("#email",id);
    return idTypedPromise;
})
//to type pwd
.then(function () {
    let pwdTypedPromise=tab.type("#pass",pwd);
    return pwdTypedPromise;
})

//to click on login button
.then(function () {
    let loginPromise=tab.click("._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy");
    return loginPromise;
})

.then(function () {
    console.log("Logged into facebook successfully");
})
.catch(function (error) {
    console.log(error);
});