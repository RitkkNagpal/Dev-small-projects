const puppeteer=require("puppeteer");
const id="pihosip987@yncyjs.com";
const pwd="123456789";

let tab;

let browserOpenPromise=puppeteer.launch({
    headless: false,
    defaultViewport: null, 
    args: ["--start-maximized"],
  });   //opens up chromium browser and returns it

  browserOpenPromise.then(function (browser){
      console.log("Browser opened");
      let allPagesPromise=browser.pages();
      return allPagesPromise;
  })
  .then(function (pages){
      tab=pages[0];
    let pageOpenPromise=tab.goto("https://www.hackerrank.com/auth/login");
    return pageOpenPromise;
  })
  .then(function(){
      let idTypePromise=tab.type("#input-1",id);
      return idTypePromise;
  })
  .then(function (){
      let pwdTypePromise=tab.type("#input-2",pwd);
      return pwdTypePromise;
  })
  .then(function (){
      let clickLoginPromise=tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
      return clickLoginPromise;
  })
  .then(function (){
      console.log("Logged in Successfully");
      let waitAndClickPromise=waitAndClick("#base-card-1-link");
      return waitAndClickPromise;
  })
  .then(function (){
      console.log("reached ip kit page");
      let waitAndClickPromise=waitAndClick('a[data-attr1="arrays"]');
      return waitAndClickPromise;
  })
  .then(function () {
    let waitPromise = tab.waitForSelector(
      ".js-track-click.challenge-list-item",
      { visible: true }
    );
    return waitPromise;
  })
  .then(function (){
      console.log("reached arrays Question page");
      let allQuesATagsPromise=tab.$$(".js-track-click.challenge-list-item");
      return allQuesATagsPromise;
  })
  .then(function(allQuesATags){
      let allATagsPromise=[];
      for(let i=0;i<allQuesATags.length;i++)
      {
          let singleAtagPromise=tab.evaluate(function(elem){return elem.getAttribute("href")},allQuesATags[i]);
          allATagsPromise.push(singleAtagPromise);
      }
      let combinedATagPromise=Promise.all(allATagsPromise); //it will give array of promises containing links
      return combinedATagPromise;
  })
  .then(function(allLinks){
      let completeLinks=allLinks.map(function (link){
          return "https://www.hackerrank.com"+link;
      });
      let oneQuestionSolvedPromise=solveQuestion(completeLinks[0]);

    })


  function waitAndClick(selector)
  {
      return new Promise(function(resolve,reject){
        let waitPromise=tab.waitForSelector(selector,{visible:true});

        waitPromise.then(function () {
            let clickPromise=tab.click(selector);
            return clickPromise;
        })
        .then(function (){
            resolve();
        })
        .catch(function(){
            reject();
        })
      });
  }

  function solveQuestion(link)
  {
      return new Promise(function(resolve,reject){
        let gotoPromise=tab.goto(link);
        gotoPromise.then(function(){
            let waitPromise=tab.waitForSelector('div[data-attr2="Editorial"]');
            return waitPromise;
        })
        .then(function () {
            let clickPromise=tab.click('div[data-attr2="Editorial"]');
            return clickPromise;
        })
        .then(function (){
            let handleLockBtnPromise=handleLockButton();
            return handleLockBtnPromise;
        })
        .then(function () {

        })
    })
  }


  function handleLockButton()
  {
      return new Promise(function(resolve,reject){
        let waitAndClickPromise=waitAndClick(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");
      waitAndClickPromise.then(function(){
          console.log("lock button found!!");
          resolve();
      })
      .catch(function (){
          console.log("Lock button not found!!");
          resolve();
      })
    });
  }