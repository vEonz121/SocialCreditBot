# SocialCreditBot

### A Discord Mod Bot that is Inspired by the Glorious Motherland 💃💃💃
Utilizes a social credits system to determine bad behavior among server members. Moderate your chat with something that actually works! 😃

## Table of Contents
1. [Available Commands](#available-commands-%EF%B8%8F)
2. [How To Run](#how-to-run-)
3. [Planned Features](#planned-features-)
4. [Demo](#demo-)
5. [Requirements](#requirements-%EF%B8%8F)
6. [To Do](#todo-)

## Available Commands 💁‍♂️
> **Prefix is `$`**

```
reg   -   Register yourself on the social credits system
bal   -   Display your balance
gain  -   Gain social credits
lose  -   Lose social credits
```

---

## How To Run 👩‍💻
```bash
node run
```

## TODO 📝
- [x] Register and track users while recording/adding a social credits record on the backend.
- [x] Gain and lose social credits.
- [x] Decrease social credits if users say disallowed words.
- [ ] Message poster earns credits by receiving reactions.
- [ ] Message poster loses credits by losing reactions.

## Planned Features 👀
- [ ] _Populate future bot features here._

## Demo 👨‍🦽
![image](https://user-images.githubusercontent.com/51939599/138870916-a67e1834-c36d-4334-bc43-0ee75ec27089.png)

## Requirements ✔️
A .env file lets you customize your individual working environment variables hidden from the public access when hosting the bot.
You are required to create a .env file in the root directory which includes the following:
```
TOKEN= [paste your bot token here]
DB_HOST= [paste your database host address]
DB_USER= [paste your database username]
DB_PWD= [paste your database password]
DB_NAME= [paste the name of your database]
```

_This was not made by Winnie P._
