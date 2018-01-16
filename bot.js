var Discord = require('discord.js');
var logger = require('winston');
var client = new Discord.Client();

client.login('NDAyNzQxNDMyNzM5Mjk5MzMw.DT9Jxw.OuVo-Xg9bWyuQphRrf7hFKMi-Ts');

client.on('ready', () => {
  console.log(' ... \n ... \n It shall proceed...');
});

client.on('message', message => {
    var prefix = '!'
    var msg = message.content;

    if (msg === prefix + 'trap') {
        message.channel.send('**** thinks traps are gay!', {
            files: [
                "./gif/trap_1.gif"
            ]
        });
    };
	if (msg === prefix + 'roll') {
        message.channel.send('You rolled a **' + (Math.floor((Math.random() * 20) + 1)) + '**!');
    };
	if (msg === prefix + 'fuck traps'){
		message.channel.send({
			files: [
				"./gif/srsly.gif"
			]
		});
	}
	if (msg === prefix + 'fuck you'){
		message.channel.send('Harder daddy~');
	}
	if (msg === prefix + 'help'){
		message.author.send('```Commands: \n   roll = Roll a number! \n   trap = Tell the world the opinion nobody cares about anymore! \n   fuck you = How rude. \n   fuck traps = How lewd.\n   erp = You really like traps, don\'t you? \n   hot = Mmm traps. \n```'
		)
	};
		if (msg === prefix + 'erp'){
		message.author.send('Oniichan~', {
			files: [
				"./gif/trap_3.gif"
			]
		})
	};
		if (msg === prefix + 'crash me bby'){
		message.message.send(fuck)
	};
			if (msg === prefix + 'hot'){
		message.channel.send('H-hot.', {
			files: [
				"./gif/maid.gif"
			]
		})
	};
});


