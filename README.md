# Discord Mass DM Tool

## How to use

* Download the repo and extract it to a folder
* Edit the [`config.json`](config.json) file to your needs
  * ``userToken``: the account token you want to use to DM
  * ``guildId``: the guild id of the ``channelId`` 
  * ``channelId``: a channel which contains the members you want to DM (the members list will be used)
  * ``message``: the message to send
* Run ``node index.js``
* Wait for the script to fetch all the users
  > depending on the number of members in the server, the fetch time may be longer or shorter
* When the script fetched all the users, type "y" to start dm-ing all the users

## Todo
* [ ] Handle rate limits
* [ ] Skip certain users based on a list of IDs
