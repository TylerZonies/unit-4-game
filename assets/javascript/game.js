$(document).ready(function(){
var charArr = [
        {
            health: 140,
            attack: 7,
            image: "http://via.placeholder.com/150x100",
            name: "Jason",
            id:"charJason",
            counter: 7,
            isChosen: false,
            isDefend: false,
            isDead: false

        },
        {
            health: 150,
            attack: 6,
            counter: 7,
            image: "assets/images/patrickSprite.png",
            name: "Patrick",
            id: "charPatrick",
            isChosen: false,
            isDefend: false,
            isDead: false
        },
        {
            health: 100,
            attack: 9,
            counter: 30,
            image: "http://via.placeholder.com/150x100",
            name: "Pettit",
            id: "charPettit",
            isChosen: false,
            isDefend: false,
            isDead: false
        },
        {
            health: 120,
            attack: 8,
            counter: 25,
            image: "http://via.placeholder.com/150x100",
            name: "Jake",
            id: "charJake",
            isChosen: false,
            isDefend: false,
            isDead: false
        }
            
    ];
    var chosenChar = "";
    var chosenEnemy = "";
    var strength = "";
    var lastCheck = 1;
    var defenderChosen = false;



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
    function populateCharacters(charArea, ){
        console.log("in Populate ln 60")
        for(var i = 0; i < charArr.length; i++){
            charArea = $(charArea);
            charBox = $("<div>");
            charBox.addClass("col-lg-3 charBox");
            charBox.attr({"id": charArr[i].id, "data-index": i});
            charArea.append(charBox);
            nameRow = addRow(charBox);
            nameCol = addCol(12, 12, 12, nameRow);
            nameText = $("<p>");
            nameText.addClass("text-center");
            nameText.text(charArr[i].name);
            nameCol.append(nameText)
            imgRow = addRow(charBox);
            imgCol = addCol(12, 12, 12, imgRow);
            imgDiv = $("<img>");
            imgDiv.attr("src", charArr[i].image);
            imgDiv.addClass("img-thumbnail");
            imgCol.append(imgDiv);
            lifeRow = addRow(charBox);
            lifeCol = addCol(12, 12, 12, lifeRow);
            statLife = $("<p>");
            statLife.addClass("text-center");
            statLife.text("/" + charArr[i].health);
            lifeCol.append(statLife);
            dynoLife = $("<span>");
            dynoLife.attr("id", "dynoLife" + charArr[i].name);
            statLife.prepend(dynoLife);
            dynoLife.text("Health: " + charArr[i].health);


            


        }
    }

    function addStats(){
        for(var i = 0; i < charArr.length; i++){
            charBox = $("#" + charArr[i].id);
             console.log(charBox)
            statsRow = addRow(charBox);
            statsRow.addClass("row");
            statsRow.attr("id", "statsRow");
            attackCol = addCol(12, 12, 12, statsRow);
            attackCol.addClass("text-center");
            attackCol.text("Attack: " + charArr[i].attack);
            // counterCol = addCol(6, 6, 6, statsRow);
            // counterCol.addClass("text-center");
            // counterCol.text("Counter Attack: " + charArr[i].counter);
        }
    }
    function populateOne(charArea, i){
        charArea = $(charArea);
        charBox = $("<div>");
        charBox.addClass("col-lg-3 charBox");
        charBox.attr({"id": charArr[i].id, "data-index": i});
        charArea.append(charBox);
        nameRow = addRow(charBox);
        nameCol = addCol(12, 12, 12, nameRow);
        nameText = $("<p>");
        nameText.addClass("text-center");
        nameText.text(charArr[i].name);
        nameCol.append(nameText)
        imgRow = addRow(charBox);
        imgCol = addCol(12, 12, 12, imgRow);
        imgDiv = $("<img>");
        imgDiv.attr("src", charArr[i].image);
        imgDiv.addClass("img-thumbnail");
        imgCol.append(imgDiv);
        lifeRow = addRow(charBox);
        lifeCol = addCol(12, 12, 12, lifeRow);
        statLife = $("<p>");
        statLife.addClass("text-center");
        statLife.text("/" + charArr[i].health);
        lifeCol.append(statLife);
        dynoLife = $("<span>");
        dynoLife.attr("id", "dynoLife" + charArr[i].name);
        statLife.prepend(dynoLife);
        dynoLife.text("Health: " + charArr[i].health);

    }

    function onChoose(){   
        for(var i = 0; i < charArr.length; i++){
            if(charArr[i].isChosen){
                populateOne("#playerArea", i);
            }else{
                populateOne("#enemyArea", i);
            }
        }
    }


    
    $("#playerArea").on("click", "#start", function(){
        console.log("clicked");
        areaDiv = $("#playerArea");
        areaDiv.empty();
        populateCharacters("#chars");
        addStats();
    })
    $("#chars").on("click", ".charBox", function(){
        // set object as chosen object
        chosenChar = charArr[$(this).attr("data-index")];
        console.log(chosenChar);
        strength = chosenChar.attack;
        chosenChar.isChosen = true;
        $("#chars").empty();
        onChoose();
        
    })
    $("#enemyArea").on("click", ".charBox", function(){
        chosenEnemy = charArr[$(this).attr("data-index")];
        populateOne($("#defenderArea"), charArr.indexOf(chosenEnemy));
        $(this).remove();
        lastCheck++;
        defenderChosen = true;
    })
    $(".attack").on("click", "#attckBtn", function(){
        console.log("in on click");
        if(!chosenChar.isDead && defenderChosen){
            console.log("in conditional");
            chosenEnemy.health -= strength;
            if (chosenEnemy.health <= 0){
                $("#playerDamageText").text(chosenChar.name + " dealt a killing blow with " + (strength + chosenEnemy.health) + " damage!");
                $("#defendDamage").text("");
                chosenEnemy.health = 0;
                chosenEnemy.isDead = true;
                defenderChosen = false;
                $("#defenderArea").empty();
                if(lastCheck == charArr.length){
                    $("#sideBox").html("<h2>You win!</h2> <br> <h2>congragulations you've defeated all the Enemies and won the game!</h2> <br> <button id = \"restartBtn\">Play Again?</button>");
                }else{
                    $("#sideBox").html("<h2>Enemy defeated</h2> <br> <h2>Select another enemy!</h2>");
                }
            }else{
                chosenChar.health -= chosenEnemy.counter;
                if(chosenChar.health <= 0){
                    $("#defendDamage").text(chosenEnemy.name + " dealt a killing blow with " + (chosenEnemy.counter + chosenChar.health) + " damage!");
                    $("#playerDamageText").text("");
                    chosenChar.health = 0;
                    $("#sideBox").html("<h2>Game Over</h2> <br> <button id = \"restartBtn\">Play Again?</button>");
                    chosenChar.isDead = true;
                }else{
                    $("#playerDamageText").text(chosenChar.name + " dealt " + strength + " damage!");
                    $("#defendDamage").text(chosenEnemy.name + " dealt " + chosenEnemy.counter + " damage!");
                }
            }
            console.log(chosenEnemy.health + " " + chosenEnemy.name);
            console.log(chosenChar.health + " " + chosenChar.name);
            strength += chosenChar.attack;
            $("#dynoLife" + chosenChar.name).text(chosenChar.health);
            $("#dynoLife" + chosenEnemy.name).text(chosenEnemy.health);
            
        }
        
    })

    $("#sideBox").on("click", "#restartBtn", function(){
        $("#sideBox").empty();
        $("#playerDamageText").text("");
        $("#defendDamage").text("");
        $("#playerArea").empty();
        charArr = [
            {
                health: 140,
                attack: 7,
                image: "http://via.placeholder.com/150x100",
                name: "Jason",
                id:"charJason",
                counter: 7,
                isChosen: false,
                isDefend: false,
                isDead: false
    
            },
            {
                health: 150,
                attack: 6,
                counter: 7,
                image: "assets/images/patrickSprite.png",
                name: "Patrick",
                id: "charPatrick",
                isChosen: false,
                isDefend: false,
                isDead: false
            },
            {
                health: 100,
                attack: 9,
                counter: 30,
                image: "http://via.placeholder.com/150x100",
                name: "Pettit",
                id: "charPettit",
                isChosen: false,
                isDefend: false,
                isDead: false
            },
            {
                health: 120,
                attack: 8,
                counter: 25,
                image: "http://via.placeholder.com/150x100",
                name: "Jake",
                id: "charJake",
                isChosen: false,
                isDefend: false,
                isDead: false
            }
                
        ];
        chosenChar = "";
        chosenEnemy = "";
        strength = "";
        lastCheck = 1;
        defenderChosen = false;
        populateCharacters("#chars");
        addStats();
    })
})

