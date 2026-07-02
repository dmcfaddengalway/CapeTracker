/* =========================================================================
   CAPE DATA
   Each cape is a self-contained data set: skills[], achievements[], tips[].
   Only MQC is fully populated right now — Max / Completionist / Trimmed
   Completionist are wired up with the same rendering pipeline and a
   "your own additions" fallback, ready to be filled in later.
   ========================================================================= */

// Order below follows the in-game Skills tab grid (Attack, Constitution,
// Mining, Strength, Agility, Smithing, ... Archaeology, Necromancy) rather
// than requirement level, so this list and the tile grid it feeds both read
// the same as the stats interface — see skillTileHTML in ui.js.
export const SKILLS_MQC = [
  {id:'all90', name:'All skills (except Invention)', req:90, tag:'Baseline', note:'Challenge Maria, Dishonourable Gains'},
  {id:'mining', name:'Mining', req:102, tag:'Boostable', note:'Centaur of Attention'},
  {id:'cooking', name:'Cooking', req:91, tag:'Ark', note:'Ark mini-quests'},
  {id:'crafting', name:'Crafting', req:91, tag:'Ark', note:'Ark mini-quests'},
  {id:'firemaking', name:'Firemaking', req:95, tag:'Skilling', note:"Bill & Ben's Egg Salon Joint Venture"},
  {id:'magic', name:'Magic', req:93, tag:'Boostable', note:'Advanced Sweeping'},
  {id:'fletching', name:'Fletching', req:95, tag:'Skilling', note:"Bill & Ben's Egg Salon Joint Venture"},
  {id:'runecrafting', name:'Runecrafting', req:99, tag:'Skilling', note:"Stealing Sedridor's Stones"},
  {id:'slayer', name:'Slayer', req:115, tag:'Boostable', note:'Message from the Abyss'},
  {id:'farming', name:'Farming', req:114, tag:'Boostable', note:'Family Spirit Tree'},
  {id:'dungeoneering', name:'Dungeoneering', req:117, tag:'120 rec.', note:'History of Bilra (120 for cape perk)'},
  {id:'divination', name:'Divination', req:95, tag:'Boostable', note:'Data Recovery'},
  {id:'archaeology', name:'Archaeology', req:120, tag:'Required', note:'All research & mysteries'},
  {id:'necromancy', name:'Necromancy', req:120, tag:'Required', note:'Birds of Prey'},
];

