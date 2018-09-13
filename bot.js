const Discord = require('discord.js');
const client = new Discord.Client();
var util = require('util');
const fs = require("fs");
var ownerID = process.env.ownerID
var trapID = process.env.trapID
var storage = JSON.parse(fs.readFileSync("./storage.json", "utf8"));

const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");

const tableSource2 = new EnmapLevel({name:"loveCalc"});
const loveCalc = new Enmap({provider: tableSource2});
client.loveCalc = new Enmap({name: "loveCalc", persistent: true});

const tableSource3 = new EnmapLevel({name: "rollLog"});
const rollLog = new Enmap({provider: tableSource3});
client.rollLog = new Enmap({name: "rollLog", persistent: true});
//Set-up.




//Bot logs in and logs it to console.
client.login(process.env.BOT_TOKEN);
//Don't disobey bot security my dudes. No matter how troublesome.

client.on('ready', () => {
  client.user.setActivity('with traps');
  console.log(`${client.user.username} shall proceed...`);
});


//Bot begins reading messages. **PLACE THINGS THAT NEED TO BE CONSTANT ABOVE THIS.
client.on('message', message => {
    var prefix = '!'
    var msg = message.content;
    var user = message.author.username;
    var userID = message.author.id;
    var trapUser = client.user.username;
    var ownerUser = "GlitchTheFox";



//identifies the arguments for commands.
    let messageArray = msg.split(' ');
    let command = messageArray[0];
    let args = (messageArray.slice(1));
    let argsString = (args.join(" "));

    //NOTES: (For RP character command.)
    let charname = (args[0]);
    let chardesc = (args.slice(1)).join(' ');


    //NOTES: (For Rolling multiple Dice.)
    let firstArg = (args[0]);
    let secondArg = (args.slice(1)[0]);
    let thirdArg = Number(args.slice(2)[0]);

//NOTES: ENMAP IS NOT REMEMBERING INPUT FOR SOME REASON.


//console.log(args)
//console.log(messageArray)
//console.log(m_mention)
console.log("<" + user + "> " + msg);
//console.log("1**" + firstArg + "**");
//console.log("2**" + secondArg + "**");
//console.log(charname + "|" + chardesc);
//console.log(client.RPchar.get(charname));

//**COMMANDS START HERE.**
//if/else command prevents Trap-Bot from executing commands it itself has written.
if (message.author.username === 'Trap-Bot') return;

  if (message.channel.type === 'dm') return;





  //RP COMMANDS
  if (command === '!charcreate'){
  if (chardesc === ''){
    message.channel.send("Please specify a character name and the description!")
  }else{
    storage[message.author.id] = {
      "characters": {
      }
    }
    storage[message.author.id].characters[charname] = chardesc;
    fs.writeFile("./storage.json", JSON.stringify(storage, null, 2), (err) => {
      if (err) console.error(err)
    });
    message.channel.send("Character name and description logged! Use the '!char' command to see the information!");
}};

if (command === "!chardelete"){
  if (charname === undefined){
    message.channel.send("Please specify a character to delete.")
  }else{
    delete storage[message.author.id].characters[charname];
    fs.writeFile("./storage.json", JSON.stringify(storage, null, 2), (err) => {
      if (err) console.error(err)
    });
    message.channel.send("Character deleted!")
  }
}

if (command === '!char'){
  let charOutput1 = JSON.stringify(storage[message.author.id].characters);
  if (charOutput1.indexOf(charname) > -1){
    message.channel.send("**" + charname + "**: " + storage[message.author.id].characters[charname]);
  } else {
    message.channel.send("Sorry, that character doesn't exist!")
  }
};

      if (command === '!artist'){
        message.channel.send("https://glitchthef0x.deviantart.com/?rnrd=239139")
        message.channel.send("https://www.artstation.com/lord_author")
        message.channel.send(":^) advertising")
      };

      if (command === "!spam"){ //Owner-only command which spams the channel. For testing purposes...
        if (message.author.id === ownerID){
          for (var i = 0; i < 10; i++){
            message.channel.send("This is a spam message! For testing purposes... Y'know :)")
          }
        } else {
          message.channel.send("You don't have permission for that command, lol.")
        }
      }


  //traps are gay command.
      if (command === '!trap') {
          message.channel.send('**' + user + '** thinks traps are gay!', {files: ["./gif/trap_1.gif"]});
      };

  //traps aren't gay command.
      if (command === '!not') {
          message.channel.send('**' + user + '** thinks traps aren\'t gay!', {files: ["./gif/lol.gif"]});
      };

      //A dice roll command. !roll 20 2
      	if (command === '!roll') {
          if (firstArg = undefined) {
            message.channel.send("Please define a dice amount, dice type, and dice modifier!")
          } else if (firstArg.indexOf('d') > -1){ //If the user has formatted roll as e.g. 1d20, do this.
            if(firstArg.indexOf('+') > -1){ //If the user has added e.g. 1d20+3, do this.
              let x = firstArg.split('+');
              thirdArg = x[1];
            }else{thirdArg = secondArg}; //If the user has added e.g. 1d20 3, make the modifier into the second argument.
            let i = firstArg.split('d');
            firstArg = i[1];
            secondArg = i[0];
            firstArg = parseInt(firstArg); //Make sure the arguments are integers, not strings.
            secondArg = parseInt(secondArg);
            thirdArg = parseInt(thirdArg);
          }else if (firstArg.indexOf('+') > -1){ //If the user has added e.g. 20+3, do this.
              let x = firstArg.split('+');
              thirdArg = x[1];
              secondArg = 1; //Setting the second argument to 1 because it was not specified.
              firstArg = x[0];
              firstArg = parseInt(firstArg);
              thirdArg = parseInt(thirdArg);
          };


      if (isNaN(firstArg) || firstArg < 1 || firstArg > 1000) { //If the user inputs an invalid roll, fuck them up.
        message.channel.send('Sorry, that\'s not a number!')
      }else if (secondArg === undefined){ //If the user isn't rolling more than one dice and has just inputted !roll 20, output this.
        let rollAmount = (Math.floor((Math.random() * firstArg) + 1));
        message.channel.send('**' + user + '** rolled a **' + rollAmount + '**' + ' out of **' + firstArg + '**!');
        client.rollLog.set(user, rollAmount, true);
      }else if (secondArg > 10){ //If the user tries to roll more than 10 dice, output this.
        message.channel.send("Sorry, that's too many dice!")
      }else if (secondArg >= 1){ //Ohhhh fuck. If the user does specify an amount of dice to roll, output this.

          let rolling1 = ('**' + user + '** rolled a **'); //Setting up string, in order to repeat the correct amount of times.
          let rolling2 = ("** out of **" + firstArg + "**!");
          let rollAmount = 0
          let rollLogged

        for (var i = 0; i < secondArg; i++){ //for loop which rolls the desired amount of dice, and adds on the correct string.
          let rolling = (Math.floor((Math.random() * firstArg) + 1))

          rollAmount += rolling; //Adds result onto final sum.
          if (i < (secondArg - 1)){
            rolling += ("**,** ")
          }else if (i = (secondArg - 1)){
            rolling = (("**and a **") + rolling)
          };

          rolling1 += rolling; //adds result and string onto the start of the first string.
        };

        if (isNaN(thirdArg) || thirdArg < 0){ //If the user has not added a modifier to their roll, output this.
          message.channel.send(rolling1 + rolling2 + " (**" + rollAmount + "**)")
          client.rollLog.set(user, rollAmount, true);
        }else{ //If the user has added a modifier to their roll, output this.
          let rollMod = 0;
          rollMod = (thirdArg + rollAmount); //Adding modifier onto final sum.
          message.channel.send(rolling1 + rolling2 + " (**" + rollAmount + "** + **" + thirdArg + " **(Mod.) =** " + rollMod + "**)")
          client.rollLog.set(user, rollMod, true);
        }

      }
      };


      if (command === '!lastroll'){
        let lastroll = client.rollLog.get(user);
        if (lastroll === null){
          message.channel.send("Sorry, you haven't rolled yet!")
        } else{
          message.channel.send("The last dice **" + user + "** rolled resulted in **" + lastroll + "!**")
        }
      }




  //MATH COMMANDS

    if (command === '!add'){
      if(isNaN(firstArg) || isNaN(secondArg)){
        message.channel.send("Sorry, that's not a number!")
      } else if (firstArg > 1000000000000 || secondArg > 1000000000000) {
        message.channel.send("Sorry, that's too high a number!")
      } else if (firstArg < -1000000000000 || secondArg < -1000000000000) {
        message.channel.send("Sorry, that's too low a number!")
      }else{
        message.channel.send("**" + firstArg + " + " + secondArg + "** equals **" + ((parseInt(firstArg)) + (parseInt(secondArg))) + "**!")
      }
    };

    if (command === '!multiply'){
      if(isNaN(firstArg) || isNaN(secondArg)){
        message.channel.send("Sorry, that's not a number!")
      } else if (firstArg > 1000000000000 || secondArg > 1000000000000) {
        message.channel.send("Sorry, that's too high a number!")
      } else if (firstArg < -1000000000000 || secondArg < -1000000000000) {
        message.channel.send("Sorry, that's too low a number!")
      }else{
        message.channel.send("**" + firstArg + " * " + secondArg + "** equals **" + ((parseInt(firstArg)) * (parseInt(secondArg))) + "**!")
      }
    };

    if (command === '!subtract'){
      if(isNaN(firstArg) || isNaN(secondArg)){
        message.channel.send("Sorry, that's not a number!")
      } else if (firstArg > 1000000000000 || secondArg > 1000000000000) {
        message.channel.send("Sorry, that's too high a number!")
      } else if (firstArg < -1000000000000 || secondArg < -1000000000000) {
        message.channel.send("Sorry, that's too low a number!")
      }else{
        message.channel.send("**" + firstArg + " - " + secondArg + "** equals **" + ((parseInt(firstArg)) - (parseInt(secondArg))) + "**!")
      }
    };

    if (command === '!divide'){
      if(isNaN(firstArg) || isNaN(secondArg)){
        message.channel.send("Sorry, that's not a number!")
      } else if (firstArg > 1000000000000 || secondArg > 1000000000000) {
        message.channel.send("Sorry, that's too high a number!")
      } else if (firstArg < -1000000000000 || secondArg < -1000000000000) {
        message.channel.send("Sorry, that's too low a number!")
      }else{
        message.channel.send("**" + firstArg + " / " + secondArg + "** equals **" + ((parseInt(firstArg)) / (parseInt(secondArg))) + "**!")
      }
    };




  //back to normal commands

    if (command === '!uptime'){
      let uptimes = (client.uptime / 1000);
      let uptimem = (uptimes / 60);
      let uptimeh = (uptimem / 60);
      let uptimed = (uptimeh / 24);
      if (uptimem <= 1){
        message.channel.send("**" + (Math.floor(uptimes)) + "** sec/s!")
      }else if (uptimeh <= 1){
        if (uptimem > 1){
          //If uptimem = 2, then loop once.
          for (i = uptimem; i > 1; i--){
            uptimes = uptimes - 60
          }
        };
        message.channel.send("**" + (Math.floor(uptimem)) + "** min/s and **" + (Math.floor(uptimes)) + "** sec/s!")
      }else if (uptimed <= 1){
        if (uptimeh > 1){
          //If uptimem = 2, then loop once.
          for (i = uptimeh; i > 1; i--){
            uptimem = uptimem - 60
          }
        };
        message.channel.send("**" + (Math.floor(uptimeh)) + "** hr/s and **" + (Math.floor(uptimem)) + "** min/s!")
      }else{
        if (uptimed > 1){
          //If uptimem = 2, then loop once.
          for (i = uptimed; i > 1; i--){
            uptimeh = uptimeh - 24
          }
        };
        message.channel.send("**" + (Math.floor(uptimed)) + "** day/s and **" + (Math.floor(uptimeh)) + "** hr/s!")
      }
    };



  //A coin flip command.
    if (command === '!coinflip') {
      let coin = (Math.floor((Math.random() * 2) + 1));
      if (coin === 1){
        message.channel.send('**' + user + '** flipped a coin and got **Heads!**')
      } else {
        message.channel.send('**' + user + '** flipped a coin and got **Tails!**')
      }
    };




  //Sends the author the command list.
    if (command === '!help'){

      message.author.send("```\nCOMMAND LIST \n\nGeneral Commands:\n\n\t!trap \n\t\tYou believe in harsh truths.\n\t!not \n\t\tLook at you! Little rebel! \n\t!whoami \n\t\tPrints your user information. \n\t!serverinfo \n\t\tDisplays the server's information. \n\t!servericon \n\t\tSends URL of the server's icon. \n\t!echo \n\t\tEchoes a phase sent by the user. Format: !echo <text>\n\t!ping\n\t\tSends the delay in ms.\n\t!help\n\t\tYou are here.\n\t!avatar\n\t\tSends you back your avatar.\n\t!uptime\n\t\tDisplays the amount of time the bot has been up for. \n\t!artist\n\t\tPlease commission me bby.\n\nRP Commands:\n\n\t!charcreate\n\t\tCreates a character! Format: !charcreate <character name> <character description> Warning: Characters are deleted upon bot restart. \n\t\tCheck the time with !uptime. \n\t!char\n\t\tReturns character information. Format: !char <character name>\n\t!roll\n\t\tRolls a dice! Examples: !roll 1d20+3 !roll 20 1 3```");
      message.author.send("```Math Commands:\n\n\t!coinflip\n\t\tFlips a coin.\n\t!add\n\t\tAdds two numbers together. Format: !add <n1> <n2>\n\t!subtract\n\t\tSubtracts a number from the other. Refer to !add for formatting for these commands.\n\t!multiply\n\t\tTimes two numbers together.\n\t!divide\n\t\tDivides two numbers.\n\nEmotes:\n\n\t!pat\n\t\tPat someone, adorably!\n\t!stab\n\t\tKill your friends.\n\t!kiss\n\t\tKiss your friends.\n\t!thumbsup\n\t\tA p p r o v e.\n\t!pester\n\t\tGet your friend's attention.\n\t!cry\n\t\tBurst into tears.\n\t!tail\n\t\tWag your tail. Furry.\n\t!slap\n\t\tSlap your friends.\n\t!hug\n\t\tHug your friends!\n\t!sex\n\t\tSex your friends. ( ͡° ͜ʖ ͡°)\n\t!bite\n\t\tBite your friends.\n\t!lovecalc\n\t\tCalculate your compatibility. Format: !lovecalc <user1> <user2>\n\n\nNew commands always being added :) Enjoy!```");

    };




  //Sends an embed of the user's information.
      if (msg === prefix + 'whoami') {
            let embed = new Discord.RichEmbed()
              .setAuthor(message.author.username)
              .setDescription('This is your user info.')
              .setColor('#FFBA8F')
              .addField('Full Username', `${message.author.username}#${message.author.discriminator}`)
              .addField('ID', message.author.id)
              .addField('Created At', message.author.createdAt);

            message.channel.send(embed);
        };



  //SIMPLE COMMANDS.
  //Just in case anyone says what instead of who.
        if(command === '!whatami'){
          message.channel.send('You poor, poor creature.')
        };

        if(command === '!crashmebby'){
          if (message.author.id === ownerID){fuck} else return;
        };

  //when I am very frustrated with the bot I ask this.
        if (msg === 'why are you a dick'){
          message.channel.send('because I am a failure')
        };

  //Please send help.
        if (msg === 'are you ok'){
          message.channel.send('01101000 01100101 01101100 01110000 00100000 01101101 01100101 00100000 01101001 00100000 01100001 01101101 00100000 01100001 00100000 01110000 01100101 01110010 01110011 01101111 01101110 00100000 01110100 01110010 01100001 01110000 01110000 01100101 01100100 00100000 01101001 01101110 00100000 01100001 00100000 01110000 01110010 01101111 01100111 01110010 01100001 01101101')
        };

  //Tells the user the bot's ping and delay.
        if (msg === prefix + 'ping'){
          message.channel.send('pong | ' + (Math.floor(client.ping)) + 'ms')
        };

  //Echoes the user's arguments.
        if (command === '!echo'){
          message.delete(1)
          message.channel.send(args.join(' '))
        };

  //Prints the server info.
        if (command === '!serverinfo'){
          let embed = new Discord.RichEmbed()
            .setAuthor(message.guild.name)
            .setDescription('The server\'s information.')
            .setColor('#FFBA8F')
            .addField('ID', message.guild.id)
            .addField('Member Count', message.guild.memberCount)
            .addField('Created at', message.guild.createdAt);

            message.channel.send(embed);
        };

  //Pastes the URL of the user's avatar.
        if (command === '!avatar'){
          message.channel.send(message.author.avatarURL);
        };

        if (command === '!servericon'){
          message.channel.send(message.guild.iconURL);
        };

        if (command === "!tail"){
          message.channel.send("**" + user + "'s** tail waves back and forth!", {files:["./gif/wag_" + (Math.floor((Math.random() * 5) + 1)) + ".gif"]})
        };

        if (command === "!cry"){
          message.channel.send("**" + user + "** begins to cry!", {files:["./gif/cry_" + (Math.floor((Math.random() * 8) + 1)) + ".gif"]})
        };





  //Random chat responses.
        //precious trap boi
        if (msg === 'good boy, trap-bot'){
          if (message.author.id === ownerID){
          message.channel.send("_happy trap noises_")
          }
        };

        //Goodnight Trap-Bot!
        if (msg === "goodnight, trap-bot"){
          if (message.author.id === ownerID){
            message.channel.send("Goodnight, creator!")
          } else {
            message.channel.send("Goodnight, sir!")
          }
        };



        //Sets up mention-based commands.
              if ((message.mentions.members.first()) === undefined){
                if (command === "!pat" || command === "!stab" || command === "!thumbsup" || command === "!kiss" || command === "!pester" || command === "!slap" || command === "!smite" || command === "!hug" || command === "!sex" || command === "!lovecalc" || command === "!bite"){
                  message.channel.send("Please mention somebody, first!") //prevents username set-up problem that is caused by not mentioning a user.
                };
              }else{
                //Setting up username for the targetted user.
                if (firstArg.indexOf("@", "<", ">", /\d/g || "!") > -1){ //If this really is a mention... mention is read as <!@123456789123456789>
                let mention1 = ((util.inspect(firstArg)).split("'"))[1]; //selects the mention specifically
                let targetID = (mention1.replace(/<|@|>|!/g, '')); //removes excess from the mention to get the plain ID string.
                var targetUser = (client.users.get(targetID).username); //retrieves the username using the ID from the mention.
                console.log("~~ " + targetUser); //logs first user for debugging

                if (secondArg === undefined){ //set to a string to prevent problem caused by calling on an undefined variable.
                  var targetUser2 = "none"; //if a second user is not defined, set it to the string 'none' to be used in command lines where second user is necessary.
                }else{
                let mention2 = (util.inspect(secondArg).split("'"))[1];
                let targetID2 = (mention2.replace(/<|@|>|!/g, ''));
                if ((client.users.get(targetID2)) === undefined){
                  var targetUser2 = "none";
                }else{
                  var targetUser2 = (client.users.get(targetID2).username);
                }};
                console.log(targetUser2); //logs second user for debugging
              } else{
                let member = message.mentions.members.first()
                var targetUser = (member.user.username);
                console.log(targetUser);
                var targetUser2 = "none";
                console.log(targetUser2);
              };




          //Actual emote commands.
          if (command === "!pat"){
              if (targetUser === user){
                message.channel.send("**" + user + "** pats themself. For some reason.", {files: ["./gif/self_pat.gif"]});
              }else{
              message.channel.send("**" + targetUser + "** was pat by **" + user + "!**", {files: ["./gif/pat_" + (Math.floor((Math.random() * 5) + 1)) + ".gif"]});
            };
            if (targetUser === trapUser){
              setTimeout(function(){
              message.channel.send(":heart: I'll meow for you anytime, my love.");
            }, 200);
          }
       };

          if (command === "!stab"){
            if (targetUser === trapUser){
              message.channel.send("**" + trapUser + "** stabs **" + user + "**! Omae wo shindeiru.", {files:["./gif/stab_" + (Math.floor((Math.random() * 5) + 1)) + ".gif"]})
            } else if (targetUser === user){
              message.channel.send("**" + user + "** stabs themselves dramatically!", {files:["./gif/self_stab.gif"]})
            }else{
              message.channel.send("**" + user + "** stabs **" + targetUser + "**!", {files:["./gif/stab_" + (Math.floor((Math.random() * 5) + 1)) + ".gif"]});
            };
          };

          if (command === "!thumbsup"){
            if (targetUser === user){
              message.author.send("Poor child, I'll give you a thumbs up!", {files:["./gif/thumb_" + (Math.floor((Math.random() * 5) + 1)) + ".gif"]})
            }else{
              message.channel.send("**" + user + "** gives **" + targetUser + "** a thumbs up!", {files:["./gif/thumb_" + (Math.floor((Math.random() * 5) + 1)) + ".gif"]})
            };
            if (targetUser === trapUser){
              setTimeout(function(){
                message.channel.send("Thanks!")
              }, 200);
            }
          };

          if (command === "!kiss"){
            if (targetUser === trapUser){
                message.channel.send("**No!**", {files:["./gif/tsun_1.gif"]});
              } else if (targetUser === user){
              message.channel.send("Loneliness only goes so far, man.")
            }else{
              message.channel.send("**" + user + "** grabs **" + targetUser + "** and kisses them!", {files:["./gif/kiss_" + (Math.floor((Math.random() * 6) + 1)) + ".gif"]})
            }
          };

          if (command === "!pester"){
            if(targetUser === trapUser){
              message.channel.send("I'm listening, **" + user + "!**", {files:["./gif/felix/felix_ears.gif"]});
            } else if (targetUser === user){
              message.channel.send("You can't pester yourself!");
            } else {
              message.channel.send("**" + user + "** starts to pester **" + targetUser + "!**", {files:["./gif/annoy_" + (Math.floor((Math.random() * 6) + 1)) + ".gif"]})
            }
          };

          if (command === "!slap"){
            if(targetUser === trapUser){
              if (message.author.id === ownerID) {
                message.channel.send("**" + user + "** slaps **Me!** OW!", {files:["./gif/slap_" + (Math.floor((Math.random() * 6) + 1)) + ".gif"]})
              } else {
                message.channel.send("Why would you do that to me, **" + user + "**?", {files:["./gif/felix/felix_cry.gif"]})
              }
            } else if (targetUser === user){
              message.channel.send("Why are you hitting yourself?", {files:["./gif/felix/felix_cool.gif"]})
            } else {
              message.channel.send("**" + user + "** slapped **" + targetUser + "!**", {files:["./gif/slap_" + (Math.floor((Math.random() * 6) + 1)) + ".gif"]})
            }
          };

          if (command === "!smite"){
            if(message.author.id === ownerID){
              if(targetUser === trapUser){
                message.channel.send("MERCY! *Dies.*", {files:["./gif/smite_" + (Math.floor((Math.random() * 3) + 1)) + ".gif"]})
              } else {
                message.channel.send("**" + ownerUser + "** strikes **" + targetUser + "** down with lightning!", {files:["./gif/smite_" + (Math.floor((Math.random() * 3) + 1)) + ".gif"]})
              }
            }
          };

          if (command === "!hug"){
            if(targetUser === trapUser){
              message.channel.send("**" + user + "** hugs me! Yay!", {files:["./gif/hug_" + (Math.floor((Math.random() * 9) + 1)) + ".gif"]})
            } else if (targetUser === user){
              message.channel.send("If you're that lonely, I'll give you a hug~", {files:["./gif/felix/felix_wag.gif"]})
            } else {
              message.channel.send("**" + user + "** hugs **" + targetUser + "!**", {files:["./gif/hug_" + (Math.floor((Math.random() * 9) + 1)) + ".gif"]})
            }
          };

          if (command === "!sex"){
            if(targetUser === trapUser){
              message.channel.send("**Wh-what...?!**", {files:["./gif/tsun_6.gif"]})
            } else if (targetUser === user){
              message.channel.send("Is it incest or masturbation?", {files:["./gif/m_1.gif"]})
            }else if(targetUser === ownerUser){
              message.channel.send("You'd better be prepared for some... stuff.", {files:["./gif/murder_1.gif"]})
            } else {
              message.channel.send("**" + user + "** drags **" + targetUser + "** away for some... stuff...", {files:["./gif/stuff_" + (Math.floor((Math.random() * 9) + 1)) + ".gif"]})
            }
          };

          if (command === "!bite"){
            if(targetUser === trapUser){
              message.channel.send("**Why would you do that to me-e?**", {files:["./gif/no_bite.gif"]})
            } else if (targetUser === user){
              message.channel.send("**" + user + "** bites themself!", {files:["./gif/self_bite.gif"]})
            } else {
              message.channel.send("**" + user + "** bites **" + targetUser + "!** Owch.", {files:["./gif/bite_" + (Math.floor((Math.random() * 4) + 1)) + ".gif"]})
            }
          };

          //if (command === ""){
            //if(targetUser === trapUser){
              //message.channel.send("", {files:[]})
            //} else if (targetUser === user){
              //message.channel.send("", {files:[]})
            //} else {
              //message.channel.send("", {files:[]})
            //}
          //};

        //LOVE CALCULATOR
        if (command === "!lovecalc"){
          if (targetUser2 === "none"){
            message.channel.send("Please mention _two_ users!");
          }else if(targetUser2 === targetUser){
            message.channel.send("Please mention two _different_ users!");
          }else{
            if (client.loveCalc.has(targetUser + targetUser2) || client.loveCalc.has(targetUser2 + targetUser)){
            var loveComp = (client.loveCalc.get(targetUser + targetUser2) || client.loveCalc.get(targetUser2 + targetUser));
          }else if ((targetUser === ownerUser && targetUser2 === 'Hit by a Parked Car') || (targetUser === 'Hit by a Parked Car' && targetUser2 === ownerUser)){
            var loveComp = 100;
          }else if (targetUser === ownerUser || targetUser2 === ownerUser){
            var loveComp = 0;
            }else {
              var loveComp = (Math.floor((Math.random() * 100) + 1));
            }
            if (loveComp > 50){
              var heart = ":heart:";
            }else{
              var heart = ":broken_heart:"
            }
            message.channel.send("**" + targetUser + "** and **" + targetUser2 + "** are **" + loveComp + "%** compatible! " + heart);
            client.loveCalc.set(targetUser + targetUser2, loveComp, true);
            console.log(client.loveCalc.get(targetUser + targetUser2));
          }

        };
  };

  });
