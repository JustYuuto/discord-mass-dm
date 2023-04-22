const { Client } = require('discord.js-selfbot-v13');
const { userToken, guildId, channelId, message } = require('./config.json');
const inquirer = require('inquirer');
const chalk = require('chalk');
const percentage = (partialValue, totalValue) => parseFloat((100 * partialValue) / totalValue).toPrecision(3);

const client = new Client({
  checkUpdate: false
});

client.on('ready', async () => {
  console.log(`Logged in ${chalk.bold(client.user.tag)}`);

  await client.guilds.fetch();

  const guild = client.guilds.cache.get(guildId);
  for (let index = 0; index <= guild.memberCount; index += 200) {
    await guild.members.fetchMemberList(channelId, index === 0 ? 100 : index, index !== 100).catch(() => {});
    console.log(`Fetched ${index} members of ${guild.memberCount} members (${percentage(index, guild.memberCount)}%)`);
    await client.sleep(500);
  }
  if (guild.members.cache.get(client.user.id)) guild.members.cache.delete(client.user.id);

  const users = guild.members.cache.size;
  inquirer
    .prompt([{
      name: 'start_dming',
      message: `Start DM-ing ${users} users?`,
      type: 'confirm',
      default: true
    }])
    .then(async (answers) => {
      const choice = answers['start_dming'];

      if (choice === true) {
        let i = 0;
        for (const member of guild.members.cache) {
          i++;
          if (member[1].user.bot) console.log(`Skipping ${chalk.bold(member[1].user.tag)} as is it a bot (${percentage(i, users)}%)`);
          else {
            await client.users.cache.get(member[0])?.send(message)
              .then(() => {
                console.log(`Successfully DM-ed ${chalk.bold(member[1].user.tag)} (${percentage(i, users)}%)`);
              })
              .catch(() => {
                console.log(`Cannot DM ${chalk.bold(member[1].user.tag)}! (${percentage(i, users)}%)`)
              });
            await client.sleep(1000);
          }
        }
        console.log(`Finished DM-ing ${users} users! Exiting...`);
        process.exit(0);
      } else {
        console.log('Exiting...');
        process.exit(0);
      }
    });
});

client.login(userToken);
