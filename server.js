const express = require("express");
const wordle = "glean"









const server = express();









server.get("/guess26/:word", (req, res) => {
    const userGuess = req.params.word;
    let result = [];
    for(let i = 0; i < userGuess.length; i++) {
        let ch = userGuess[i]; 
        if(wordle[i] == ch) {
            result.push('#538d4e')
        }//end if
        else if (wordle.includes(ch)) {
            result.push('yellow')
        }//end else if
        else {
            result.push('gray')
        }//end else

    }
    res.json(result)
})





server.use(express.static("public"))



server.listen(3000, ()=> {
    console.log("server is work (:")
})