// Full 307-item official achievement list (from the wiki's Master Quest Cape
// (achievement) page, pasted in by the user since that page didn't extract
// cleanly via automated fetch). `time` is a rough estimate derived from
// each item's listed weight/difficulty number — not individually researched
// like the old curated subset was, so treat it as a starting point rather
// than gospel; refine any of these as you go. `tip` is intentionally blank
// across the board for the same reason (307 hand-written tips would risk
// making things up) — add your own via edits here as you learn shortcuts.
export const ACHIEVEMENTS_MQC = [
  {id:'abuginthesystem', title:'A bug in the system', req:'Find and read the scruffy note in the Scabarite Cavern.', tip:'', time:'~15 min', tags:['Lore', 'Books']},
  {id:'acultistsjourney', title:'A Cultist\'s Journey', req:'Complete the \'A Cultist\'s Journey\' tasks from the Curator.', tip:'', time:'~15 min', tags:['Lore', 'Miniquests']},
  {id:'aminishipment', title:'A Mini Shipment', req:'Loot the trunk in the Temple of Aminishi.', tip:'', time:'~15 min', tags:['Combat', 'Shadow Reef']},
  {id:'anewdirection', title:'A New Direction', req:'Reunite Irwinsson with his lost compass.', tip:'', time:'~30 min', tags:['Exploration', 'Anachronia']},
  {id:'asliverofsilverhelpsthesanguinegodown', title:'A Sliver of Silver Helps the Sanguine Go Down', req:'Learn how to smith more durable havensilver.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'advancedsweeping', title:'Advanced Sweeping', req:'Fully enchant your broomstick after the \'Swept Away\' quest.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'aerecksoldbones', title:'Aereck\'s Old Bones', req:'Claim ancient bones from Father Aereck after \'The Restless Ghost\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'aftertheclose', title:'After the Close', req:'Unlock the Closure\'s robes cosmetic override outfit after \'Once Upon a Time in Gielinor\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'aftertheflood', title:'After the Flood', req:'Find and read Elidinis\' memoir.', tip:'', time:'~30 min', tags:['Lore', 'Books']},
  {id:'agedjournal', title:'Aged Journal', req:'Find and read the Aged Journal in Daemonheim.', tip:'', time:'~30 min', tags:['Lore', 'Books']},
  {id:'alithetrader', title:'Ali the Trader', req:'Unlock all Rogue Trader merchandise.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'allrise', title:'All Rise', req:'Complete all Court Cases and claim a gavel and the \'the Detective\' title from the courthouse clerk.', tip:'', time:'7-12 hrs', tags:['Activities', 'D&D']},
  {id:'amiagoodboyyet', title:'Am I a good boy yet?', req:'Get a gift from the stray dog after he moves into Fort Forinthry.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'anexplorationofhavenhythe', title:'An Exploration of Havenhythe', req:'Find all volumes of Kaleb\'s Travel Journal. (X/3)', tip:'', time:'~10 min', tags:['Lore', 'Books']},
  {id:'angsoffmyring', title:'Angs Off My Ring', req:'Return the wedding ring after \'The Light Within\'.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'animalingual', title:'Animalingual', req:'Fully upgrade the cramulet. (X/5)', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'annihilator', title:'Annihilator', req:'Earn \'the Annihilator\' title by fighting all four nihil at once.', tip:'', time:'~1 hr', tags:['Lore', 'Post-Quest', 'Combat (Post-Quest)']},
  {id:'anotheronescabaritesthedust', title:'Another One Scabarites The Dust', req:'Kill elite profane scabarites with the primed keris equipped to upgrade it after \'Beneath Scabaras\' Sands\'. (X/200)', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest', 'Combat (Post-Quest)']},
  {id:'anyoddchicken', title:'Any Odd Chicken', req:'Claim Professor Oddenstein\'s extra rewards after \'Ernest the Chicken\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'apeahollow', title:'Ape A\'hollow', req:'Unblock the hollow log and tunnel shortcut after \'Fairy Tale III\'.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'areyouneedingaccess', title:'Are You Needing Access?', req:'Gain access to the secret treasure room from \'Do No Evil\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'areyouthekeymaster', title:'Are You The Keymaster?', req:'Add all valid keys to the steel key ring after \'One Small Favour\'.', tip:'', time:'~1 hr', tags:['Lore', 'Post-Quest']},
  {id:'arghitburns', title:'Argh, it burns!', req:'Find out who in Amberfell has the \'monthly affliction\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'arisefromtheash', title:'Arise from the Ash', req:'Defeat the phoenix once, after \'In Pyre Need\'.', tip:'', time:'~30 min', tags:['Activities', 'D&D']},
  {id:'armadyleanexpert', title:'Armadylean Expert', req:'Restored a collection of Armadylean artefacts.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Armadylean']},
  {id:'aroundtheworldinsixways', title:'Around the World in Six Ways', req:'Unlock all hot-air balloon travel routes. (X/6)', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'asclearasacrystalseed', title:'As Clear as a Crystal Seed', req:'Unlock the Temple of Light teleport after \'Within the Light\'.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'astaxedasayak', title:'As Taxed as a Yak', req:'Gain access to the Contraband Yak Produce shop.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'azacoraxsrewards', title:'Azacorax\'s Rewards', req:'Speak to Azacorax after \'Rune Memories\' and gain Magic or Prayer XP.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'azdaranbirthright', title:'Azdaran Birthright', req:'Complete the Azdaran document.', tip:'', time:'~45 min', tags:['Lore', 'Books']},
  {id:'bandossmemories', title:'Bandos\'s Memories', req:'Recover all 14 of Bandos\'s memories on Yu\'biusk.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'bandosianexpert', title:'Bandosian Expert', req:'Restored a collection of Bandosian artefacts.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Bandosian']},
  {id:'banetuner', title:'Bane Tuner', req:'Unlock the spell: Tune Banite Ore.', tip:'', time:'1-2 hrs', tags:['Skills', 'Magic']},
  {id:'bankinghistory', title:'Banking History', req:'Find all hidden treasure from the \'Making History\' quest. (X/11)', tip:'', time:'1-2 hrs', tags:['Lore', 'Post-Quest']},
  {id:'behemothnotes', title:'Behemoth Notes', req:'Find all Behemoth notes.', tip:'', time:'1-2 hrs', tags:['Lore', 'Books']},
  {id:'billbenseggsalonjointventure', title:'Bill & Ben\'s Egg/Salon Joint Venture', req:'After Extinction quest, \'eggs\'plore Prehistoric Potterington\'s (sunny)-side-(up) hustle.', tip:'', time:'~10 min', tags:['Activities', '\'Accidental\' Skilling Station']},
  {id:'birdsofprey', title:'Birds of Prey', req:'Track all of the owls for Deryn.', tip:'', time:'~1 hr', tags:['Exploration', 'City of Um']},
  {id:'blindedbyramarnosteaching', title:'Blinded by Ramarno\'s Teaching', req:'Claim Smithing XP from Ramarno after \'Defender of Varrock\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'bloodstainedtreasure', title:'Bloodstained Treasure', req:'Obtain hidden runes from Meiyerditch laboratory and blood altar ruins. (X/2)', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'bridgeoverfremmywaters', title:'Bridge over Fremmy Waters', req:'Complete all the unabridged Fremennik Sagas.', tip:'', time:'~45 min', tags:['Lore']},
  {id:'brothersgower', title:'Brothers Gower', req:'Claim the rewards from all three Gower brothers after \'Gower Quest\'.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'brutalstuffsies', title:'Brutal Stuffsies', req:'Open Uglug\'s Stuffsies store by selling him Relicym\'s balm.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'bugsinthewalls', title:'Bugs in the Walls', req:'Find and read the High Priest of Scabaras\' notes.', tip:'', time:'~30 min', tags:['Lore', 'Books']},
  {id:'buyandsellsomexp', title:'Buy and Sell Some XP', req:'Claim Thieving XP after \'Buyers and Cellars\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'buyingupancientartefacts', title:'Buying Up Ancient Artefacts', req:'Buy an ancient staff after \'Desert Treasure\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'carnilleanriches', title:'Carnillean Riches', req:'Return Lady Henryeta\'s necklace or open Ceril\'s money pouch after \'Carnillean Rising\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'castawaysofthearc', title:'Castaways of the Arc', req:'Discover all the Arc castaways.', tip:'', time:'1-2 hrs', tags:['Exploration', 'The Arc']},
  {id:'cavingintothegains', title:'Caving into the Gains', req:'Claim the XP from cave paintings and 5,000 coins from Explorer Jack.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'ceciliaimbeggingyouplease', title:'Cecilia, I\'m Begging You, Please...', req:'Tell Sister Cecilia whether to leave or stay after \'One Piercing Note\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'centaurofattention', title:'Centaur of Attention', req:'Read the book acquired from Roberta outside the Everlight porcelain clay mine. (X/2)', tip:'', time:'~15 min', tags:['Lore', 'Books']},
  {id:'challengemaria', title:'Challenge Maria', req:'Complete Maria\'s additional challenges and unlock all chests in the Gulvas mansion.', tip:'', time:'3-5 hrs', tags:['Lore', 'Post-Quest']},
  {id:'challengingchat', title:'Challenging Chat', req:'Hear Vorago\'s introduction dialogue.', tip:'', time:'~15 min', tags:['Lore', 'Miniquests']},
  {id:'chillingwitharrav', title:'Chilling with Arrav', req:'Put Arrav (north-east of the mahjarrat ritual marker) to rest after \'Ritual of the Mahjarrat\'.', tip:'', time:'~1 hr', tags:['Lore', 'Post-Quest']},
  {id:'chippytransport', title:'Chippy Transport', req:'Unlock the ability to chip teleport tablets to Trollheim.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'chivalryisdead', title:'Chivalry is Dead', req:'Claim the post-quest rewards from \'The Death of Chivalry\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'chivalryisfed', title:'Chivalry is Fed', req:'Restore the cabbage patch after \'The Death of Chivalry\'. (X/2)', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'chivalryisthreads', title:'Chivalry is Threads', req:'Unlock Templar and Dulcin armour after \'The Death of Chivalry\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest', 'Combat (Post-Quest)']},
  {id:'circusoffire', title:'Circus of Fire', req:'Unlock the firemaker\'s outfit from the circus.', tip:'', time:'~15 min', tags:['Activities', 'D&D']},
  {id:'claimingazzanadrasheart', title:'Claiming Azzanadra\'s Heart', req:'Claim the medium XP lamp from Azzanadra after \'Heart of Stone\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'claimingtheknightsexperience', title:'Claiming the Knight\'s Experience', req:'Claim the smithing lamp from Squire Asrol after \'Knight\'s Sword\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'clausisrising', title:'Claus is Rising', req:'Claim a reward from Claus after doing him a favour.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'cluesinthemonkeydrool', title:'Clue\'s in the Monkey Drool', req:'Receive the medium clue scroll from a monkey in your backpack.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'collectionofzamorakiannotes', title:'Collection of Zamorakian Notes', req:'Find all 5 Zamorakian notes, dropped by those dedicated to Zamorak.', tip:'', time:'~30 min', tags:['Lore', 'Books']},
  {id:'completehistoryofdroalak', title:'Complete History of Droalak', req:'Free Droalak after \'Making History\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'completetrekky', title:'Complete Trekky', req:'Fully level up all Temple Trekking companions.', tip:'', time:'4-7 hrs', tags:['Activities', 'Minigames']},
  {id:'cooksdelights', title:'Cook\'s Delights', req:'Claim the cook\'s extra rewards after \'Cook\'s Assistant\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'countalllightfingers', title:'Count All Light Fingers', req:'Fully upgrade the Thieves\' Guild.', tip:'', time:'~1 hr', tags:['Skills', 'Thieving']},
  {id:'cowerbehindthechosencommander', title:'Cower Behind the Chosen Commander', req:'Claim the goblin cower shield.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'crandoorssecret', title:'Cran Door\'s Secret', req:'Unlocked the secret door between Crandor and Karamja.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'culinaryexchange', title:'Culinary Exchange', req:'Deliver a serving of tangled toad\'s legs to Longramble during or after \'The Path of Glouphrie\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'curses', title:'Curses!', req:'Unlock the ancient curses by reading the ancient hymnal given to you by Azzanadra.', tip:'', time:'~30 min', tags:['Skills', 'Prayer']},
  {id:'daemonologyofcelerity', title:'Daemonology of Celerity', req:'Claim the malleus daemoniorum.', tip:'', time:'~30 min', tags:['Lore', 'Books']},
  {id:'daerotakethisexperience', title:'Daero Take This Experience?', req:'Claim the XP reward from Daero following Monkey Madness.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'darkreadingmaterial', title:'Dark Reading Material', req:'Collect the following \'lore\' books from the Infernal Source.', tip:'', time:'~15 min', tags:['Skills', 'Archaeology', 'Zamorakian']},
  {id:'datarecovery', title:'Data Recovery', req:'Help the Archivist recover all core memory data in the Hall of Memories.', tip:'', time:'~1 hr', tags:['Skills', 'Divination']},
  {id:'deadliercatch', title:'Deadlier Catch', req:'Hunt the Thalassus until it flees for good. (X/11)', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'deathtothemahjarrat', title:'Death to the Mahjarrat', req:'Discover all the mahjarrat deathstones on Freneskae.', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'deepandbloodyexperience', title:'Deep and Bloody Experience', req:'Claim the XP reward after \'Blood Runs Deep\'.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'diamondsinthedung', title:'Diamonds in the Dung', req:'Find Uraeus and Aten in the Kalphite Nursery after \'Diamond in the Rough\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'diariesoftheclans', title:'Diaries of the Clans', req:'Find the clan journal pages from the Hefin Agility Course in Prifddinas.', tip:'', time:'~30 min', tags:['Lore', 'Books']},
  {id:'diaryoforeb', title:'Diary of Oreb', req:'Discover and read all five journals of The Magister.', tip:'', time:'1-2 hrs', tags:['Lore', 'Books']},
  {id:'diaryofthegods', title:'Diary of the Gods', req:'Find all five God Wars journals.', tip:'', time:'1-2 hrs', tags:['Lore', 'Books']},
  {id:'dishonourablegains', title:'Dishonourable Gains', req:'Claim all XP chests during or after \'Dishonour among Thieves\'.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'dishonourableloot', title:'Dishonourable Loot', req:'Claim all loot chests after \'Dishonour among Thieves\'.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'distorteddiv', title:'Distorted Div', req:'Claim the one-time Divination XP from a distorted engrammeter.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'doaminiontakenotes', title:'Do a Minion, Take Notes', req:'Complete the Dominion journal.', tip:'', time:'1-2 hrs', tags:['Lore', 'Books']},
  {id:'donoelite', title:'Do No Elite', req:'Claim the elite clue scroll using Ava\'s alerter from \'Do No Evil\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'dontfeartheripper', title:'Don\'t Fear the Ripper', req:'Find and read all five miner\'s journals and the diary of Jebediah Omnis.', tip:'', time:'1-2 hrs', tags:['Lore', 'Books']},
  {id:'dragonink', title:'Dragon Ink', req:'Collect the following lore books from bosses inside the Dragonkin Laboratory.', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'dragonkindiary', title:'Dragonkin Diary', req:'Find and return Naressa\'s journal to her.', tip:'', time:'1-2 hrs', tags:['Exploration', 'Senntisten']},
  {id:'dragonkinexpert', title:'Dragonkin Expert', req:'Restored at least one of each dragonkin artefact.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Dragonkin']},
  {id:'dragonkinlogs', title:'Dragonkin Logs', req:'Find and read the adamant dragon journals.', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'draugrmetohela', title:'Draugr Me to Hela', req:'Free the remaining spirits around above-ground Daemonheim after \'Remains of the Necrolord\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'dustingmurial', title:'Dusting Murial', req:'Update the Dragonkin Primer with murals in Brimhaven Dungeon and Mount Firewake.', tip:'', time:'1-2 hrs', tags:['Lore', 'Books']},
  {id:'easternadventurereasterncuriosities', title:'Eastern Adventurer: Eastern Curiosities', req:'Complete story voyages of the Architect, Chef and Trapper.', tip:'Time-gated, not a sit-down grind: completing all four Eastern Adventurer storylines together takes about 120 days of Player-Owned Port voyages, only ~5 min/day of actual effort across all of them.', time:'~30 days total (~5 min/day)', tags:['Activities', 'Player-Owned Port', 'Timegated']},
  {id:'easternadventurerguardiansoftheworld', title:'Eastern Adventurer: Guardians of the World', req:'Complete story voyages of the Tengu, Memory and Exile.', tip:'Time-gated, not a sit-down grind: completing all four Eastern Adventurer storylines together takes about 120 days of Player-Owned Port voyages, only ~5 min/day of actual effort across all of them.', time:'~30 days total (~5 min/day)', tags:['Activities', 'Player-Owned Port', 'Timegated']},
  {id:'easternadventurerhyuji', title:'Eastern Adventurer: Hyu-Ji', req:'Complete story voyages of the Biologist, Missionary and Convict.', tip:'Time-gated, not a sit-down grind: completing all four Eastern Adventurer storylines together takes about 120 days of Player-Owned Port voyages, only ~5 min/day of actual effort across all of them.', time:'~30 days total (~5 min/day)', tags:['Activities', 'Player-Owned Port', 'Timegated']},
  {id:'easternadventurerquin', title:'Eastern Adventurer: Quin', req:'Complete story voyages of the Whaler, Occultist and Assassin.', tip:'Time-gated, not a sit-down grind: completing all four Eastern Adventurer storylines together takes about 120 days of Player-Owned Port voyages, only ~5 min/day of actual effort across all of them.', time:'~30 days total (~5 min/day)', tags:['Activities', 'Player-Owned Port', 'Timegated']},
  {id:'eeeeagle', title:'EEEEAGLE!', req:'Fully unlock all eagle transport routes.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'enoughofthecrazywalking', title:'Enough of the Crazy Walking', req:'Purchase the Mad Ramblings.', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'epiloguequeexperience', title:'Epi Logueque Experience', req:'Watch the \'While Guthix Sleeps\' epilogue and claim the XP reward.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'experiencethefateofthegods', title:'Experience the Fate of the Gods', req:'Claim and use the \'Fate of the Gods\' XP lamps from Azzanadra and Wahisietel.', tip:'', time:'~1 hr', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'explorefornestor', title:'Explore for Nestor', req:'Find and read the explorer\'s notes in the Keldagrim library.', tip:'', time:'~30 min', tags:['Lore', 'Books']},
  {id:'familyspirittree', title:'Family Spirit Tree', req:'Reconnect the Prifddinas spirit tree with her brethren.', tip:'', time:'~30 min', tags:['Exploration', 'Prifddinas']},
  {id:'finaldestinationunlocked', title:'Final Destination Unlocked', req:'Unlock all ferry points in the City of Um. (X/5)', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'findingtali', title:'Finding Tali', req:'Find Tali and convince her to return home.', tip:'', time:'~30 min', tags:['Exploration', 'Havenhythe', 'Wendlewick']},
  {id:'firesaremostlyharmless', title:'Fires are Mostly Harmless', req:'Light the campfire and find exotic herbs and seeds after \'Fairy Tale III\'.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'flippers', title:'Flippers', req:'Convince Flippers McGraw in the Port Sarim pub to join your crew.', tip:'', time:'~15 min', tags:['Exploration', 'The Arc']},
  {id:'flyyoufool', title:'Fly You Fool', req:'Convince Velrak the Explorer to escape Taverley Dungeon.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'followinginthefootsteps', title:'Following In The Footsteps', req:'Find out the outcome of the research continued by Vicendithas.', tip:'Time-gated, not a sit-down grind: one visit unlocks per month over 12 months (6 months if you pay resources to skip ahead each time), only ~5 min of actual effort each visit.', time:'12 months total (~5 min/month)', tags:['Activities', 'D&D', 'Effigy Incubator', 'Timegated']},
  {id:'fortheloveofmabel', title:'For the Love of Mabel', req:'Return Mabel\'s ring and chop down the guard\'s tree.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'forcaesmettle', title:'Forcae\'s Mettle', req:'Complete Forcae\'s journal. (X/10)', tip:'', time:'~45 min', tags:['Lore', 'Books']},
  {id:'fredsshearings', title:'Fred\'s Shearings', req:'Claim 1,940 coins from Fred the Farmer after the \'Sheep Shearer\' miniquest.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'freebeerhere', title:'Free Beer Here', req:'Tell Faisal the Barman that Traitorous Hesham\'s drink was poisoned.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'friendoftheimcando', title:'Friend of the Imcando', req:'Engage in all of Thalmund\'s conversations.', tip:'Time-gated, not a sit-down grind: Thalmund only appears on Wednesdays, so this stretches across 7 weeks even though each visit only takes about a minute.', time:'7 weeks total (~1 min/wk)', tags:['Exploration', 'City of Um', 'Timegated']},
  {id:'giftfromsliske', title:'Gift from Sliske', req:'Unlock Sliske\'s gift and the sixth-age circuit upgrade.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'godwars', title:'God Wars', req:'Visit an ancient war, which became unfrozen after hundreds of years.', tip:'', time:'~10 min', tags:['Combat', 'God Wars Dungeon']},
  {id:'goebieonewiththewildlife', title:'Goebie One with the Wildlife', req:'Complete Arod\'s wildlife reserve on Mazcab.', tip:'', time:'~30 min', tags:['Skills', 'Hunter']},
  {id:'goebierelics', title:'Goebie Relics', req:'Find all Mazcab stone fragments and take them to the ancient statue.', tip:'', time:'~15 min', tags:['Lore', 'Books']},
  {id:'gotavyrereputation', title:'Got a Vyre Reputation', req:'Unlock the Vyrelord/Vyrelady title and reach maximum vyre reputation in Darkmeyer.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'goulashgetyourfreegoulash', title:'Goulash! Get Your Free Goulash!', req:'Drink 10 bowls of goulash after \'Swept Away\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'graverecords', title:'Grave Records', req:'Collect all 11 pages of the \'Grave Records\' in the Sanctum of Rebirth.', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'grondabanslegacy', title:'Grondaban\'s Legacy', req:'Obtain Grondaban\'s stalker notes from the stalker dungeon.', tip:'', time:'~15 min', tags:['Lore', 'Books']},
  {id:'gunningforjewellery', title:'Gunning for Jewellery', req:'Engrave all of Dororan\'s jewellery.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'guthixandthechamberofsecrets', title:'Guthix and the Chamber of Secrets', req:'Learn about Guthix\'s core memories in the Hall of Memories.', tip:'', time:'~30 min', tags:['Skills', 'Divination']},
  {id:'guthixianexpert', title:'Guthixian Expert', req:'Restored at least one of each Guthixian artefact.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Guthixian']},
  {id:'haulcomestotempleton', title:'Haul Comes to Templeton', req:'Unlock the ability to trade noted artefacts with Simon Templeton.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'heavymetal', title:'Heavy Metal', req:'Obtain all the entries of Boric\'s Book of Metal by mining the listed ores or catalysts. (X/9)', tip:'', time:'~10 min', tags:['Lore', 'Books']},
  {id:'helloilikemoney', title:'Hello, I Like Money', req:'Claim 1000 coins from Hannah after solving her crab problem.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'herbisflax', title:'Herbi\'s Flax', req:'Give Herbi Flax\'s diary to the Varrock apothecary.', tip:'', time:'~30 min', tags:['Lore', 'Books']},
  {id:'herewasascabarasmask', title:'Here Was a Scabaras Mask', req:'Gain access to the secret treasure room from \'Diamond in the Rough\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'heroesofthegraveyard', title:'Heroes of the Graveyard', req:'Find and read all four books about the heroes buried in Senntisten graveyard.', tip:'', time:'~30 min', tags:['Exploration', 'Senntisten']},
  {id:'historyofbilrach', title:'History of Bilrach', req:'Find all Chronicles of Bilrach.', tip:'', time:'4-7 hrs', tags:['Lore', 'Books']},
  {id:'homeiswherethegodis', title:'Home is Where the God is', req:'Convince Armadyl to visit Stormguard.', tip:'', time:'~45 min', tags:['Skills', 'Archaeology', 'Armadylean']},
  {id:'icanseeformilesandmiles', title:'I Can See For Miles and Miles', req:'Unlock all beacon keepers and fully unlock the beacon map.', tip:'', time:'2-3 hrs', tags:['Lore', 'Post-Quest']},
  {id:'idigthistransportation', title:'I Dig This Transportation', req:'Unlock Dig Site pendants.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'iknowiwasthere', title:'I Know. I Was There...', req:'Obtain personal stories from Edgeville regarding the destruction after \'The Ritual of the Mahjarrat\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'ipresumetheserewardsareminedeath', title:'I Presume These Rewards Are Mine, Death?', req:'Claim all rewards from the statue of Death after \'Missing, Presumed Death\'.', tip:'', time:'~1 hr', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'iwantanewduck', title:'I Want a New Duck', req:'Fish for all of the peas in Paddlington after \'Duck Quest\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'imforeverwashingshadows', title:'I\'m Forever Washing Shadows', req:'Aid Lord Amlodd in cleansing shadow cores.', tip:'', time:'~30 min', tags:['Exploration', 'Prifddinas']},
  {id:'ivegotalittlelistofminiquests', title:'I\'ve Got a Little List (of Miniquests)', req:'Complete all miniquests listed in the Quests interface. Does not include sagas.', tip:'', time:'~10 min', tags:['Lore']},
  {id:'iceicechimpy', title:'Ice Ice Chimpy', req:'Complete 25 chimp ice deliveries.', tip:'', time:'1-2 hrs', tags:['Lore', 'Post-Quest']},
  {id:'icthlarinslittlechest', title:'Icthlarin\'s Little Chest', req:'Loot the chest from the pyramid during or after \'Icthlarin\'s Little Helper\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'impressingchar', title:'Impressing Char', req:'Create Char\'s most treasured symbol in her training cave.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'ishechipped', title:'Is He Chipped?', req:'Return Bob\'s collar to him during or after \'Ritual of the Mahjarrat\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'itslikegodbookilluminationsinhere', title:'It\'s Like God Book Illuminations in Here', req:'Create all 6 illuminated God Books after \'One Piercing Note\'.', tip:'', time:'2-3 hrs', tags:['Lore', 'Post-Quest']},
  {id:'ivanisflailing', title:'Ivan is Flailing', req:'Unlock the full power of the ivandis flail by burning vyre corpses in the Columbarium. (X/500)', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'jasnotmeantformortalhands', title:'Jas not Meant for Mortal Hands', req:'Return to the Submerged Statue at Entrana after \'One of a Kind\' and \'Ritual of the Mahjarrat\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'kaikistusks', title:'Kaiki\'s Tusks', req:'Complete Kaigi\'s journal.', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'kalgerionnotes', title:'Kal\'gerion Notes', req:'Find all Kal\'gerion notes.', tip:'', time:'3-5 hrs', tags:['Lore', 'Books']},
  {id:'keepingupwiththecarnilleans', title:'Keeping Up with the Carnilleans', req:'Claim and use 8 experience lamps from Philipe Carnillean. (X/16)', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'koscheiscache', title:'Koschei\'s Cache', req:'Complete the \'Koschei\'s Troubles\' miniquest and unlock all jewel memories.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'kudostoyou', title:'Kudos to You', req:'Reach full Kudos with the Varrock Museum. (X/198)', tip:'', time:'1-2 hrs', tags:['Lore', 'Post-Quest']},
  {id:'lampofluxury', title:'Lamp of Luxury', req:'Rub these quest lamps that can be reclaimed from May\'s storage chest, near Varrock lodestone. (X/40)', tip:'', time:'~10 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'lastofthesummerswine', title:'Last of the Summer Swine', req:'Fully upgrade the pig creation machine after \'Bringing Home the Bacon\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'learningfrommrmordaut', title:'Learning from Mr Mordaut', req:'Claim and use the Divination XP lamp from Mr. Mordaut after \'One of a Kind\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'legalentitlement', title:'Legal Entitlement', req:'Inform the Old man about the fate of his mother after \'Vessel of the Harbinger\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'letusgiveugthanks', title:'Let Us Give Ugthanks', req:'Find and read the Ugthanatos journal.', tip:'', time:'1-2 hrs', tags:['Lore', 'Books']},
  {id:'letshopeitdoesntunshrink', title:'Let\'s Hope it Doesn\'t Un-Shrink', req:'Claim the King Slime\'s Top Hat cosmetic override from Eva after \'Once Upon a Slime\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'libraryofnex', title:'Library of Nex', req:'Find and read the books from the Nex, Angel of Death encounter.', tip:'', time:'1-2 hrs', tags:['Lore', 'Books']},
  {id:'loadofbakulla', title:'Load of Bakulla', req:'Hear the Epic of Bukalla in the Rellekka longhall.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'lootingthedemonthrone', title:'Looting the Demon Throne', req:'Claim the gems from the demon throne during or after \'The Golem\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'lovinglycrafted', title:'Lovingly Crafted', req:'Discover and read all five Horror journals.', tip:'', time:'~30 min', tags:['Lore', 'Books']},
  {id:'lurgonsrun', title:'Lurgon\'s Run', req:'Unlock the Dorgesh-Kaan food trading minigame.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'madnessandmalediction', title:'Madness and Malediction', req:'Find and read \'Archaeology Journal - H.F.A\', found in the Zamorakian Undercity.', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'magearena', title:'Mage Arena', req:'Defeat Kolodion at the Mage Arena and collect a god staff.', tip:'', time:'~30 min', tags:['Lore', 'Miniquests']},
  {id:'makethembleed', title:'Make Them Bleed', req:'Perform well enough in Rush of Blood to impress Morvran.', tip:'', time:'~1 hr', tags:['Exploration', 'Prifddinas']},
  {id:'manyshadesofacure', title:'Many Shades of a Cure', req:'Permanently cure Razmire and Ulsquire after \'Shades of Mort\'ton\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'marmarosandthokletters', title:'Marmaros and Thok Letters', req:'Find all Marmaros and Thok letters from Daemonheim.', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'maskofdragithnurn', title:'Mask of Dragith Nurn', req:'Assemble the five parts of the Mask of Dragith Nurn from the Lumbridge Catacombs.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'masterbogreman', title:'Master Bogreman', req:'Unlock the ogre bowman hat by killing 30 chompy birds. (X/30)', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest', 'Combat (Post-Quest)']},
  {id:'mayauseyourfishfarm', title:'Maya Use Your Fish Farm?', req:'Learn how to use the Wendlewick fish farm.', tip:'', time:'~15 min', tags:['Exploration', 'Havenhythe', 'Wendlewick']},
  {id:'measureofold', title:'Measure of Old', req:'Use the Measure to find the four Elder God chronicles.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'meetingyouridols', title:'Meeting your Idols', req:'Investigate an overgrown Karamjan idol to discover an ancient tale.', tip:'', time:'~15 min', tags:['Lore', 'Books']},
  {id:'memoirsofthedevourer', title:'Memoirs of the Devourer', req:'Read the Memoirs of the Devourer from Amascut, the Devourer.', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'memoriesofguthix', title:'Memories of Guthix', req:'Attune and hand all engrams in to the Memorial to Guthix.', tip:'', time:'~1 hr', tags:['Skills', 'Divination']},
  {id:'messagefromtheabyss', title:'Message from the Abyss', req:'Find and read \'Scions of Erebus\', dropped by an Abyssal lord.', tip:'', time:'1-2 hrs', tags:['Lore', 'Books']},
  {id:'methetyet', title:'Met Het Yet?', req:'Gain access to the secret treasure room from \'Our Man in the North\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'milkofchocolatesnapeofgrass', title:'Milk of Chocolate, Snape of Grass', req:'Sober up Skippy.', tip:'', time:'~15 min', tags:['Lore', 'Miniquests']},
  {id:'milkyteeth', title:'Milky Teeth', req:'Give the Tooth Fairy five teeth and claim a tooth creature pet.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'miniaturemonolithmaestro', title:'Miniature Monolith Maestro', req:'Create the cosmic accumulator by combining the cosmic focus and the cosmic pyramid after \'Desperate Measures\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'miscellaneousnotes', title:'Miscellaneous Notes', req:'Find Misc. Dungeoneering journals 1 through 15.', tip:'', time:'~45 min', tags:['Lore', 'Books']},
  {id:'mixinginancientcircles', title:'Mixing in Ancient Circles', req:'Restore the fairy ring in the Ancient Cavern.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'myadzeisbiggerthanyours', title:'My Adze is Bigger Than Yours', req:'Speak to King Roald with the inferno adze equipped.', tip:'', time:'1-2 hrs', tags:['Lore', 'Post-Quest']},
  {id:'myprecious', title:'My Precious!', req:'Find and return Gregg \'Groggy\' Herring\'s lost ring.', tip:'', time:'~30 min', tags:['Skills', 'Fishing']},
  {id:'myrequeinmemoriam', title:'Myreque in Memoriam', req:'Complete construction of the Myreque memorial and help Veliaf to move on.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'mysteriesdaemonheim', title:'Mysteries - Daemonheim', req:'Complete all the Daemonheim mysteries.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Dragonkin']},
  {id:'mysterieseverlight', title:'Mysteries - Everlight', req:'Complete all the Everlight mysteries.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Saradominist']},
  {id:'mysteriesguild', title:'Mysteries - Guild', req:'Complete all the Guild mysteries.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology']},
  {id:'mysteriesinfernalsource', title:'Mysteries - Infernal Source', req:'Complete all the Infernal Source mysteries.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Zamorakian']},
  {id:'mysterieskharidet', title:'Mysteries - Kharid-et', req:'Complete all the Kharid-et mysteries.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Zarosian']},
  {id:'mysteriesmoonrise', title:'Mysteries - Moonrise', req:'Complete all the Moonrise mysteries. (X/5)', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Guthixian']},
  {id:'mysteriesorthen', title:'Mysteries - Orthen', req:'Complete all the Orthen mysteries.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Dragonkin']},
  {id:'mysteriessenntisten', title:'Mysteries - Senntisten', req:'Complete all the Senntisten mysteries.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Zarosian']},
  {id:'mysteriesstormguardcitadel', title:'Mysteries - Stormguard Citadel', req:'Complete all the Stormguard mysteries. (X/6)', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Armadylean']},
  {id:'mysterieswarforge', title:'Mysteries - Warforge', req:'Complete all the Warforge mysteries.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Bandosian']},
  {id:'mysteriesofthetokhaar', title:'Mysteries of the TokHaar', req:'Fully interact with the mysterious statues after \'One of a Kind\'.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'nanotokipplecomeinkipple', title:'Nano to Kipple, Come in Kipple', req:'Claim the Kipple Nano pet.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'naturallymuspah', title:'Naturally Muspah', req:'Claim the reward lamp from the natural historian after \'The Tale of the Muspah\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'newvarrocksettaskseasy', title:'New Varrock Set Tasks - Easy', req:'Given by Tiny Zemouregal in New Varrock square for completing all Easy Tasks in New Varrock.', tip:'', time:'~15 min', tags:['Exploration', 'New Varrock']},
  {id:'newvarrocksettaskselite', title:'New Varrock Set Tasks - Elite', req:'Given by Tiny Zemouregal in New Varrock square for completing all Elite Tasks in New Varrock.', tip:'', time:'1-2 hrs', tags:['Exploration', 'New Varrock']},
  {id:'newvarrocksettaskshard', title:'New Varrock Set Tasks - Hard', req:'Given by Tiny Zemouregal in New Varrock square for completing all Hard Tasks in New Varrock.', tip:'', time:'~45 min', tags:['Exploration', 'New Varrock']},
  {id:'newvarrocksettasksmedium', title:'New Varrock Set Tasks - Medium', req:'Given by Tiny Zemouregal in New Varrock square for completing all Medium Tasks in New Varrock.', tip:'', time:'~30 min', tags:['Exploration', 'New Varrock']},
  {id:'nosecretslefttosteal', title:'No Secrets Left to Steal', req:'Restore and claim from the statues of four famous icyene.', tip:'', time:'~30 min', tags:['Skills', 'Archaeology', 'Saradominist']},
  {id:'nowthatswhaticalladeadparrot', title:'Now That\'s What I Call a Dead Parrot', req:'Unlock the Ex-Ex-Parrot pet after \'Rocking Out\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'ocellusviriusnotus', title:'Ocellus Virius Notus', req:'Complete History of the Order of Ascension. (X/22)', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'ofkrakenink', title:'Of Kraken Ink', req:'Collect the following lore books from bosses inside the Shadow Reef.', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'onamissionfromthegods', title:'On a Mission from...the Gods', req:'Complete the \'God Emissaries\' miniquest.', tip:'', time:'~30 min', tags:['Lore', 'Miniquests']},
  {id:'onefinalride', title:'One Final Ride', req:'Find and read the Last Riders book, dropped by the King Black Dragon.', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'onemansjunkismine', title:'One Man\'s Junk...Is Mine', req:'Fully loot Movario\'s base.', tip:'', time:'~1 hr', tags:['Lore', 'Post-Quest']},
  {id:'ornatecrockery', title:'Ornate Crockery', req:'Create the big bowl for Tears of Guthix.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'ottotheancient', title:'Otto the Ancient', req:'Find all barbarian notes in the Ancient Cavern.', tip:'', time:'2-3 hrs', tags:['Lore', 'Books']},
  {id:'outintotheourania', title:'Out into the Ourania', req:'Unlock the spell: Ourania Teleport.', tip:'', time:'~45 min', tags:['Skills', 'Magic']},
  {id:'outofthepast', title:'Out of the Past', req:'Give Sharrigan her mentor\'s Pastkeeper Amulet.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'oystermash', title:'Oyster Mash', req:'Feed the giant oyster on Tutorial Island.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'paintitred', title:'Paint It Red', req:'Uncover the secrets of haemalchemy, after \'River of Blood\'.', tip:'', time:'~1 hr', tags:['Lore', 'Post-Quest']},
  {id:'paneintheglass', title:'Pane in the Glass', req:'Repair the stained glass windows in the Cathedral. (X/4)', tip:'', time:'1-2 hrs', tags:['Skills', 'Archaeology', 'Zarosian']},
  {id:'pennyforyourlife', title:'Penny For Your Life', req:'Unlock all rewards from \'Dimension of Disaster\'.', tip:'', time:'6-9 hrs', tags:['Lore', 'Post-Quest']},
  {id:'potionforalady', title:'Potion For a Lady', req:'Help Lady Meilyr to retrieve her lost potion recipes.', tip:'', time:'~45 min', tags:['Exploration', 'Prifddinas']},
  {id:'pottingissuchsweetsorrow', title:'Potting Is Such Sweet Sorrow', req:'Help Bill (near the mystical tree on the west coast of Anachronia) realise his \'pot\'ential.', tip:'', time:'~15 min', tags:['Activities', '\'Accidental\' Skilling Station']},
  {id:'powerofthreespirits', title:'Power of Three Spirits', req:'Unlock the ability to grow three spirit trees at once.', tip:'', time:'~30 min', tags:['Exploration', 'Prifddinas']},
  {id:'pullingonthethreads', title:'Pulling on the Threads', req:'Discover all of the chapters in \'The Needle Skips\' and then claim your reward from Megan.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'purenewbstalgia', title:'Pure Newbstalgia', req:'Use Lev\'s old music box after \'Beneath Cursed Tides\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'questcape', title:'Quest Cape', req:'Complete all quests to obtain the quest cape.', tip:'', time:'~10 min', tags:['Completionist']},
  {id:'quietbutdeadlylore', title:'Quiet But Deadly Lore', req:'Defeat the Queen Black Dragon and obtain all four dragonkin journals.', tip:'', time:'2-3 hrs', tags:['Lore', 'Books']},
  {id:'redskyallthetimeshepherdsconfused', title:'Red Sky All the Time, Shepherds Confused', req:'Use the Bloodstone to turn the skies red after \'River of Blood\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'redistributionofknowledge', title:'Redistribution of Knowledge', req:'Claim Thieving XP from Caelyn Kadaan after \'Heartstealer\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'relightmyfire', title:'Relight My Fire', req:'Re-kindle the Dragon Forge.', tip:'', time:'~1 hr', tags:['Lore', 'Post-Quest']},
  {id:'reliquaryofcithara', title:'Reliquary of Cithara', req:'Claim XP from the Holy Cithara.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'researchdaemonheim', title:'Research - Daemonheim', req:'Complete all of the listed research.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Dragonkin']},
  {id:'researcheverlight', title:'Research - Everlight', req:'Complete all of the listed research.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Saradominist']},
  {id:'researchguild', title:'Research - Guild', req:'Complete all of the listed research.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology']},
  {id:'researchinfernalsource', title:'Research - Infernal Source', req:'Complete all of the listed research.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Zamorakian']},
  {id:'researchkharidet', title:'Research - Kharid-et', req:'Complete all of the listed research.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Zarosian']},
  {id:'researchmoonrise', title:'Research - Moonrise', req:'Complete all of the listed research. (X/3)', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Guthixian']},
  {id:'researchorthen', title:'Research - Orthen', req:'Complete all of the listed research.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Dragonkin']},
  {id:'researchsenntisten', title:'Research - Senntisten', req:'Complete all of the listed research.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Zarosian']},
  {id:'researchstormguardcitadel', title:'Research - Stormguard Citadel', req:'Complete all of the listed research.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Armadylean']},
  {id:'researchwarforge', title:'Research - Warforge', req:'Complete all of the listed research.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Bandosian']},
  {id:'researchdirector', title:'Research Director', req:'Unlock all researchers. (X/14)', tip:'', time:'4-7 hrs', tags:['Skills', 'Archaeology']},
  {id:'respectthebalance', title:'Respect the Balance', req:'Pay respects and light the torches in Guthix\'s shrine.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'restinglichplace', title:'Resting Lich Place', req:'Locate Rasial\'s tomb after \'Tomes of the Warlock\'.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'roakekal', title:'Roake Kal', req:'Decipher all four murals in the sunken temple.', tip:'', time:'~30 min', tags:['Lore', 'Books']},
  {id:'roguedown', title:'Rogue Down', req:'Free the Wilderness portal rogue trader.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'rustyreward', title:'Rusty Reward', req:'Take the order to Braindeath and claim the Rusty Anchor\'s bartender\'s reward.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'saradoministexpert', title:'Saradominist Expert', req:'Restored a collection of Saradominist artefacts.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Saradominist']},
  {id:'scabigail', title:'Scabigail', req:'Complete the Scabaras research and present it to lead archaeologist Abigail.', tip:'', time:'~30 min', tags:['Lore', 'Books']},
  {id:'scorpvino', title:'Scorpvino', req:'Claim a jug of wine from the Observatory assistant after \'Observatory Quest\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'scribblinginthedepths', title:'Scribbling in the Depths', req:'Obtain the hidden rewards after the \'Song from the Depths\' quest.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'scribblingsofadragonkin', title:'Scribblings of a Dragonkin', req:'Find \'Vicendithas\' Scribblings\' located in the Edimmu Resource Dungeon.', tip:'', time:'1-2 hrs', tags:['Lore', 'Books']},
  {id:'seleneslessons', title:'Selene\'s Lessons', req:'Find all 9 pages of \'Selene\'s Lessons\' and return the finished book to Raz.', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'sentientletters', title:'Sentient Letters', req:'Collect all of the letters from the Senntisten dig.', tip:'', time:'~30 min', tags:['Lore', 'Books']},
  {id:'serenmemories', title:'Seren Memories', req:'Deposit Seren memoriam crystals (from the Approach of Freneskae), then search the Sanctum alcove.', tip:'', time:'~1 hr', tags:['Lore', 'Post-Quest']},
  {id:'shadowhangingoverme', title:'Shadow Hanging Over Me', req:'Claim all treasure from the chests during \'A Shadow over Ashdale\', or talk to Gudrik to claim them afterwards.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'shellshocked', title:'Shell-Shocked', req:'Speak to Edvard in the Abyss after \'Tortle Combat\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'singforthelady', title:'Sing for the Lady', req:'Help Lady Ithell with crystal singing research.', tip:'', time:'~30 min', tags:['Exploration', 'Prifddinas']},
  {id:'skeletalwishes', title:'Skeletal Wishes', req:'Help the Odd Old Man complete his creepy tasks.', tip:'', time:'~45 min', tags:['Lore', 'Miniquests']},
  {id:'sliskesnewgameplus', title:'Sliske\'s New Game Plus', req:'Replay \'Sliske\'s Endgame\' once to receive the \'Agent of the Eldest\' cosmetic outfit override.', tip:'', time:'1-2 hrs', tags:['Lore', 'Post-Quest']},
  {id:'softdragonwarmdragon', title:'Soft Dragon, Warm Dragon', req:'Read two bedtime stories to Vorkath.', tip:'', time:'~15 min', tags:['Lore', 'Books']},
  {id:'someolddustyjournals', title:'Some Old Dusty Journals', req:'Find the Ancient, Dusty and Weathered Tarddian journals.', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'squealforcoins', title:'Squeal for Coins', req:'Claim the coins from Yelps\' cash bag after fighting him.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'stalkernotes', title:'Stalker Notes', req:'Find all Stalker notes.', tip:'', time:'2-3 hrs', tags:['Lore', 'Books']},
  {id:'staysafe', title:'Stay Safe', req:'Fully complete the Stronghold of Player Safety.', tip:'', time:'~15 min', tags:['Activities', 'Minigames']},
  {id:'staysecure', title:'Stay Secure', req:'Fully complete the Stronghold of Security.', tip:'', time:'~15 min', tags:['Activities', 'Minigames']},
  {id:'stealingsedridorsstones', title:'Stealing Sedridor\'s Stones', req:'Fully loot Archmage Sedridor\'s chest.', tip:'', time:'~1 hr', tags:['Lore', 'Post-Quest']},
  {id:'stonecoldobservers', title:'Stone Cold Observers', req:'Observe all the large dragonkin statues around Anachronia. (X/5)', tip:'', time:'~15 min', tags:['Exploration', 'Anachronia']},
  {id:'summaryspirits', title:'Summary Spirits', req:'Claim the XP from all Wilderness spirit realm portals.', tip:'', time:'~1 hr', tags:['Lore', 'Post-Quest', 'Experience']},
  {id:'supplyanddemand', title:'Supply and Demand', req:'Complete five supply runs after \'Death Plateau\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'tactlessanalysis', title:'Tactless Analysis', req:'Collect all 22 pages of dragonkin research in the Dragonkin Laboratory. (X/22)', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'takeittosirtiffyinajiffy', title:'Take it to Sir Tiffy in a Jiffy', req:'Deliver the knight\'s notes from the God Wars Dungeon to Sir Tiffy Cashien.', tip:'', time:'~15 min', tags:['Lore', 'Books']},
  {id:'tastybobbles', title:'Tasty Bobbles', req:'Unlock the Tim and Crunchy pets during or after \'Gower Quest\'.', tip:'', time:'~45 min', tags:['Lore', 'Post-Quest']},
  {id:'thatllteachbill', title:'That\'ll Teach Bill', req:'Claim 10,000 coins from Bill Teach after \'Cabin Fever\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'thatsalotofbooks', title:'That\'s a Lot of Books', req:'Try to enter the Grand Library.', tip:'', time:'~10 min', tags:['Exploration', 'Menaphos']},
  {id:'thebookofelei', title:'The Book of Elei', req:'Collect all 22 pages of Elei\'s Diary in the Temple of Aminishi. (X/22)', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'theelderring', title:'The Elder Ring', req:'Fully upgrade the Shadow Pontifex ring.', tip:'', time:'~15 min', tags:['Exploration', 'Senntisten']},
  {id:'thefiremakerspet', title:'The Firemaker\'s Pet', req:'Claim a fire creature pet from Char\'s training cave after \'The Firemaker\'s Curse\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'thehistoryofslayer', title:'The History of Slayer', req:'Uncover all of the murals inside the Sunken Pyramid.', tip:'', time:'1-2 hrs', tags:['Lore', 'Books']},
  {id:'thejournaloffellarnessen', title:'The Journal of Fell Arnessen', req:'Obtain the Journal of Fell Arnessen from the Arch Glacor.', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'theluteoflove', title:'The Lute of Love', req:'Craft a lute for Dalia the lumberjack.', tip:'', time:'~30 min', tags:['Exploration', 'Havenhythe', 'Wendlewick']},
  {id:'themanyhandsthatwrite', title:'The Many Hands That Write', req:'Collect the following lore books from bosses inside the Temple of Aminishi.', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'thetaleofhawthorn', title:'The Tale of Hawthorn', req:'Find and read the tale of the founder of Amberfell.', tip:'', time:'~10 min', tags:['Lore', 'Books']},
  {id:'theworstwitchsgrimoire', title:'The Worst Witch\'s Grimoire', req:'Find and restore all 22 pages from the burnt grimoire in the Zamorakian Undercity. (X/22)', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'threesakiln', title:'Three\'s a Kiln', req:'Claim the enhanced fire cape override from TzHaar-Mej-Jeh, by completing the Fight Kiln once with each of the following combat styles: Melee, Ranged, and Magic.', tip:'', time:'~45 min', tags:['Activities', 'Minigames']},
  {id:'throughtheeyeoftheneedle', title:'Through the Eye of the Needle', req:'Witness Jas task Kerapac with retrieving her kin.', tip:'', time:'~15 min', tags:['Exploration', 'Senntisten']},
  {id:'todreamperchancetokeep', title:'To Dream, Perchance to Keep', req:'Help Pastkeeper Sharrigan to remember all stories within the \'Dream of Iaia\'.', tip:'Time-gated: story progress unlocks gradually across ~62.5 days, but the actual button-clicking totals about 9 hours — more real effort than most time-gated items, just spread out.', time:'~9 hrs', tags:['Lore', 'Post-Quest', 'Timegated']},
  {id:'tothawafrozenheart', title:'To Thaw a Frozen Heart', req:'Thaw all the frozen snow implings in Yeti Town after \'Violet is Blue\'. (X/4)', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'tomeraider', title:'Tome Raider', req:'Collect the following lore books from bosses inside the Sanctum of Rebirth.', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'traderwoes', title:'Trader Woes', req:'Help Nathan the banker set up a trade venture.', tip:'', time:'~30 min', tags:['Exploration', 'Havenhythe', 'Wendlewick']},
  {id:'trialsoftheheart', title:'Trials of the Heart', req:'Claim the Helmet of Trials.', tip:'', time:'~1 hr', tags:['Lore', 'Post-Quest']},
  {id:'tricksterstrinkets', title:'Trickster\'s Trinkets', req:'Discover all the trinkets and restore the old necklace after \'You Are It\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'tripletrouble', title:'Triple Trouble', req:'Unlock the post-quest rewards of Tamayu, Tinsay and Tiadeche.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'troublesomecrystals', title:'Troublesome Crystals', req:'Find all of the memoriam crystals in Prifddinas.', tip:'', time:'~30 min', tags:['Exploration', 'Prifddinas']},
  {id:'tworitesdontmakeawrong', title:'Two Rites Don\'t Make a Wrong', req:'Free Klenter\'s soul during or after \'Icthlarin\'s Little Helper\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'ultimatecodex', title:'Ultimate Codex', req:'Claim and read the Codex Ultimatus.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'umbraldiplomacy', title:'Umbral Diplomacy', req:'Collect all 22 pages of Umbral Diplomacy in the Shadow Reef. (X/22)', tip:'', time:'~1 hr', tags:['Lore', 'Books']},
  {id:'uncorruptedore', title:'Uncorrupted Ore', req:'Aid Lady Trahaearn in removing some corruption by smelting 100 corrupted ore.', tip:'', time:'~30 min', tags:['Exploration', 'Prifddinas']},
  {id:'undercrocandkey', title:'Under Croc and Key', req:'Gain access to the secret treasure room from \'Crocodile Tears\'.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'unholycrafting', title:'Unholy Crafting', req:'Unlock the ability to craft unholy symbols.', tip:'', time:'~15 min', tags:['Lore', 'Post-Quest']},
  {id:'uzermaster', title:'Uzer Master', req:'Clear the shortcut path in the Uzer Mastaba.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'whatsmineisalsodorics', title:'What\'s Mine is Also Doric\'s', req:'Complete all of the Doric and Boric tasks.', tip:'', time:'~30 min', tags:['Lore', 'Miniquests']},
  {id:'whiteknightrises', title:'White Knight Rises', req:'Achieve the Master White Knight rank.', tip:'', time:'~1 hr', tags:['Lore', 'Post-Quest', 'Combat (Post-Quest)']},
  {id:'workforidolhands', title:'Work For Idol Hands', req:'Give the 6 demon statuettes from Lumbridge Catacombs to Xenia/Ilona at the entrance.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'youmistagthisbrooch', title:'You Mistag This Brooch', req:'Return Mistag\'s brooch and claim a mining helmet after \'The Lost Tribe\'.', tip:'', time:'~30 min', tags:['Lore', 'Post-Quest']},
  {id:'yourenotmyrealmah', title:'You\'re Not My Real Mah', req:'Gather elder chronicle fragments in the Elder Halls of Freneskae.', tip:'', time:'1-2 hrs', tags:['Lore', 'Post-Quest']},
  {id:'zamorakianexpert', title:'Zamorakian Expert', req:'Restored a collection of Zamorakian artefacts.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Zamorakian']},
  {id:'zarosianexpert', title:'Zarosian Expert', req:'Restored a collection of Zarosian artefacts.', tip:'', time:'~10 min', tags:['Skills', 'Archaeology', 'Zarosian']},
  {id:'zarosianmemories', title:'Zarosian Memories', req:'Deposit Zarosian memoriam crystals, then search the Sanctum alcove.', tip:'', time:'~1 hr', tags:['Lore', 'Post-Quest']},
];

export const TIPS_MQC = [
  {b:'Law Hound pet', t:'boosts drop rates on several journal/book requirements by roughly 25% — summon it for Hangs Off My Ring, Don\'t Fear the Ripper, One Final Ride, Message from the Abyss, Dragon King Diary, and To Dream Perchance to Keep.'},
  {b:'Advanced Time spell', t:'(93 magic, boostable, 3 casts/week) can auto-complete active Player-Owned Port voyages, speed archaeology research, and generate Anachronia base camp resources faster — use it on Eastern Adventurer, archaeology mysteries, and Following in the Footsteps.'},
  {b:'Start Eastern Adventurer and Following in the Footsteps early', t:'both are wall-clock time-gated (12–18 months and 1–2 months respectively) regardless of play time, so they should run in the background from day one.'},
  {b:'Restore every artifact as you level archaeology', t:'the first time through, so you don\'t have to backfill the six Expert artifact-collection achievements later.'},
  {b:'Iron accounts', t:'should expect notably longer times on anything involving caskets, clue drops, or GE-purchasable items (All Rise, It\'s Like God Book Illuminations in Here).'},
];

/* =========================================================================
   MAX CAPE — all 29 skills to level 99. This is literally the requirement;
   the skill grid IS the checklist. Buying the cape is a formality once
   you're there, not itself a requirement, so there's nothing else to track.
   ========================================================================= */
// Order follows the in-game Skills tab grid (see SKILLS_MQC above for why).
export const SKILLS_MAX = [
  ['attack','Attack'],['constitution','Constitution'],['mining','Mining'],
  ['strength','Strength'],['agility','Agility'],['smithing','Smithing'],
  ['defence','Defence'],['herblore','Herblore'],['fishing','Fishing'],
  ['ranged','Ranged'],['thieving','Thieving'],['cooking','Cooking'],
  ['prayer','Prayer'],['crafting','Crafting'],['firemaking','Firemaking'],
  ['magic','Magic'],['fletching','Fletching'],['woodcutting','Woodcutting'],
  ['runecrafting','Runecrafting'],['slayer','Slayer'],['farming','Farming'],
  ['construction','Construction'],['hunter','Hunter'],['summoning','Summoning'],
  ['dungeoneering','Dungeoneering'],['divination','Divination'],['invention','Invention'],
  ['archaeology','Archaeology'],['necromancy','Necromancy'],
].map(([id,name])=>({id, name, req:99, tag:'99', note:''}));

export const ACHIEVEMENTS_MAX = [];

export const TIPS_MAX = [
  {b:'Max is a roaming NPC', t:'in eastern Varrock — he cycles between a bank, anvil, fire and spinning wheel. Elen Anterth in the Max Guild (Prifddinas) is a fixed, easier alternative once unlocked.'},
  {b:'Temporary boosts don\'t count', t:'every skill needs a genuine, unboosted level 99 — there\'s no way to buy the cape with a boosted stat.'},
  {b:'Dungeoneering exceeds 99 naturally', t:'if you\'re working toward Master Max Cape too, levelling Dungeoneering past 99 on the way there is completely normal and doesn\'t block the standard Max Cape.'},
  {b:'Buying isn\'t a separate requirement', t:'once every skill above reads 99, purchase from Max or Elen Anterth for 2,871,000 coins — it\'s just claiming the reward, not something to grind toward.'},
];

/* =========================================================================
   MASTER MAX CAPE — level (or virtual level) 120 in all 29 skills, then a
   one-off questline: Knight's Sword → Blurite Keystone → Ornate Grave.
   Buying the cape from Minerva afterwards is a formality, not a
   requirement, so it isn't tracked as its own step.
   ========================================================================= */
// Order follows the in-game Skills tab grid (see SKILLS_MQC above for why).
export const SKILLS_MASTERMAX = [
  // Real cap per https://runescape.wiki/w/Skills: 9 skills cap at 99, 8 cap at
  // 110, 12 cap at 120. Only those 12 need a genuine level 120 here — the
  // other 17 reach 120 only as a virtual level (their real level tops out
  // at 99 or 110, but enough XP still counts toward the cape).
  ['attack','Attack',true],['constitution','Constitution',false],['mining','Mining',false],
  ['strength','Strength',true],['agility','Agility',false],['smithing','Smithing',false],
  ['defence','Defence',false],['herblore','Herblore',true],['fishing','Fishing',false],
  ['ranged','Ranged',true],['thieving','Thieving',true],['cooking','Cooking',false],
  ['prayer','Prayer',false],['crafting','Crafting',false],['firemaking','Firemaking',false],
  ['magic','Magic',true],['fletching','Fletching',false],['woodcutting','Woodcutting',false],
  ['runecrafting','Runecrafting',false],['slayer','Slayer',true],['farming','Farming',true],
  ['construction','Construction',false],['hunter','Hunter',false],['summoning','Summoning',false],
  ['dungeoneering','Dungeoneering',true],['divination','Divination',false],
  ['invention','Invention',true],['archaeology','Archaeology',true],
  ['necromancy','Necromancy',true],
].map(([id,name,isRealCap])=>({id, name, req:120, tag: isRealCap ? '120' : 'Virtual 120', note:''}));

export const ACHIEVEMENTS_MASTERMAX = [
  {id:'knightssword', title:"Complete The Knight's Sword", req:'Quest reward includes a blurite bar, needed later for the keystone.', tip:'Quick, low-requirement quest if you haven\'t done it already.', time:'~30 min', tags:[], linkedQuest:"The Knight's Sword"},
  {id:'bluritekeystone', title:'Craft a Blurite Keystone', req:'Combine a blurite bar with a ruby, emerald and sapphire at a furnace.', tip:'The gems are cheap on the Grand Exchange — no skill requirement to combine them.', time:'~15 min', tags:[]},
  {id:'ornategrave', title:'Insert the keystone into the Ornate Grave', req:'Falador Park — this unlocks the ability to buy the cape from Minerva.', tip:'The interaction can occasionally fail visually; try again if Minerva doesn\'t appear.', time:'~5 min', tags:[]},
];

export const TIPS_MASTERMAX = [
  {b:'12 skills are real 120 caps', t:'Attack, Strength, Ranged, Magic, Dungeoneering, Herblore, Thieving, Slayer, Farming, Invention, Archaeology and Necromancy actually reach level 120 — shown as "120" above. The other 17 skills cap at 99 or 110 but count toward 120 as a virtual level once you have enough XP — shown as "Virtual 120".'},
  {b:'You\'ll unlock this alongside Max Cape', t:'since real level 120 in a skill always passes through real level 99, most players end up eligible for both around the same time.'},
  {b:'Buying isn\'t a separate requirement', t:'once the keystone is used at the Ornate Grave, purchase from Minerva in Falador for 3,480,000 coins — it\'s just claiming the reward.'},
];

/* =========================================================================
   COMPLETIONIST CAPE — Max-level skills at elevated, per-skill thresholds,
   plus roughly 100 achievement-style requirements (quest points, music,
   prayers, spells, area tasks, and more). Only the major known categories
   are listed below — use "Your own additions" or the in-game Achievements
   tab (Completionist category) for the full breakdown.
   ========================================================================= */
// Order follows the in-game Skills tab grid (see SKILLS_MQC above for why).
export const SKILLS_COMP = [
  ['attack','Attack',120],['constitution','Constitution',99],['mining','Mining',110],
  ['strength','Strength',120],['agility','Agility',99],['smithing','Smithing',110],
  ['defence','Defence',99],['herblore','Herblore',120],['fishing','Fishing',99],
  ['ranged','Ranged',120],['thieving','Thieving',120],['cooking','Cooking',99],
  ['prayer','Prayer',99],['crafting','Crafting',110],['firemaking','Firemaking',110],
  ['magic','Magic',120],['fletching','Fletching',110],['woodcutting','Woodcutting',110],
  ['runecrafting','Runecrafting',110],['slayer','Slayer',120],['farming','Farming',120],
  ['construction','Construction',99],['hunter','Hunter',99],['summoning','Summoning',99],
  ['dungeoneering','Dungeoneering',120],['divination','Divination',99],['invention','Invention',120],
  ['archaeology','Archaeology',120],['necromancy','Necromancy',120],
].map(([id,name,req])=>({id, name, req, tag: req===99?'99':(req===110?'110':'120'), note:''}));

// Full 102-item list, pulled directly from the wiki's Completionist Cape
// (achievement) page. `time` is a rough bucketed estimate inferred from
// each achievement's scope (X/N counters, purchase-only vs. multi-step) —
// unlike MQC's video-sourced numbers, these aren't independently measured,
// so treat them as a sorting aid rather than a precise forecast.
export const ACHIEVEMENTS_COMP = [
  {id:'afortofmyown', title:'A Fort Of My Own', req:'Upgrade all buildings in Fort Forinthry to Tier 3.', tip:'', time:'6–15 hrs', tags:['Exploration']},
  {id:'aplaceformyheads', title:'A Place For My Heads', req:"Mount all three of the Raptor's slayer trophies.", tip:'', time:'~1 hr', tags:['Skills']},
  {id:'areptilesdysfunction', title:"A Reptile's Dysfunction", req:"Upgrade Zorgoth's ring by completing rituals at the Ungael ritual site.", tip:'', time:'2–5 hrs', tags:['Skills']},
  {id:'absoluteplanker', title:'Absolute Planker', req:'Upgrade your plank box to hold 100 of each plank.', tip:'', time:'2–5 hrs', tags:['Skills']},
  {id:'abyssalshortcut', title:'Abyssal Shortcut', req:'Unlock the asylum gate and complete the shortcut to the abyssal portal.', tip:'', time:'~1 hr', tags:['Skills']},
  {id:'perkyasaprawn', title:'Almost as Perky as a Prawn', req:'Unlock all the Prawn Perks from your Aquarium. (X/6)', tip:'', time:'2–5 hrs', tags:['Skills']},
  {id:'essentialaccessory', title:'An Essential Accessory', req:"Create an expansive essence pouch, starting with a hungry hood from Wizard Rinsit's Runecrafting Shop.", tip:'', time:'~1 hr', tags:['Skills']},
  {id:'tortleportals', title:'Ancient Eastern Tortle Portals', req:'Activate all tortle portals on The Islands That Once Were Turtles. (X/3)', tip:'', time:'~1 hr', tags:['Exploration']},
  {id:'annihilator', title:'Annihilator', req:"Earn 'the Annihilator' title by fighting all four nihil at once.", tip:'', time:'2–5 hrs', tags:['Lore','Combat']},
  {id:'bagofherbs', title:'Bag of Herbs', req:'Purchase the herb bag and the herb bag upgrade from the Herby Werby reward shop.', tip:'Time-gated, not a sit-down grind: unlocks trickle in over 4 weeks (2 weeks if you use D&D reset tokens), but only need ~15 min of actual clicking per week.', time:'4 weeks total (~15 min/wk)', tags:['Exploration','Timegated']},
  {id:'balancedcombattriangle', title:'Balanced Combat Triangle', req:'Solve a lockbox puzzle.', tip:'', time:'~1 hr', tags:['Activities']},
  {id:'bandosmemories', title:"Bandos's Memories", req:"Recover all 14 of Bandos's memories on Yu'biusk.", tip:'', time:'2–5 hrs', tags:['Lore']},
  {id:'banetuner', title:'Bane Tuner', req:'Unlock the spell: Tune Banite Ore.', tip:'', time:'~1 hr', tags:['Skills']},
  {id:'beantheredonethat', title:'Bean There, Done That', req:"Purchase the listed upgrades from the farmers' market reward shop.", tip:'Time-gated, not a sit-down grind: Manor Farm reward-shop upgrades unlock over 4 days, only ~5 min/day of actual effort.', time:'4 days total (~5 min/day)', tags:['Skills','Timegated']},
  {id:'beantheredonethatpostcard', title:'Bean There, Done That, Got the Postcard', req:"Purchase the listed upgrades from the Anachronia farmers' market reward shop.", tip:'Time-gated, not a sit-down grind: Anachronia Dinosaur Farm reward-shop upgrades unlock over 4 days, only ~5 min/day of actual effort.', time:'4 days total (~5 min/day)', tags:['Skills','Timegated']},
  {id:'bigchinchompa', title:'Big Chinchompa', req:'Score 1,111 in a session of the Big Chinchompa minigame.', tip:'', time:'2–5 hrs', tags:['Activities']},
  {id:'billandbenegg', title:"Bill & Ben's Egg/Salon Joint Venture", req:"After the Extinction quest, 'eggs'plore Prehistoric Potterington's sunny-side-up hustle.", tip:'', time:'2–5 hrs', tags:['Activities']},
  {id:'bipedalmask', title:'Bipedal Mask', req:'Construct a Tuska mask (parts drop from airut on Slayer task).', tip:'RNG drop-based — no guaranteed timeframe.', time:'2–5 hrs', tags:['Skills']},
  {id:'bridgeoverfremmy', title:'Bridge over Fremmy Waters', req:'Complete all the unabridged Fremennik Sagas.', tip:'', time:'6–15 hrs', tags:['Lore']},
  {id:'clausisrising', title:'Claus is Rising', req:'Claim a reward from Claus after doing him a favour.', tip:'', time:'~1 hr', tags:['Lore']},
  {id:'craftingtoyourownrune', title:'Crafting to Your Own Rune', req:'Unlock masterwork 2h staves by making and upgrading a full set of eternal magic weaponry to +5. (X/9)', tip:'', time:'6–15 hrs', tags:['Skills']},
  {id:'davinciwho', title:'Da Vinci Who?', req:'Acquire knowledge from the listed ancient blueprints.', tip:'', time:'2–5 hrs', tags:['Skills']},
  {id:'compdatarecovery', title:'Data Recovery', req:'Help the Archivist recover all core memory data in the Hall of Memories.', tip:'Same requirement as the MQC achievement of the same name — only needs doing once.', time:'2–5 hrs', tags:['Skills']},
  {id:'deadliercatch', title:'Deadlier Catch', req:'Hunt the Thalassus until it flees for good. (X/11)', tip:'', time:'2–5 hrs', tags:['Lore']},
  {id:'diariesoftheclans', title:'Diaries of the Clans', req:'Find the clan journal pages from the Hefin Agility Course in Prifddinas.', tip:'', time:'~1 hr', tags:['Lore']},
  {id:'dinosaurhunter', title:'Dinosaur Hunter', req:'Take down each dinosaur in Big Game Hunter. (X/9)', tip:'', time:'2–5 hrs', tags:['Exploration']},
  {id:'draconicdecoctions', title:'Draconic Decoctions', req:'Discover all of the listed potion recipes.', tip:'', time:'6–15 hrs', tags:['Skills']},
  {id:'elventitles', title:'Elven Titles', req:'Obtain the titles of the elven clans.', tip:'', time:'2–5 hrs', tags:['Exploration']},
  {id:'everythingoresome', title:'Everything Is Oresome', req:'Increase the capacity of your ore box by mining 100 of each of the listed ores.', tip:'', time:'2–5 hrs', tags:['Skills']},
  {id:'everythingstilloresome', title:'Everything Is Still Oresome', req:'Increase ore box capacity further by mining 100 of each of the listed ores. (X/10)', tip:'', time:'6–15 hrs', tags:['Skills']},
  {id:'everythingstilltreemendous', title:'Everything Is Still Treemendous', req:'Increase wood box capacity by cutting eternal magic logs. (X/100)', tip:'', time:'6–15 hrs', tags:['Skills']},
  {id:'everythingtreemendous', title:'Everything Is Treemendous', req:'Increase the capacity of your wood box by cutting 100 of each of the listed logs. (X/10)', tip:'', time:'2–5 hrs', tags:['Skills']},
  {id:'compfamilyspirittree', title:'Family Spirit Tree', req:'Reconnect the Prifddinas spirit tree with her brethren.', tip:'Same requirement as the MQC achievement of the same name.', time:'~1 hr', tags:['Exploration']},
  {id:'famous', title:'Famous', req:"Earn the title 'The Famous' by completing Morvran's Slayer challenge.", tip:'', time:'2–5 hrs', tags:['Skills']},
  {id:'fletchquest', title:'Fletch Quest', req:'Unlock masterwork bows by making and upgrading a full set of primal/eternal magic ranged weaponry to Mk. 5. (X/10)', tip:'', time:'6–15 hrs', tags:['Skills']},
  {id:'fromardougnewithlove', title:'From Ardougne with Love', req:'Fully upgrade the penguin spy device by tracking penguin spies around the world.', tip:'Time-gated, not a sit-down grind: the penguin-spy upgrade trickles in over 4 weeks (2 weeks with D&D reset tokens), only ~15 min of actual tracking per week.', time:'4 weeks total (~15 min/wk)', tags:['Activities','Timegated']},
  {id:'gapstrapslaps', title:'Gaps, Traps and Laps', req:'Complete each of the listed agility courses at least once.', tip:'', time:'2–5 hrs', tags:['Skills']},
  {id:'grossmisconduct', title:'Gross Misconduct', req:"Kill 144 of Zamorak's demons in the Wilderness. (X/144)", tip:'Wilderness content — factor in PK risk.', time:'6–15 hrs', tags:['Lore','Combat']},
  {id:'healquickly', title:'Heal, Quickly', req:"Unlock the prayer 'Rapid Renewal' by purchasing the scroll of renewal from the Dungeoneering reward shop.", tip:'', time:'~1 hr', tags:['Skills']},
  {id:'heretoslay', title:'Here to Slay', req:'Equip a Corrupted Slayer Helmet, upgraded with an ensouled spectral lens.', tip:'', time:'2–5 hrs', tags:['Skills']},
  {id:'foreverwashingshadows', title:"I'm Forever Washing Shadows", req:'Aid Lord Amlodd in cleansing shadow cores.', tip:'', time:'2–5 hrs', tags:['Exploration']},
  {id:'littlelistminiquests', title:"I've Got a Little List (of Miniquests)", req:'Complete every miniquest listed in the Quests interface (sagas not included).', tip:'', time:'6–15 hrs', tags:['Lore']},
  {id:'impingaround', title:'Imping Around', req:'Collect one of each impling for Daffyd in Prifddinas.', tip:'', time:'2–5 hrs', tags:['Exploration']},
  {id:'inritualswetrust', title:'In Rituals We Trust', req:'Perform every core Necromancy ritual.', tip:'', time:'2–5 hrs', tags:['Skills']},
  {id:'inventionbluesgives', title:'Invention Gives Me the Blues', req:'Purchase all of the blueprints for the Invention Technology devices.', tip:'Time-gated, not a sit-down grind: blueprints unlock one at a time over 11 days, only ~5 min/day of actual effort.', time:'11 days total (~5 min/day)', tags:['Skills','Timegated']},
  {id:'calledaetherium1', title:'It Should Have Been Called Aetherium', req:'Unlock the ability to smith masterwork armour by making and upgrading a full set of elder rune armour to +5.', tip:'', time:'6–15 hrs', tags:['Skills']},
  {id:'calledancestral', title:'It Should Have Been Called Ancestral', req:'Unlock the ability to craft masterwork magic armour by making and upgrading a full set of starbloom armour to +5. (X/5)', tip:'', time:'6–15 hrs', tags:['Skills']},
  {id:'calledchinskin', title:'It Should Have Been Called Chinskin', req:'Unlock the ability to craft masterwork ranged armour by making and upgrading a full set of apex hide armour to +5.', tip:'', time:'6–15 hrs', tags:['Skills']},
  {id:'calledaetherium2', title:'It Still Should Have Been Called Aetherium', req:'Unlock the ability to smith masterwork swords by making and upgrading a full set of primal armour to +5.', tip:'', time:'6–15 hrs', tags:['Skills']},
  {id:'kilnfighter', title:'Kiln Fighter', req:'Complete the Fight Kiln.', tip:'', time:'2–5 hrs', tags:['Activities','Combat']},
  {id:'kudostoyou', title:'Kudos to You', req:'Reach full Kudos with the Varrock Museum. (X/198)', tip:'One of the longer collection grinds on this list.', time:'15+ hrs', tags:['Lore']},
  {id:'longlivethequeen', title:'Long Live the Queen', req:'Defeat the Queen Black Dragon and obtain the first dragonkin journal.', tip:'', time:'2–5 hrs', tags:['Lore']},
  {id:'lunarmaster', title:'Lunar Master', req:'Unlock all lunar spells. (X/11)', tip:'', time:'2–5 hrs', tags:['Skills']},
  {id:'makethembleed', title:'Make Them Bleed', req:'Perform well enough in Rush of Blood to impress Morvran.', tip:'', time:'2–5 hrs', tags:['Exploration']},
  {id:'masterskiller', title:'Master Skiller', req:'Increase all skills to mastery level.', tip:'Overlaps heavily with Master Max Cape — worth pursuing both together.', time:'15+ hrs', tags:['Skills']},
  {id:'maximumpoolpulation', title:'Maximum Poolpulation', req:'Reach the maximum number of fish in each pool at the Wendlewick fish farm with all four pools active.', tip:'', time:'6–15 hrs', tags:['Skills']},
  {id:'memoriesofguthix', title:'Memories of Guthix', req:'Attune and hand in all engrams to the Memorial to Guthix.', tip:'', time:'2–5 hrs', tags:['Skills']},
  {id:'minorwisdom', title:'Minor Wisdom', req:'Earn the Wisdom of Anima fletching perk for one of the Elder God arrow types.', tip:'', time:'~1 hr', tags:['Exploration']},
  {id:'compmusicmaestro', title:'Music Maestro', req:'Unlock all music tracks.', tip:'The Music Player interface shows exactly which tracks are still locked and roughly where to find them.', time:'6–15 hrs', tags:['Activities']},
  {id:'mylastresort', title:'My Last Resort', req:"Unlock the listed amenities in War's Retreat.", tip:'', time:'~1 hr', tags:['Combat']},
  {id:'myrequeinmemoriam', title:'Myreque in Memoriam', req:'Complete construction of the Myreque memorial and help Veliaf move on.', tip:'', time:'~1 hr', tags:['Lore']},
  {id:'mysticalmoonstone', title:'Mystical Moonstone', req:'Learn how to craft moonstone jewellery.', tip:'', time:'~1 hr', tags:['Exploration']},
  {id:'noneedtopikkenchoose', title:'No Need to Pikkenchoose', req:"Unlock everything from Pikkenflix's Shrine of the Spirit Wolf shop, south of Wendlewick.", tip:'', time:'2–5 hrs', tags:['Exploration']},
  {id:'outintotheourania', title:'Out into the Ourania', req:'Unlock the spell: Ourania Teleport.', tip:'', time:'~1 hr', tags:['Skills']},
  {id:'peachybones', title:'Peachy Bones', req:'Unlock the spell: Bones to Peaches.', tip:'', time:'~1 hr', tags:['Skills']},
  {id:'piousprayers', title:'Pious Prayers', req:'Complete the 8 Knight Waves in Camelot to unlock Chivalry, Piety, Rigour and Augury.', tip:'', time:'2–5 hrs', tags:['Skills']},
  {id:'portlife', title:'Port Life', req:'Complete the Player-Owned Port tutorial.', tip:'', time:'~1 hr', tags:['Activities']},
  {id:'potionforalady', title:'Potion For a Lady', req:'Help Lady Meilyr retrieve her lost potion recipes.', tip:'', time:'~1 hr', tags:['Exploration']},
  {id:'potionmixermaster1', title:'Potion Mixer Master I', req:'Unlock the listed combination potion recipes from Clan Meilyr in Prifddinas.', tip:'', time:'2–5 hrs', tags:['Exploration']},
  {id:'potionmixermaster2', title:'Potion Mixer Master II', req:'Unlock the listed advanced combination potion recipes from Clan Meilyr in Prifddinas.', tip:'', time:'2–5 hrs', tags:['Exploration']},
  {id:'powerplanter1', title:'Power Planter I', req:"Unlock Plant Power (Tier 1) from Sydekix's Reward Store at the Garden of Kharid.", tip:'Time-gated, not a sit-down grind: the 250 favour needed trickles in from daily herb patches, only ~15 min/day of actual effort — usually clears within the first day or two.', time:'~1-2 days (~15 min/day)', tags:['Skills','Timegated']},
  {id:'powerplanter2', title:'Power Planter II', req:"Unlock Plant Power (Tier 4) from Sydekix's Reward Store at the Garden of Kharid.", tip:'Time-gated, not a sit-down grind: the 33,950 cumulative favour needed trickles in from daily herb patches, spreading this across roughly 45-60 days, only ~15 min/day of actual effort.', time:'~45-60 days total (~15 min/day)', tags:['Skills','Timegated']},
  {id:'qualificationguildmaster', title:'Qualification - Guildmaster', req:'Complete all of the listed archaeology achievements and attend the qualification ceremony.', tip:'The biggest single archaeology milestone on this list.', time:'6–15 hrs', tags:['Skills']},
  {id:'compquestcape', title:'Quest Cape', req:'Complete all quests to obtain the quest cape.', tip:'The game checks maximum quest points, same as Completionist Cape\'s own quest-point check.', time:'15+ hrs', tags:['Completionist']},
  {id:'rhianingold', title:'Rhian in Gold - The Original', req:'Fully build the statue of Rhiannon in the Tower of Voices at least once.', tip:'', time:'2–5 hrs', tags:['Exploration']},
  {id:'serenmemories', title:'Seren Memories', req:'Deposit Seren memoriam crystals (from the Approach of Freneskae), then search the Sanctum alcove.', tip:'', time:'~1 hr', tags:['Lore']},
  {id:'singforthelady', title:'Sing for the Lady', req:'Help Lady Ithell with crystal singing research.', tip:'', time:'~1 hr', tags:['Exploration']},
  {id:'slayermaster', title:'Slayer Master', req:"Earn the title 'Slayer Master' from Morvran's platinum Rush of Blood challenge.", tip:'', time:'6–15 hrs', tags:['Skills']},
  {id:'slidetotheleft', title:'Slide To The Left', req:'Solve a puzzle box.', tip:'', time:'~1 hr', tags:['Activities']},
  {id:'stacksonstacks', title:'Stacks on Stacks', req:'Place a totem on Anachronia.', tip:'', time:'~1 hr', tags:['Exploration']},
  {id:'staysafe', title:'Stay Safe', req:'Fully complete the Stronghold of Player Safety.', tip:'', time:'2–5 hrs', tags:['Activities']},
  {id:'staysecure', title:'Stay Secure', req:'Fully complete the Stronghold of Security.', tip:'', time:'2–5 hrs', tags:['Activities']},
  {id:'studentbecomesmaster', title:'Student Becomes the Master', req:"Learn all of Kili's equipment upgrade tasks.", tip:'', time:'2–5 hrs', tags:['Skills']},
  {id:'talentedinnecromancy', title:'Talented in Necromancy', req:'Unlock every Talent from the Well of Souls.', tip:'', time:'6–15 hrs', tags:['Skills']},
  {id:'taskmaster', title:'Task Master', req:'Complete all of the listed area achievement sets.', tip:'A large aggregate requirement covering many regional task lists.', time:'15+ hrs', tags:['AreaTasks']},
  {id:'crocodilehunter', title:'The Crocodile Hunter', req:"Unlock all non-cosmetic Hunter upgrades from Dundee's Shop.", tip:'', time:'2–5 hrs', tags:['Exploration']},
  {id:'greatestgiftofall', title:'The Greatest Gift of All', req:'Learn a lesson from Lea outside the Invention Guild.', tip:'', time:'~1 hr', tags:['Skills']},
  {id:'tiersoftreasure', title:'Tiers of Treasure', req:'Complete 1 clue of each tier.', tip:'', time:'2–5 hrs', tags:['Activities']},
  {id:'toptownhall', title:'Top Town Hall', req:'Fully upgrade the Town Hall in the base camp on Anachronia.', tip:'Time-gated, not a sit-down grind: Town Hall upgrades unlock over 9 days, only ~5 min/day of actual effort.', time:'9 days total (~5 min/day)', tags:['Exploration','Timegated']},
  {id:'toweringoverusall', title:'Towering Over Us All', req:'Solve a Towers puzzle.', tip:'', time:'~1 hr', tags:['Activities']},
  {id:'triptotheeast', title:'Trip to the East', req:'Complete one of the trio storylines from your Player-Owned Port. (X/4)', tip:'Time-gated, not a sit-down grind: the storyline plays out over ~90 days of voyages, only ~5 min/day of actual effort. Ties into the same Player-Owned Port grind as MQC\'s Eastern Adventurer.', time:'~90 days total (~5 min/day)', tags:['Activities','Timegated']},
  {id:'troublesomecrystals', title:'Troublesome Crystals', req:'Find all of the memoriam crystals in Prifddinas.', tip:'', time:'2–5 hrs', tags:['Exploration']},
  {id:'uncorruptedore', title:'Uncorrupted Ore', req:'Aid Lady Trahaearn in removing corruption by smelting 100 corrupted ore.', tip:'', time:'2–5 hrs', tags:['Exploration']},
  {id:'undeadtorites', title:'Undead to Rites', req:'Teleport to the Ungael ritual site using the Ungael Teleport incantation.', tip:'', time:'~1 hr', tags:['AreaTasks']},
  {id:'unlivingonaprayer', title:'Unliving on a Prayer', req:'Unlock all of the listed prayers from Selene.', tip:'', time:'2–5 hrs', tags:['Skills']},
  {id:'unlockingwaiko1', title:'Unlocking Waiko I', req:'Purchase unlocks from the Waiko reward shop.', tip:'', time:'2–5 hrs', tags:['Exploration']},
  {id:'untangled', title:'Untangled', req:'Solve a celtic knot.', tip:'', time:'~1 hr', tags:['Activities']},
  {id:'upgradingwaiko1', title:'Upgrading Waiko I', req:'Purchase the first tier of upgrades in the Waiko reward shop.', tip:'', time:'2–5 hrs', tags:['Exploration']},
  {id:'walkingthereef', title:'Walking the Reef', req:'Find all reefwalker\'s cape scroll pieces in Player-Owned Ports. (X/4)', tip:'', time:'2–5 hrs', tags:['Activities']},
  {id:'whatsminedoric', title:"What's Mine is Also Doric's", req:'Complete all of the Doric and Boric tasks.', tip:'', time:'2–5 hrs', tags:['Lore']},
  {id:'whodunnitidunnit', title:'Whodunnit? I Dunnit!', req:'Complete the Ungael combat activity on standard mode.', tip:'', time:'2–5 hrs', tags:['Activities','Combat']},
  {id:'yaktweesacharm', title:"Yaktwee's a Charm", req:'Unlock the enhanced Yaktwee stick by catching charm sprites. (X/1,000)', tip:'One of the longest pure-grind requirements on this list.', time:'15+ hrs', tags:['Skills']},
  {id:'zarosianmemories', title:'Zarosian Memories', req:'Deposit Zarosian memoriam crystals, then search the Sanctum alcove.', tip:'', time:'~1 hr', tags:['Lore']},
];

export const TIPS_COMP = [
  {b:'Check your real-time progress in-game', t:'via Hero interface → Achievements tab → Completionist category, or by touching the cape at the Museum. Both list every outstanding requirement live, which is more current than any static guide.'},
  {b:'Reaper Crew and Master Quest Cape are NOT required', t:'for the untrimmed Completionist Cape as of the June 2023 rework — they only gate the Trimmed version now.'},
  {b:'Time estimates here are rough buckets, not measured', t:'unlike MQC\'s video-sourced numbers, these are inferred from each achievement\'s scope (X/N counters, single unlock vs. multi-step). Useful for sorting and rough planning, not a precise forecast.'},
  {b:'Buying isn\'t a separate requirement', t:'once everything above is met, purchase from the Museum guard on the top floor of Varrock Museum for 5,000,000 coins — it\'s just claiming the reward.'},
];

/* =========================================================================
   TRIMMED COMPLETIONIST CAPE — Completionist Cape + Master Quest Cape +
   a further ~86-achievement list, a chunk of which (19 items) was moved
   off this list in 2023 because it overlaps with MQC (already tracked as
   its own prerequisite cape here). Only the known trim-exclusive extras
   are listed below.
   ========================================================================= */
// Full trim-exclusive achievement list (from the wiki's Completionist cape
// (t) page, pasted in by the user the same way the MQC list was). Two rows
// from the source ("Completionist Cape", "Master Quest Cape") were dropped
// deliberately — those just restate the prerequisite capes, which are
// already modeled by this cape's requires:['comp','mqc'] and the prereq
// badges in the hero section, so listing them again as checkable cards
// would be a confusing duplicate with nothing real to check off here.
// As with MQC, `tip` is left blank and `time` is a rough estimate derived
// from each item's listed weight number — refine either as you learn more.
export const ACHIEVEMENTS_TRIM = [
  {id:'adruidssidekick', title:'A Druid\'s Sidekick', req:'Unlock the listed upgrades from Sydekix\'s Shop.', tip:'Time-gated, not a sit-down grind: the ~200,000 cumulative favour needed for every Sydekix upgrade trickles in from daily herb patches, spreading this across roughly 9-10 months, only ~15 min/day of actual effort.', time:'~280-300 days total (~15 min/day)', tags:['Skills','Timegated']},
  {id:'asongoficeandireii', title:'A Song of Ice and Ire II', req:'Defeat the Arch-Glacor at 100% enrage. (X/100)', tip:'', time:'~15 min', tags:['Combat']},
  {id:'agilefromheadtotoe', title:'Agile from Head to Toe', req:'Unlock the agile top and leg rewards from advanced Agility courses.', tip:'', time:'~1 hr', tags:['Skills']},
  {id:'allyourenergies', title:'All Your Energies', req:'Unlock the energy-gathering scrimshaw scroll from Waiko ports reward shop.', tip:'', time:'~30 min', tags:['Exploration']},
  {id:'bonetopickwithyou', title:'Bone to Pick With You', req:'Unlock the bonecrusher upgrade from Waiko reward shop.', tip:'', time:'~30 min', tags:['Exploration']},
  {id:'buildthemall', title:'Build Them All!', req:'Build all of the Treasure Trail hidey-holes. You can find a complete list of hidey-holes at the noticeboard by Zaida.', tip:'', time:'~45 min', tags:['Activities']},
  {id:'canoefixityesyoucan', title:'Canoe Fix It? Yes You Can!', req:'Repair all the canoe stations around Havenhythe. (X/4)', tip:'', time:'~10 min', tags:['Exploration']},
  {id:'championswhatchampions', title:'Champions. What Champions?', req:'Defeat all champions in the Champions\' Challenge.', tip:'', time:'12-20 hrs', tags:['Activities']},
  {id:'chompymassacre', title:'Chompy Massacre', req:'Kill chompy birds. (X/4,000)', tip:'', time:'7-12 hrs', tags:['Lore']},
  {id:'collectorsassemble', title:'Collectors Assemble', req:'Complete all collections for archaeological collectors. (X/78)', tip:'', time:'~10 min', tags:['Skills','Timegated']},
  {id:'conqueredeveryonesheart', title:'Conquered Everyone\'s Heart', req:'Reach maximum reputation with all Heart of Gielinor factions.', tip:'Time-gated, not a sit-down grind: reputation caps out daily, so this stretches across 133 days even though it\'s only ~10 min/day of actual effort.', time:'133 days total (~10 min/day)', tags:['Combat', 'Timegated']},
  {id:'deatheffect', title:'Death Effect', req:'Unlock all permanent effects from Death\'s Store. (X/8)', tip:'Time-gated: unlocks are capped weekly, spreading this across ~7 weeks, but the actual effort is substantial — about 3.5 hours per week (~24 hrs total), not a quick daily check-in.', time:'~24 hrs', tags:['Combat', 'Timegated']},
  {id:'dontcrushmymemories', title:'Don\'t Crush My Memories', req:'Unlock the memory-crushing scrimshaw scroll from the Waiko ports reward shop.', tip:'', time:'~30 min', tags:['Exploration']},
  {id:'draughtincluder', title:'Draught Includer', req:'Discover all invention blueprints. (X/159)', tip:'', time:'~10 min', tags:['Skills']},
  {id:'dreamteam', title:'Dream Team', req:'Start a research contract with a full team of consultants.', tip:'', time:'7-12 hrs', tags:['Skills']},
  {id:'eiedino', title:'E-I-E-DI-NO', req:'Complete the Ranch Out of Time breeding log.', tip:'Time-gated, not a sit-down grind: breeding cycles cap out daily, spreading this across ~90 days (faster if you buy perfect breeding pairs instead of breeding them yourself), only ~5 min/day of actual effort.', time:'~90 days total (~5 min/day)', tags:['Skills', 'Timegated']},
  {id:'eieio', title:'E-I-E-I-O', req:'Complete the breeding log.', tip:'Time-gated, not a sit-down grind: breeding cycles cap out daily, spreading this across ~70 days (faster if you buy perfect breeding pairs instead of breeding them yourself), only ~5 min/day of actual effort.', time:'~70 days total (~5 min/day)', tags:['Skills', 'Timegated']},
  {id:'easternexplorer', title:'Eastern Explorer', req:'Explore the Eastern Lands as far as the Shield from your port. Distance travelled: (X/4,100,000)', tip:'', time:'4-7 hrs', tags:['Activities','Timegated']},
  {id:'elderwisdom', title:'Elder Wisdom', req:'Earn the Wisdom of Anima fletching perk for all the Elder God arrow types.', tip:'', time:'~1 hr', tags:['Exploration']},
  {id:'ferociousupgrade', title:'Ferocious Upgrade', req:'Unlock the upgrade to the ferocious ring so it can be used in Morvran\'s arena.', tip:'', time:'~1 hr', tags:['Skills']},
  {id:'finishhim', title:'Finish Him!', req:'Personally defeat Vorago with the Maul of Omens.', tip:'', time:'1-2 hrs', tags:['Combat']},
  {id:'finishedunpacking', title:'Finished unpacking!', req:'Access the fourth room of the player-owned slayer dungeon.', tip:'', time:'~45 min', tags:['Skills']},
  {id:'gettooledup', title:'Get Tooled Up', req:'Fill up your tool belt.', tip:'', time:'~1 hr', tags:['Activities']},
  {id:'globetrotter', title:'Globetrotter', req:'Purchase the full Globetrotter outfit.', tip:'', time:'7-12 hrs', tags:['Activities','Timegated']},
  {id:'godofthegrind', title:'God of the Grind', req:'Fully repair the statue of Het.', tip:'', time:'1-2 hrs', tags:['Exploration']},
  {id:'grannysfavouritefarmer', title:'Granny\'s Favourite Farmer', req:'Gain max reputation with the Farming Guild.', tip:'', time:'7-12 hrs', tags:['Skills']},
  {id:'hardasdaemons', title:'Hard as Daemons', req:'Earn the right to wear the title \'of Daemonheim\'.', tip:'', time:'1-2 hrs', tags:['Skills']},
  {id:'honouraryimcando', title:'Honourary Imcando', req:'Craft all of Kili\'s equipment upgrades.', tip:'', time:'7-12 hrs', tags:['Skills']},
  {id:'jackofthecircus', title:'Jack of the Circus', req:'Obtain all circus clothing from Balthazar Beauregard\'s Big Top Bonanza.', tip:'Time-gated, not a sit-down grind: clothing unlocks weekly, spreading this across 8 weeks (4 weeks if you use D&D reset tokens), only ~5 min/week of actual effort.', time:'8 weeks total (~5 min/wk)', tags:['Activities', 'Timegated']},
  {id:'jailbreak', title:'Jail break', req:'Free each of the baby dinosaurs from the jail cells within the Rex Matriarch lair.', tip:'', time:'2-3 hrs', tags:['Combat']},
  {id:'jurassicperk', title:'Jurassic Perk', req:'Discover all the totem pieces on Anachronia. (X/7)', tip:'', time:'2-3 hrs', tags:['Exploration']},
  {id:'kalgerioncommander', title:'Kal\'gerion Commander', req:'Unlock the Kal\'gerion battle commendation titles.', tip:'', time:'3-5 hrs', tags:['Skills']},
  {id:'likefarmingfishinapoolgiantcrayfish', title:'Like Farming Fish in a Pool - Giant Crayfish', req:'Catch 250 giant crayfish at the Wendlewick fish farm.', tip:'', time:'~1 hr', tags:['Skills']},
  {id:'likefarmingfishinapoolshark', title:'Like Farming Fish in a Pool - Shark', req:'Catch 250 sharks at the Wendlewick fish farm.', tip:'', time:'~45 min', tags:['Skills']},
  {id:'likefarmingfishinapoolswordfish', title:'Like Farming Fish in a Pool - Swordfish', req:'Catch 250 swordfish at the Wendlewick fish farm.', tip:'', time:'~30 min', tags:['Skills']},
  {id:'mariayougottaseeher', title:'Maria, You Gotta See Her', req:'Complete all three additional challenges from Maria in the Broken Home quest.', tip:'', time:'1-2 hrs', tags:['Lore','Timegated']},
  {id:'masterangler', title:'Master Angler', req:'Purchase the champion\'s tackle box from the Fish Flingers fisherman.', tip:'', time:'2-3 hrs', tags:['Activities']},
  {id:'masterbuilder', title:'Master Builder', req:'Fully upgrade the base camp on Anachronia.', tip:'Time-gated, not a sit-down grind: base camp upgrades cap out daily, spreading this across 65 days, only ~5 min/day of actual effort.', time:'65 days total (~5 min/day)', tags:['Exploration', 'Timegated']},
  {id:'masterotto', title:'Master Otto', req:'Complete all barbarian training with Otto, at his grotto west of Baxtorian Falls.', tip:'', time:'1-2 hrs', tags:['Activities']},
  {id:'masterydaemonheim', title:'Mastery - Daemonheim', req:'Fully explore the history of the Daemonheim Dig Site.', tip:'', time:'~10 min', tags:['Skills']},
  {id:'masteryeverlight', title:'Mastery - Everlight', req:'Fully explore the history of the Everlight Dig Site.', tip:'', time:'~10 min', tags:['Skills']},
  {id:'masteryinfernalsource', title:'Mastery - Infernal Source', req:'Fully explore the history of the Infernal Source Dig Site.', tip:'', time:'~10 min', tags:['Skills']},
  {id:'masterykharidet', title:'Mastery - Kharid-et', req:'Fully explore the history of the Kharid-et Dig Site.', tip:'', time:'~10 min', tags:['Skills']},
  {id:'masterymoonrise', title:'Mastery - Moonrise', req:'Fully explore the history of the Moonrise Dig Site. (X/2)', tip:'', time:'~10 min', tags:['Skills']},
  {id:'masteryorthen', title:'Mastery - Orthen', req:'Fully explore the history of the Orthen Dig Site.', tip:'', time:'~10 min', tags:['Skills']},
  {id:'masterysenntisten', title:'Mastery - Senntisten', req:'Fully explore the history of the Senntisten Dig Site.', tip:'', time:'~10 min', tags:['Skills']},
  {id:'masterystormguardcitadel', title:'Mastery - Stormguard Citadel', req:'Fully explore the history of the Stormguard Dig Site.', tip:'', time:'~10 min', tags:['Skills']},
  {id:'masterywarforge', title:'Mastery - Warforge', req:'Fully explore the history of the Warforge Dig Site.', tip:'', time:'~10 min', tags:['Skills']},
  {id:'mazcabteleport', title:'Mazcab Teleport', req:'Unlock the Mazcab Teleport spell.', tip:'', time:'~45 min', tags:['Skills']},
  {id:'memorialisedmorethanonce', title:'Memorialised More Than Once', req:'Prestige the Memorial to Guthix three times. (X/3)', tip:'', time:'7-12 hrs', tags:['Skills']},
  {id:'mittsandwadersdeathlotus', title:'Mitts and Waders - Death Lotus', req:'Unlock the death lotus gloves and boots scrolls from the Waiko reward shop.', tip:'', time:'~45 min', tags:['Exploration','Timegated']},
  {id:'mittsandwadersseasinger', title:'Mitts and Waders - Seasinger', req:'Unlock the seasinger gloves and boots scrolls from the Waiko reward shop.', tip:'', time:'~45 min', tags:['Exploration','Timegated']},
  {id:'mittsandwaderstetsu', title:'Mitts and Waders - Tetsu', req:'Unlock the tetsu gloves and boots scrolls from the Waiko reward shop.', tip:'', time:'~45 min', tags:['Exploration','Timegated']},
  {id:'mygoebiehomies', title:'My Goebie Homies', req:'Obtain maximum reputation with the goebies on Mazcab.', tip:'', time:'~1 hr', tags:['Combat','Timegated']},
  {id:'nomadsmirage', title:'Nomad\'s Mirage', req:'Defeat the memory of Nomad and loot one of his bounty chests.', tip:'', time:'~1 hr', tags:['Activities']},
  {id:'onarunehigh', title:'On a Rune High', req:'Unlock the highest rune shop from Ali Morrisane, by completing the \'Rogue Trader\' miniquest.', tip:'', time:'~30 min', tags:['Lore']},
  {id:'outofthisworld', title:'Out of this World', req:'Unlock everything in the Shooting Star Reward Shop. (X/3)', tip:'Time-gated: stars only spawn a limited number of times per day, spreading this across 13 days (7 with reset tokens), but the actual effort is substantial — about 36 stars at ~45 min each, roughly 27 hours total.', time:'~27 hrs', tags:['Activities', 'Timegated']},
  {id:'penguinadoptionagency', title:'Penguin Adoption Agency', req:'Adopt Sheldon the penguin by tracking penguin spies around the world.', tip:'Time-gated, not a sit-down grind: spy tracking unlocks weekly, spreading this across 6 weeks (3 weeks if you use D&D reset tokens), only ~15 min/week of actual effort.', time:'6 weeks total (~15 min/wk)', tags:['Activities', 'Timegated']},
  {id:'perkylikeaprawn', title:'Perky Like a Prawn', req:'Gain all possible Prawn Perk Points for your Aquarium. (X/2)', tip:'', time:'1-2 hrs', tags:['Skills']},
  {id:'rankmasterfinix', title:'Rank: Master Finix', req:'Obtain rank 1 esteem from Wizard Finix.', tip:'', time:'2-3 hrs', tags:['Skills']},
  {id:'raptorsrevenge', title:'Raptor\'s Revenge', req:'Complete the Ungael combat activity on hard mode.', tip:'', time:'~15 min', tags:['Activities']},
  {id:'reapercrew', title:'Reaper Crew', req:'Defeat listed bosses at least once. (X/55)', tip:'', time:'~10 min', tags:['Combat']},
  {id:'relicweary', title:'Relic-weary', req:'Unlock all relic powers at the monolith.', tip:'', time:'~10 min', tags:['Skills']},
  {id:'remotelypossible', title:'Remotely Possible', req:'Build the Remote Totem Access Point in the base camp on Anachronia.', tip:'', time:'~15 min', tags:['Exploration']},
  {id:'reputationclasscrown', title:'Reputation - Class Crown', req:'Earn tier 10 reputation with the imperial faction in Menaphos.', tip:'', time:'4-7 hrs', tags:['Exploration','Timegated']},
  {id:'reputationlockstockandbarrel', title:'Reputation - Lock, Stock and Barrel', req:'Earn tier 10 reputation with the merchant faction in Menaphos.', tip:'', time:'4-7 hrs', tags:['Exploration']},
  {id:'reputationseagullible', title:'Reputation - Seagullible', req:'Earn tier 10 reputation with the ports faction in Menaphos.', tip:'', time:'4-7 hrs', tags:['Exploration']},
  {id:'reputationtothebone', title:'Reputation - To the Bone', req:'Earn tier 10 reputation with the worker faction in Menaphos.', tip:'', time:'4-7 hrs', tags:['Exploration']},
  {id:'salty', title:'Salty', req:'Fully explore what the Arc has to offer, and earn the right to claim the \'Salty\' title.', tip:'', time:'2-3 hrs', tags:['Exploration']},
  {id:'sandy', title:'Sandy', req:'Complete various achievements within Menaphos... and then some more to earn the right to claim the \'Sandy\' title.', tip:'', time:'~10 min', tags:['Exploration']},
  {id:'scrollinginthedeep', title:'Scrolling in the Deep', req:'Find every scroll piece in Player Owned Ports.', tip:'', time:'~10 min', tags:['Activities']},
  {id:'scrollingwithpower', title:'Scrolling with Power', req:'Unlock the Dungeoneering scroll traits.', tip:'', time:'~1 hr', tags:['Skills']},
  {id:'shadowsbelow', title:'Shadows Below', req:'Survive the shadow beneath the barrows.', tip:'', time:'7-12 hrs', tags:['Combat']},
  {id:'sortofcrystally', title:'Sort of Crystally', req:'Obtain the \'Dark Lord\' title by unlocking a selection of titles from Prifddinas.', tip:'', time:'1-2 hrs', tags:['Exploration']},
  {id:'specialslayerdelivery', title:'Special Slayer Delivery', req:'Unlock the ability to craft the listed Slayer items.', tip:'', time:'2-3 hrs', tags:['Skills']},
  {id:'stonesthrowaway', title:'Stone\'s Throw Away', req:'Complete the Dahmaroc statue in your player-owned house.', tip:'', time:'7-12 hrs', tags:['Skills','Timegated']},
  {id:'telosifyoureangryii', title:'Telos If You\'re Angry II', req:'Defeat Telos at 100% enrage. (X/100)', tip:'', time:'~15 min', tags:['Combat']},
  {id:'thegoldencrocodilehunter', title:'The Golden Crocodile Hunter', req:'Unlock all Hunter upgrades from Dundee\'s Shop.', tip:'', time:'1-2 hrs', tags:['Exploration']},
  {id:'theprodigalspender', title:'The Prodigal Spender', req:'Purchase all permanent unlocks from Ezreal\'s shop at the Archaeology Guild. (X/7)', tip:'', time:'2-3 hrs', tags:['Skills']},
  {id:'tobeamaster', title:'To Be a Master', req:'Fully complete the slayer codex.', tip:'', time:'~10 min', tags:['Skills','Timegated']},
  {id:'umpop', title:'Um Pop', req:'Meet all of the listed inhabitants of Um.', tip:'', time:'~1 hr', tags:['Exploration']},
  {id:'warwhatisitgoodfor', title:'War. What Is It Good For?', req:'Buy all unlocks and upgrades from War\'s store. (X/2)', tip:'', time:'~10 min', tags:['Combat']},
  {id:'whowillbeherlover', title:'Who Will Be Her Lover?', req:'Complete the replica statue of Rhiannon in the Max Guild garden.', tip:'', time:'12-20 hrs', tags:['Exploration']},
  {id:'workonyourartisanii', title:'Work on Your Artisan II', req:'Unlock all rewards from the Artisans\' Workshop (including outfits and excluding auras).', tip:'', time:'~10 min', tags:['Skills']},
];

export const TIPS_TRIM = [
  {b:'Get Completionist Cape and Master Quest Cape first', t:'both are tracked as prerequisites on this cape\'s tab — Trimmed Completionist is built directly on top of them, not a separate grind from scratch.'},
  {b:'The requirement list grows over time', t:'as new content releases, Jagex periodically adds new achievements to the trim list — this is the most "living" of the four capes.'},
  {b:'84 trim-exclusive achievements', t:'these are on top of (not instead of) everything already required for Completionist Cape and Master Quest Cape, which are tracked on their own tabs.'},
  {b:'Buying isn\'t a separate requirement', t:'once Completionist Cape, Master Quest Cape and everything above are met, purchase from the same Museum guard for 5,000,000 coins.'},
];

export const TIPS_MASTERCOMP = [
  {b:'Nothing new to grind', t:'both prerequisites — Completionist Cape and Master Max Cape — are already tracked on their own tabs; once each reads 100%, this one is automatically satisfied too.'},
  {b:'Not purchased — admired', t:'wear the master max cape, keep the completionist cape in your inventory (worn at least once), then admire the Ornate Grave in Falador Park and pick the Completionist cape option.'},
];

export const TIPS_MASTERTRIM = [
  {b:'Nothing new to grind', t:'both prerequisites — Trimmed Completionist Cape and Master Max Cape — are already tracked on their own tabs; once each reads 100%, this one is automatically satisfied too.'},
  {b:'Not purchased — admired', t:'wear the master max cape, keep the trimmed completionist cape in your inventory (worn at least once), then admire the Ornate Grave in Falador Park and pick the Trimmed completionist cape option.'},
];

/* =========================================================================
   QUEST CAPE — the requirement is "complete every quest", currently 280+
   and growing with every quest release. Rather than duplicate that list
   quest-by-quest as static data (it would drift out of date almost
   immediately), this tab renders live from a RuneMetrics quest sync (see
   fetchPlayerQuests() in api.js and applyPlayerQuests() in main.js) —
   before the first sync it falls back to the wiki's own live requirement
   list via achEmptyMessage below.

   Important: Quest Cape's own requirement is real quests ONLY — it does
   NOT require miniquests or sagas (per
   https://runescape.wiki/w/Miniquests: "Having completed all miniquests
   ... completes ... I've Got a Little List (of Miniquests) ... [and]
   completing all ... sagas completes ... Bridge over Fremmy Waters. Both
   achievements are requirements for the master quest cape and the
   completionist cape" — not Quest Cape itself). Miniquests and sagas are
   still synced and shown on this tab for convenience (RuneMetrics returns
   them in the same call), and their own completion auto-ticks the two
   separate Completionist Cape achievements above, but they're
   deliberately excluded from this cape's own completion percentage — see
   questTypeCounts() in storage.js and how capeStats() uses it.
   ========================================================================= */
export const TIPS_QUESTS = [
  {b:'This tab syncs live', t:'hit "Sync stats & quests" above with your display name and every quest\'s real completion status is pulled from RuneMetrics — no need to check them off by hand.'},
  {b:'The wiki is the fallback', t:'until you sync (or if RuneMetrics is unreachable), the Quest Cape (achievement) page linked above lists every required quest in release order and is kept current as new quests launch.'},
  {b:'Miniquests and sagas are shown here too, but aren\'t part of this cape\'s own requirement', t:'Quest Cape only needs real quests. Miniquests and sagas are tracked on this tab for convenience since RuneMetrics returns them together, and completing all of each auto-ticks their own separate Completionist Cape achievements ("I\'ve Got a Little List (of Miniquests)" and "Bridge over Fremmy Waters") — but neither counts toward Quest Cape\'s percentage above.'},
  {b:'Skill levels below are the minimum unboostable levels', t:'per the wiki\'s Quest Cape page — these come from individual quests\' requirements, not from the cape itself, so they\'ll already be satisfied for most players well before the last quest is done.'},
];

// Minimum unboostable skill levels required across all quests, per
// https://runescape.wiki/w/Quest_Cape#Minimum_skill_level (current as of
// Wiz Kid, the 469th quest point / 23 March 2026). Total level 2209.
// Crafting, Runecrafting, Smithing and Invention also carry a shared
// "at least one of these four to 85" requirement (Sins of the Father) —
// flagged via each skill's note rather than as a separate tracked item.
// Order follows the in-game Skills tab grid (see SKILLS_MQC above for why).
export const SKILLS_QUESTS = [
  ['attack','Attack',79],['constitution','Constitution',80],['mining','Mining',80],
  ['strength','Strength',85],['agility','Agility',83],['smithing','Smithing',82],
  ['defence','Defence',76],['herblore','Herblore',80],['fishing','Fishing',72],
  ['ranged','Ranged',78],['thieving','Thieving',85],['cooking','Cooking',70],
  ['prayer','Prayer',80],['crafting','Crafting',80],['firemaking','Firemaking',82],
  ['magic','Magic',81],['fletching','Fletching',75],['woodcutting','Woodcutting',80],
  ['runecrafting','Runecrafting',61],['slayer','Slayer',87],['farming','Farming',65],
  ['construction','Construction',81],['hunter','Hunter',76],['summoning','Summoning',75],
  ['dungeoneering','Dungeoneering',77],['divination','Divination',80],['invention','Invention',1],
  ['archaeology','Archaeology',86],['necromancy','Necromancy',95],
].map(([id,name,req])=>({
  id, name, req, tag:String(req),
  note:['crafting','runecrafting','smithing','invention'].includes(id)
    ? 'At least one of Crafting, Runecrafting, Smithing or Invention must reach level 85 for <a href="https://runescape.wiki/w/Sins_of_the_Father" target="_blank" rel="noopener">Sins of the Father</a> — the levels shown above are each skill\'s own minimum, not this shared requirement.'
    : '',
}));

/* Cape registry — every cape shares the same rendering pipeline. Max,
   Master Max, Completionist, MQC, and Trimmed Completionist are all fully
   wired up; add further capes here the same way. Order here = tab order. */
export const CAPES = [
  {
    id:'max', name:'Max Cape', short:'Max',
    blurb:'All 29 skills to level 99 — the foundation every other cape here builds on.',
    wikiUrl:'https://runescape.wiki/w/Max_cape',
    image:'https://runescape.wiki/images/Max_cape_detail.png',
    requires:[],
    skills: SKILLS_MAX, achievements: ACHIEVEMENTS_MAX, tips: TIPS_MAX,
    achHeading:'Achievements', achNote:'',
  },
  {
    id:'quests', name:'Quest Cape', short:'Quest',
    blurb:'Complete every quest in the game (miniquests and sagas are shown here too, but aren\'t required for this cape) — the single requirement every other cape here ultimately leans on.',
    wikiUrl:'https://runescape.wiki/w/Quest_Cape_(achievement)',
    image:'https://runescape.wiki/images/Quest_Cape_detail.png',
    requires:[],
    skills: SKILLS_QUESTS, achievements: [], tips: TIPS_QUESTS,
    achHeading:'Achievements', achNote:'',
    achEmptyMessage:'Quest Cape has one requirement — complete every quest in the game (280+, and growing; miniquests and sagas don\'t count toward it). Enter a display name above and hit "Search player" to pull real per-quest completion from RuneMetrics, or check the wiki\'s <a href="https://runescape.wiki/w/Quest_Cape_(achievement)" target="_blank" rel="noopener">Quest Cape (achievement) page</a> for the current list.',
  },
  {
    id:'mastermax', name:'Master Max Cape', short:'Master Max',
    blurb:'All 29 skills to level (real or virtual) 120, then a short one-off questline.',
    wikiUrl:'https://runescape.wiki/w/Master_max_cape',
    image:'https://runescape.wiki/images/Master_max_cape_detail.png',
    requires:['max'],
    skills: SKILLS_MASTERMAX, achievements: ACHIEVEMENTS_MASTERMAX, tips: TIPS_MASTERMAX,
    achHeading:'Achievements', achNote:'',
  },
  {
    id:'comp', name:'Completionist Cape', short:'Completionist',
    blurb:'Max Cape at elevated per-skill thresholds, plus the full 102-achievement list pulled from the wiki.',
    wikiUrl:'https://runescape.wiki/w/Completionist_cape',
    image:'https://runescape.wiki/images/Completionist_cape_detail.png',
    // Quest Cape is a genuine prerequisite — its own "compquestcape" item in
    // ACHIEVEMENTS_COMP below still tracks it as a checkbox, but listing it
    // here too drives the "Requires Quest Cape (X%)" badge in the hero
    // section, using the questSynced wiring capeStats already has for this.
    requires:['max','quests'],
    skills: SKILLS_COMP, achievements: ACHIEVEMENTS_COMP, tips: TIPS_COMP,
    achHeading:'Achievements', achNote:'',
  },
  {
    id:'mqc', name:'Master Quest Cape', short:'Master Quest Cape',
    blurb:"Organise, track and grind toward the MQC — skill thresholds plus the full 307-item wiki achievement list.",
    wikiUrl:'https://runescape.wiki/w/Master_Quest_Cape_(achievement)',
    image:'https://runescape.wiki/images/Master_quest_cape_detail.png',
    // Same reasoning as Completionist Cape's requires above: Quest Cape is a
    // genuine prerequisite here too — MQC's own "questcape" item in
    // ACHIEVEMENTS_MQC still tracks it as a checkbox, but listing it here
    // drives the "Requires Quest Cape (X%)" badge in the hero section.
    requires:['quests'],
    skills: SKILLS_MQC, achievements: ACHIEVEMENTS_MQC, tips: TIPS_MQC,
    achHeading:'Achievements',
    achNote:'',
    // MQC's 307 items carry 40+ distinct wiki sub-tags (per-location,
    // per-faction, per-minigame — e.g. "Prifddinas", "Zarosian", "Havenhythe")
    // which would otherwise turn the filter row into a wall of chips. Curated
    // down to the same handful of broad categories Completionist Cape uses;
    // the full tag set still shows on each card, this only trims what's
    // offered as a top-level filter. 'Timegated' isn't offered as a filter
    // at all — those items always get their own subsection (see renderAch
    // in ui.js) — but is left on individual cards' tag lists.
    filterTags: ['Lore', 'Post-Quest', 'Books', 'Skills', 'Archaeology', 'Exploration', 'Activities'],
  },
  {
    // Trim adds no skill requirement of its own beyond Completionist + Master
    // Quest Cape — Completionist's per-skill levels are already >= MQC's for
    // every skill (verified skill-by-skill against SKILLS_MQC), so re-using
    // SKILLS_COMP here is accurate, not a placeholder. With both prereqs
    // listed in `requires`, getPrereqSkillReq (storage.js) will find every
    // one of these already met by Completionist, so they all land in the
    // collapsed "Already covered by..." accordion instead of the main grid
    // — which is correct, since trim's real extra work is achievement-based
    // (Reaper Crew, Globetrotter, etc.), not additional skill grinding.
    id:'trim', name:'Trimmed Completionist Cape', short:'Trimmed Completionist',
    blurb:'Completionist Cape plus Master Quest Cape plus a further set of trim-exclusive requirements (Reaper Crew, Globetrotter, and more).',
    wikiUrl:'https://runescape.wiki/w/Completionist_cape_(t)',
    image:'https://runescape.wiki/images/Completionist_cape_%28t%29_detail.png',
    requires:['comp','mqc'],
    skills: SKILLS_COMP, achievements: ACHIEVEMENTS_TRIM, tips: TIPS_TRIM,
    achHeading:'Achievements', achNote:'',
  },
  {
    // Per the wiki (Master Completionist Cape (achievement)), this has no
    // independent achievement list of its own — its only two requirements
    // are the Completionist Cape and Master Max Cape achievements, so once
    // both prerequisite capes above are fully checked off, this one is too.
    // Same reasoning applies to skills: Master Max's 120 (real or virtual)
    // in every skill is always >= Completionist's own per-skill levels, so
    // SKILLS_MASTERMAX is the accurate shared list here too — every skill
    // ends up in the "Already covered by..." accordion rather than a
    // separate grind.
    id:'mastercomp', name:'Master Completionist Cape', short:'Master Completionist',
    blurb:'Completionist Cape and Master Max Cape held at once — no independent requirements beyond its two prerequisites.',
    wikiUrl:'https://runescape.wiki/w/Master_completionist_cape',
    image:'https://runescape.wiki/images/Master_completionist_cape_detail.png',
    requires:['comp','mastermax'],
    skills: SKILLS_MASTERMAX, achievements: [], tips: TIPS_MASTERCOMP,
    achHeading:'Achievements', achNote:'',
  },
  {
    // Same story as Master Completionist Cape above, one tier up: its only
    // two requirements are the Trimmed Completionist Cape and Master Max
    // Cape achievements (wiki: Master Trimmed Completionist Cape). Skills
    // follow the same logic too — Master Max's 120 always covers Trim's own
    // (== Completionist's) per-skill levels, so this reuses SKILLS_MASTERMAX.
    id:'mastertrim', name:'Master Trimmed Completionist Cape', short:'Master Trimmed',
    blurb:'Trimmed Completionist Cape and Master Max Cape held at once — no independent requirements beyond its two prerequisites.',
    wikiUrl:'https://runescape.wiki/w/Master_completionist_cape_(t)',
    image:'https://runescape.wiki/images/Master_completionist_cape_%28t%29_detail.png',
    requires:['trim','mastermax'],
    skills: SKILLS_MASTERMAX, achievements: [], tips: TIPS_MASTERTRIM,
    achHeading:'Achievements', achNote:'',
  },
];

export function getCape(id){ return CAPES.find(c=>c.id===id); }

/* =========================================================================
   SHARED ACHIEVEMENTS — a handful of Completionist/MQC achievements are the
   literal same in-game requirement, hand-annotated as such in each one's own
   `tip` (see e.g. compdatarecovery/compfamilyspirittree above). Right now
   completing one still leaves the other unchecked on its own tab, so players
   end up re-ticking the same real task twice. This is the explicit pairing
   list storage.js/ui.js use to mirror a checkbox's state onto its twin the
   moment either one is toggled. Only add a pair here once a `tip` on the
   wiki-sourced side already confirms they're identical — this is not a
   fuzzy title match, deliberately, since a false pair would auto-check
   something the player hasn't actually done.
   ========================================================================= */
export const SHARED_ACHIEVEMENTS = [
  [{cape:'comp', id:'compdatarecovery'}, {cape:'mqc', id:'datarecovery'}],
  [{cape:'comp', id:'compfamilyspirittree'}, {cape:'mqc', id:'familyspirittree'}],
];

/** Given a (capeId, achievementId), returns the other half of its shared
 *  pair — {cape, id} — or null if this achievement isn't part of one. */
export function getSharedAchievement(capeId, achId){
  for(const pair of SHARED_ACHIEVEMENTS){
    const [a, b] = pair;
    if(a.cape === capeId && a.id === achId) return b;
    if(b.cape === capeId && b.id === achId) return a;
  }
  return null;
}

// Official detailed skill icons from the RuneScape Wiki
// (https://runescape.wiki/w/Category:Detailed_skill_icons). One canonical
// map keyed by the same skill ids used across every cape's SKILLS_* arrays,
// so it only needs to be maintained in one place.
export const SKILL_ICON_BASE = 'https://runescape.wiki/images/';

// Same hotlinking approach as the skill icons above — these are the wiki's
// own hosted copies of the official membership-status badges (used on
// every quest infobox there), referenced by URL rather than stored locally.
export const MEMBERS_ICON = 'https://runescape.wiki/images/P2P_icon.png';
export const F2P_ICON = 'https://runescape.wiki/images/F2P_icon.png';

// Section-heading icons — same hotlinking approach as above. SKILLS_ICON is
// used as-is (the Skills heading never changes); QUESTS_ICON vs AREA_TASKS_ICON
// is picked per-cape for the requirements heading (see renderAch/renderQuestChecklist
// in ui.js) since the Quest Cape / MQC pages are quest lists while every other
// cape's requirements read more like the game's "Area Tasks" achievement category.
export const SKILLS_ICON = 'https://runescape.wiki/images/Statistics.png';
export const QUESTS_ICON = 'https://runescape.wiki/images/Lore_achievements_icon.png';
export const AREA_TASKS_ICON = 'https://runescape.wiki/images/Area_Tasks_achievements_icon.png';

// The wiki's own "D&D" icon (its file history literally reads "the icon for
// Distractions and Diversions") — used on the shortened 'D&D' tag pill on
// achievement cards, see pillHTML in ui.js.
export const DND_ICON = 'https://runescape.wiki/images/D%26D_icon.png';

export const SKILL_ICONS = {
  attack:'Attack.png', strength:'Strength.png', defence:'Defence.png', constitution:'Constitution.png',
  ranged:'Ranged.png', prayer:'Prayer.png', magic:'Magic.png', cooking:'Cooking.png',
  woodcutting:'Woodcutting.png', fletching:'Fletching.png', fishing:'Fishing.png', firemaking:'Firemaking.png',
  crafting:'Crafting.png', smithing:'Smithing.png', mining:'Mining.png', herblore:'Herblore.png',
  agility:'Agility.png', thieving:'Thieving.png', slayer:'Slayer.png', farming:'Farming.png',
  runecrafting:'Runecrafting.png', hunter:'Hunter.png', construction:'Construction.png', summoning:'Summoning.png',
  dungeoneering:'Dungeoneering.png', divination:'Divination.png', invention:'Invention.png',
  archaeology:'Archaeology.png', necromancy:'Necromancy.png',
};

// RuneMetrics' numeric skill ids (0–28), in the order documented on the
// wiki's Profile section, mapped onto the same skill ids used everywhere
// else in this tracker. Lives here since it's a data mapping, used by api.js.
export const RUNEMETRICS_SKILL_IDS = [
  'attack','defence','strength','constitution','ranged','prayer','magic','cooking',
  'woodcutting','fletching','fishing','firemaking','crafting','smithing','mining','herblore',
  'agility','thieving','slayer','farming','runecrafting','hunter','construction','summoning',
  'dungeoneering','divination','invention','archaeology','necromancy',
];

// All 29 trainable skills, name + id only — unlike SKILLS_MQC (a curated
// subset of *requirements* for one specific cape), this is just the full
// roster for display purposes, e.g. the Player page's skills dashboard.
// Every id here happens to capitalize cleanly into its display name, so no
// separate lookup table is needed.
export const ALL_SKILLS = RUNEMETRICS_SKILL_IDS.map(id => ({
  id,
  name: id[0].toUpperCase() + id.slice(1),
}));
