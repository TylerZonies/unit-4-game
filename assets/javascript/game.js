$(document).ready(function(){
    var charObj = {
        charArr: [
            {
                health: 140,
                attack: 7,
                image: "http://via.placeholder.com/150x100",
                name: "Jason",
                id:"charJason",
                counter: 7,


            },
            {
                health: 150,
                attack: 6,
                counter: 6,
                image: "assets/images/patrickSprite.png",
                name: "Patrick",
                id: "charPatrick"
            },
            {
                health: 100,
                attack: 9,
                counter: 10,
                image: "http://via.placeholder.com/150x100",
                name: "Pettit",
                id: "charPettit"

            },
            {
                health: 120,
                attack: 8,
                counter: 8,
                image: "http://via.placeholder.com/150x100",
                name: "Jake",
                id: "charJake"
            }
                
        ],
}
    // by the way im just adding the characters to the html in java so that
    // in the future i can maybe add a list of characters or something. just seems more dynamic
    // although it is definitely not more efficient for this project as far as i know.
    function addRow(appnd){
        newRow=$("<div>");
        newRow.addClass("row");
        appnd.append(newRow);
        return newRow;

    }
    function addCol(lg, md, sm, rowName){
        newCol=$("<div>");
        newCol.addClass("col-lg-" + lg + " col-md-" + md + " col-sm-" + sm);
        rowName.append(newCol);
        return newCol;

    }
    function populateCharacters(){
        console.log("in Populate ln 60")
        for(var i = 0; i < charObj.charArr.length; i++){
            charArea = $("#chars");
            charBox = $("<div>");
            charBox.addClass("col-lg-3 charBox");
            charBox.attr("id", charObj.charArr[i].id);
            charArea.append(charBox);
            nameRow = addRow(charBox);
            nameCol = addCol(12, 12, 12, nameRow);
            nameText = $("<p>");
            nameText.addClass("text-center");
            nameText.text(charObj.charArr[i].name);
            nameCol.append(nameText)
            imgRow = addRow(charBox);
            imgCol = addCol(12, 12, 12, imgRow);
            imgDiv = $("<img>");
            imgDiv.attr("src", charObj.charArr[i].image);
            imgDiv.addClass("img-thumbnail");
            imgCol.append(imgDiv);
            lifeRow = addRow(charBox);
            lifeCol = addCol(12, 12, 12, lifeRow);
            statLife = $("<p>");
            statLife.addClass("text-center");
            statLife.text("/" + charObj.charArr[i].health);
            lifeCol.append(statLife);
            dynoLife = $("<span>");
            dynoLife.attr("id", "dynoLife" + charObj.charArr[i].name);
            statLife.prepend(dynoLife);
            dynoLife.text("Health: " + charObj.charArr[i].health);


            


        }
    }

    function addStats(){
        for(var i = 0; i < charObj.charArr.length; i++){
            charBox = $("#" + charObj.charArr[i].id);
            console.log(charBox)
            statsRow = addRow(charBox);
            statsRow.addClass("row");
            statsRow.attr("id", "statsRow");
            attackCol = addCol(12, 12, 12, statsRow);
            attackCol.addClass("text-center");
            attackCol.text("Attack: " + charObj.charArr[i].attack);
            // counterCol = addCol(6, 6, 6, statsRow);
            // counterCol.addClass("text-center");
            // counterCol.text("Counter Attack: " + charObj.charArr[i].counter);
        }
    }


    
    $("#playerArea").on("click", "#start", function(){
        console.log("clicked");
        areaDiv = $("#playerArea");
        areaDiv.empty();
        populateCharacters();
        addStats();
    })
})