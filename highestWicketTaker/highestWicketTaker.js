const cheerio=require("cheerio");
const request=require("request");
let highestWicketTaker={};
request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard",cb);

function cb(error,response,body)
{
    parseData(body);
}

function parseData(html)
{
    let highestWicketstakenSoFar=0;
    let nameOfHighestWicketTaker;
    let economy;

    let ch=cheerio.load(html);
    let bothBowlerTable=ch(".table.bowler tbody");
    for(let i=0;i<bothBowlerTable.length;i++)
    {
        let bowlerTable=bothBowlerTable[i];
        let allTrs=ch(bowlerTable).find("tr");
        for(let j=0;j<allTrs.length;j++)
        {
            let allTds=ch(allTrs[j]).find("td");
            let wicketsTaken=ch(allTds['4']).text();
            if(wicketsTaken>highestWicketstakenSoFar)
            {
                highestWicketstakenSoFar=wicketsTaken;
                nameOfHighestWicketTaker=ch(allTds['0']).text();
                economy=ch(allTds['5']).text();
            }
        }
    }
    highestWicketTaker.name=nameOfHighestWicketTaker;
    highestWicketTaker.wickets=highestWicketstakenSoFar;
    highestWicketTaker.economy=economy;

    console.log(highestWicketTaker);
}