import DiscordJS, { Intents } from "discord.js";
import * as dotenv from "dotenv";
import mysql from "mysql2";

//TODO: create a new .env

//col to const
const ub_userID = "ub_userID";
const ub_bal = "ub_bal";
const th_userID = "th_userID";
const th_time = "th_time";
const th_oper = "th_oper";
const th_postbal = "th_postbal";

//Tables to const
const UserBal = "UserBal";
const TransHist = "TransHist";
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

console.clear();
const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const prefix = "$";

client.on("ready", () => {
  console.log("China is ready");
});

client.on("messageCreate", (message) => {
  let discordUID = message.author.id.toString();
  let discordName = message.author.username;
  let discordTag = message.author.tag;
  let mention = "<@" + discordUID.toString() + ">";

  if (message.content.toLowerCase().includes("n word")) {
    db.connect(function (err) {
      if (err) throw err;
      var query = `SELECT ${ub_userID} FROM ${UserBal} WHERE ${ub_userID} = ${discordUID}`;
      db.query(query, function (err, result) {
        if (err) throw err;
        if (result.toString().length === 0) {
          //if user not on DataBase => inform to register
          message.channel.send(
            `${mention} You are not registerd yet. Try ${prefix}register`
          );
        } else {
          //if user exists => apply penalty -9999999
          let bal = "";
          var query = `SELECT ${ub_bal} FROM ${UserBal} WHERE ${ub_userID} = ${discordUID}`;
          db.query(query, function (err, result) {
            if (err) throw err;
            var output = JSON.parse(JSON.stringify(result));
            bal = output[0][`${ub_bal}`];
            var amount = -9999999;
            let newbal = parseInt(bal) + amount;
            var query = `INSERT INTO ${TransHist} (${th_userID},${th_time}, ${th_oper},${th_postbal}) VALUES ('${discordUID}', now(),${amount},${newbal})`;
            db.query(query, function (err) {});
            if (err) throw err;
            var query = `UPDATE ${UserBal} SET ${ub_bal} = ${newbal} WHERE ${ub_userID} = ${discordUID};`;
            db.query(query, function (err) {});
            if (err) throw err;
            message.reply(`YOU LOST CREDIT!!! -9999999`);
          });
        }
      });
    });
  }

  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.toString().toLowerCase();

  if (command === "register" || command === "reg") {
    db.connect(function (err) {
      if (err) throw err;
      var query = `SELECT ${ub_userID} FROM ${UserBal} WHERE ${ub_userID} = ${discordUID}`;

      db.query(query, function (err, result) {
        if (err) throw err;

        if (result.toString().length === 0) {
          //if user not on DataBase => insert to DataBase
          var msg = "Welcome to the CCP!, " + mention;
          message.channel.send(msg);
          var query = `INSERT INTO ${UserBal} (${ub_userID}) VALUES (${discordUID})`;
          db.query(query, function (err) {});
          if (err) throw err;
        } else {
          //if user exists => output already exists.
          message.channel.send(`You are already a member. ${mention}`);
        }
      });
    });
  }

  if (command === "balance" || command === "bal") {
    db.connect(function (err) {
      if (err) throw err;
      var query = `SELECT ${ub_userID} FROM ${UserBal} WHERE ${ub_userID} = ${discordUID}`;
      db.query(query, function (err, result) {
        if (err) throw err;
        if (result.toString().length === 0) {
          //if user not on DataBase => inform to register
          message.channel.send(
            `${mention} You are not registerd yet. Try ${prefix}register`
          );
        } else {
          //if user exists => output the credit of user
          let bal = "";
          var query = `SELECT ${ub_bal} FROM ${UserBal} WHERE ${ub_userID} = ${discordUID}`;
          db.query(query, function (err, result) {
            var output = JSON.parse(JSON.stringify(result));
            bal = output[0][`${ub_bal}`];
            message.channel.send(`${mention} Your Social Credit is: ${bal}`);
          });
        }
      });
    });
  }

  if (command === "gain" || command === "g") {
    db.connect(function (err) {
      if (err) throw err;
      var query = `SELECT ${ub_userID} FROM ${UserBal} WHERE ${ub_userID} = ${discordUID}`;
      db.query(query, function (err, result) {
        if (err) throw err;
        if (result.toString().length === 0) {
          //if user not on DataBase => inform to register
          message.channel.send(
            `${mention} You are not registerd yet. Try ${prefix}register`
          );
        } else {
          //if user exists => add and display how much was added
          let bal = "";
          var query = `SELECT ${ub_bal} FROM ${UserBal} WHERE ${ub_userID} = ${discordUID}`;
          db.query(query, function (err, result) {
            if (err) throw err;
            var output = JSON.parse(JSON.stringify(result));
            bal = output[0][`${ub_bal}`];
            var amount = 20;
            let newbal = parseInt(bal) + amount;
            var query = `INSERT INTO ${TransHist} (${th_userID},${th_time}, ${th_oper},${th_postbal}) VALUES ('${discordUID}', now(),${amount},${newbal})`;
            db.query(query, function (err) {});
            if (err) throw err;
            var query = `UPDATE ${UserBal} SET ${ub_bal} = ${newbal} WHERE ${ub_userID} = ${discordUID};`;
            db.query(query, function (err) {});
            if (err) throw err;
            message.channel.send(`${mention} +${amount} Social Credits`);
          });
        }
      });
    });
  }

  if (command === "lose" || command === "l") {
    db.connect(function (err) {
      if (err) throw err;
      var query = `SELECT ${ub_userID} FROM ${UserBal} WHERE ${ub_userID} = ${discordUID}`;
      db.query(query, function (err, result) {
        if (err) throw err;
        if (result.toString().length === 0) {
          //if user not on DataBase => inform to register
          message.channel.send(
            `${mention} You are not registerd yet. Try ${prefix}register`
          );
        } else {
          //if user exists => substract and display how much was substracted
          let bal = "";
          var query = `SELECT ${ub_bal} FROM ${UserBal} WHERE ${ub_userID} = ${discordUID}`;
          db.query(query, function (err, result) {
            if (err) throw err;
            var output = JSON.parse(JSON.stringify(result));
            bal = output[0][`${ub_bal}`];
            var amount = -20; //add negative number
            let newbal = parseInt(bal) + amount;
            var query = `INSERT INTO ${TransHist} (${th_userID},${th_time}, ${th_oper},${th_postbal}) VALUES ('${discordUID}', now(),${amount},${newbal})`;
            db.query(query, function (err) {});
            if (err) throw err;
            var query = `UPDATE ${UserBal} SET ${ub_bal} = ${newbal} WHERE ${ub_userID} = ${discordUID};`;
            db.query(query, function (err) {});
            if (err) throw err;
            message.channel.send(`${mention} ${amount} Social Credits`);
          });
        }
      });
    });
  }

  if (command === "bing") {
    setTimeout(function () {
      message.reply(`qiling 🍦`);
    }, 1000);
  }
});

client.login(process.env.TOKEN);
