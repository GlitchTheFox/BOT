var Discord = require('discord.js');
var client = new Discord.Client();
var fs = require('file-system');
var ownerID = '186141159935049728'
var trapID = '402741432739299330'
var util = require('util');
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const tableSource = new EnmapLevel({name: "RPchar"});
const RPchar = new Enmap({provider: tableSource});
client.RPchar = new Enmap({name: "RPchar", persistent: true});

//Set-up.


var ownerID = '186141159935049728'
var trapID = '402741432739299330'
//Set-up.



//Bot logs in and logs it to console.
client.login('NDAyNzQxNDMyNzM5Mjk5MzMw.DT9Jxw.OuVo-Xg9bWyuQphRrf7hFKMi-Ts');

client.on('ready', () => {
  client.user.setActivity('Help me, I\'m trapped!')
  console.log(`${client.user.username} shall proceed...`);
});


//Bot begins reading messages. **PLACE THINGS THAT NEED TO BE CONSTANT ABOVE THIS.
client.on('message', message => {
    var prefix = '!'
    var msg = message.content;
    var user = message.author.username;
    var trapUser = client.user.username;
    var ownerUser = "GlitchTheFox"


//identifies the arguments for commands.
    let messageArray = msg.split(' ');
    let command = messageArray[0];
    let args = (messageArray.slice(1));
    let argsString = (args.join(" "));

    //NOTES: (For RP character command.)
    let charname = (args[0]);
    let chardesc = (args.slice(1)).join(' ');


    //NOTES: (For Rolling multiple Dice.)
    let diceRoll = (args[0]);
    let diceAmount = (args.slice(1)[0]);
    let diceMod = Number(args.slice(2)[0]);

//NOTES: ENMAP IS NOT REMEMBERING INPUT FOR SOME REASON.


//console.log(args)
//console.log(messageArray)
//console.log(m_mention)
console.log("<" + user + "> " + msg);
//console.log("1**" + diceRoll + "**");
//console.log("2**" + diceAmount + "**");
//console.log(charname + "|" + chardesc);
//console.log(client.RPchar.get(charname));

//**COMMANDS START HERE.**
//if/else command prevents Trap-Bot from executing commands it itself has written.
if (message.author.username === 'Trap-Bot'){}else{

//RP COMMANDS
    if (command === '!charcreate'){
      if (chardesc === ''){
        message.channel.send("Please specify a character name and the description!")
      } else {
        client.RPchar.set(charname, chardesc, true);
        message.channel.send("Character name and description logged! Use the '!char' command to see the information!")
      }
    };

    if (command === '!char'){
      let charOutput = (client.RPchar.get(charname));
      if (charname === undefined){
        message.channel.send("Please specify a character name!")
      }else if (charOutput === null){
        message.channel.send("That character doesn't exist, sorry!")
      } else {
        message.channel.send("**" + charname + "**: " + charOutput);
      }
    };

    if (command === '!artist'){
      message.channel.send("https://glitchthef0x.deviantart.com/?rnrd=239139")
      message.channel.send("https://www.artstation.com/lord_author")
      message.channel.send(":^) advertising")
    };

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
    if (isNaN(diceRoll) || diceRoll < 1 || diceRoll > 1000) {
      message.channel.send('Sorry, that\'s not a number!')
    }else if (diceAmount === undefined){
      message.channel.send('**' + user + '** rolled a **' + (Math.floor((Math.random() * diceRoll) + 1)) + '**' + ' out of **' + diceRoll + '**!');
    }else if (diceAmount > 10){
      message.channel.send("Sorry, that's too many dice!")
    }else if (diceAmount >= 1){
        let rolling1 = ('**' + user + '** rolled a **');
        let rolling2 = ("** out of **" + diceRoll + "**!");
        let rollAmount = 0

      for (var i = 0; i < diceAmount; i++){
        let rolling = (Math.floor((Math.random() * diceRoll) + 1))
        rollAmount += rolling;
        if (i < (diceAmount - 1)){
          rolling += ("**,** ")
        }else if (i = (diceAmount - 1)){
          rolling = (("**and a **") + rolling)
        };
        rolling1 += rolling;
      };
      if (isNaN(diceMod) || diceMod < 0){
        message.channel.send(rolling1 + rolling2 + " (**" + rollAmount + "**)")
      }else{
        let rollMod = 0
        rollMod = (diceMod + rollAmount);
        message.channel.send(rolling1 + rolling2 + " (**" + rollAmount + "** + **" + diceMod + " **(Mod.) =** " + rollMod + "**)")
      }
    }
    };

  if (command === '!add'){
    if(isNaN(diceRoll) || isNaN(diceAmount)){
      message.channel.send("Sorry, that's not a number!")
    } else if (diceRoll > 1000000000000 || diceAmount > 1000000000000) {
      message.channel.send("Sorry, that's too high a number!")
    } else if (diceRoll < -1000000000000 || diceAmount < -1000000000000) {
      message.channel.send("Sorry, that's too low a number!")
    }else{
      message.channel.send("**" + diceRoll + " + " + diceAmount + "** equals **" + ((parseInt(diceRoll)) + (parseInt(diceAmount))) + "**!")
    }
  };

  if (command === '!multiply'){
    if(isNaN(diceRoll) || isNaN(diceAmount)){
      message.channel.send("Sorry, that's not a number!")
    } else if (diceRoll > 1000000000000 || diceAmount > 1000000000000) {
      message.channel.send("Sorry, that's too high a number!")
    } else if (diceRoll < -1000000000000 || diceAmount < -1000000000000) {
      message.channel.send("Sorry, that's too low a number!")
    }else{
      message.channel.send("**" + diceRoll + " * " + diceAmount + "** equals **" + ((parseInt(diceRoll)) * (parseInt(diceAmount))) + "**!")
    }
  };

  if (command === '!subtract'){
    if(isNaN(diceRoll) || isNaN(diceAmount)){
      message.channel.send("Sorry, that's not a number!")
    } else if (diceRoll > 1000000000000 || diceAmount > 1000000000000) {
      message.channel.send("Sorry, that's too high a number!")
    } else if (diceRoll < -1000000000000 || diceAmount < -1000000000000) {
      message.channel.send("Sorry, that's too low a number!")
    }else{
      message.channel.send("**" + diceRoll + " - " + diceAmount + "** equals **" + ((parseInt(diceRoll)) - (parseInt(diceAmount))) + "**!")
    }
  };

  if (command === '!divide'){
    if(isNaN(diceRoll) || isNaN(diceAmount)){
      message.channel.send("Sorry, that's not a number!")
    } else if (diceRoll > 1000000000000 || diceAmount > 1000000000000) {
      message.channel.send("Sorry, that's too high a number!")
    } else if (diceRoll < -1000000000000 || diceAmount < -1000000000000) {
      message.channel.send("Sorry, that's too low a number!")
    }else{
      message.channel.send("**" + diceRoll + " / " + diceAmount + "** equals **" + ((parseInt(diceRoll)) / (parseInt(diceAmount))) + "**!")
    }
  };

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
  }

//A coin flip command.
  if (command === '!coinflip') {
    let coin = (Math.floor((Math.random() * 2) + 1));
    if (coin === 1){
      message.channel.send('**' + user + '** flipped a coin and got **Heads!**')
    } else {
      message.channel.send('**' + user + '** flipped a coin and got **Tails!**')
    }
  };

//Sends the author an embed of all the commands.
	if (command === '!help'){
    let embed = new Discord.RichEmbed()
	    .setAuthor('COMMAND LIST')
	    .setDescription ('The commands for Trap-Bot.')
	    .setColor('#FFBA8F')
	    .addField('!whoami', 'Prints your user information.')
	    .addField('!trap', 'Side with the **correct** side!')
	    .addField('!not', 'Oh no the weirdo has joined us.')
	    .addField('!roll', 'Rolls a dice of any number. Layout: !roll <sides> <number of dice> <modifier to add>')
      .addField('!add', 'Adds two numbers together! Layout: !add <No1> <No2>')
      .addField('!multiply', 'Times two numbers together! Layout: !multiply <No1> <No2>')
      .addField('!subtract', 'Takes a number away from the other! Layout: !subtract <No1> <No2>')
      .addField('!divide', 'Divides two numbers! Layout: !divide <No1> <No2>')
	    .addField('!help', 'Displays this help text. Kind of redundant, really.')
	    .addField('!ping', 'Sends back the bot\'s ping.')
	    .addField('!serverinfo', 'Displays the server\'s information.')
      .addField('!servericon', 'Sends a URL of the server\'s icon.')
	    .addField('!avatar', 'Sends back the image of your avatar!')
	    .addField('!echo', 'Echoes a phrase.')
      .addField('!coinflip', 'Flips a coin.')
      .addField('!pat', 'Pat someone, adorably!')
      .addField('!stab', 'Kill your friends. D o   i t.')
      .addField('!kiss', 'Kiss people... forcefully, of course.')
      .addField('!thumbsup', 'Show others that you like their style.')
      .addField('!pester', 'Annoy your friends!')
      .addField('!cry', 'Burst into tears.')
      .addField('!tail', 'Wag your tail!')
      .addField('!slap', 'Ill behaviour will not be tolerated!')
      .addField('!hug', 'Show your friends some love!')


	message.author.send(embed)
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

//Sends the invite link.
      if (command === '!invite'){
        message.channel.send('Invite me to your server. Please~ \n' + "https://discordapp.com/oauth2/authorize?client_id=402741432739299330&permissions=3656768&scope=bot")
      };

      if (command === "!tail"){
        message.channel.send("**" + user + "'s** tail waves back and forth!", {files:["./gif/wag_" + (Math.floor((Math.random() * 5) + 1)) + ".gif"]})
      };

      if (command === "!cry"){
        message.channel.send("**" + user + "** begins to cry!", {files:["./gif/cry_" + (Math.floor((Math.random() * 9) + 1)) + ".gif"]})
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



//Emotes!
      if(message.channel.type === 'dm'){}
      else if ((message.mentions.members.first()) === undefined){}
      else{
        //Setting up username for the targetted user. FUCKING SPAGHETTI
        let mention = (message.mentions.members.first());
        let targetCollection = (message.mentions.users.filterArray(id => 'id'));
        let targetString = (util.inspect(targetCollection));
        let targetArgs = (targetString.split(','));
        let targetArgs2 = targetArgs[1];
        let targetArgs3 = ((util.inspect(targetArgs2)).split(' '));
        let targetArgs4 = targetArgs3[5];
        let targetUser = (targetArgs4.replace(/\\|'/g, ''));

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
            message.channel.send("**" + user + "** hugs me! Yay!", {files:["./gif/hug_" + (Math.floor((Math.random() * 8) + 1)) + ".gif"]})
          } else if (targetUser === user){
            message.channel.send("If you're that lonely, I'll give you a hug~", {files:["./gif/felix/felix_wag.gif"]})
          } else {
            message.channel.send("**" + user + "** hugs **" + targetUser + "!**", {files:["./gif/hug_" + (Math.floor((Math.random() * 8) + 1)) + ".gif"]})
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
};

}});
