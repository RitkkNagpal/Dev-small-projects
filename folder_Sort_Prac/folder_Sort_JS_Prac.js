const fs=require("fs");
const path=require("path");
let extensions=require("./util");
let extFolderPath;
let folderPath="./DownloadsP";

function checkFolder(extension)
{
    //checks if a folder already exists for a paticular extension name
    for(let key in extensions)
    {
        if(extensions[key].includes(extension))
        {
            //String Interpolation
            extFolderPath=`${folderPath}/${key}`;            
            break;

        }
    }

    return fs.existsSync(extFolderPath); //returns true if the a folder with the given extension already exists.

}

function moveFile(fileName)
{
    //copy file
    let sourceFilePath=`${folderPath}/${fileName}`; //DownloadsP/abc.jpg
    let destinationFilePath=`${extFolderPath}/${fileName}`; //DownloadsP/Images/abc.jpg


    fs.copyFileSync(sourceFilePath,destinationFilePath);
    //delete file
    fs.unlinkSync(sourceFilePath);
}

function createFolder()
{
    //creates a folder
    fs.mkdirSync(extFolderPath);
}

function sortFolder(folderPath)
{
    let contents=fs.readdirSync(folderPath);
    
    for(let i=0;i<contents.length;i++)
    {
        let extensionName=path.extname(contents[i]);

        console.log(extensionName);
        let extFolderExist=checkFolder(extensionName);

        if(extFolderExist)
        {
            moveFile(contents[i]);
        }
        else
        {
            createFolder();
            moveFile(contents[i]);
        }
    }
}

sortFolder(folderPath);

