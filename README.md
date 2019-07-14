# Activity log
- better commit descriptions
- [Useful dev notes](./src/MAYBEREADME.md)

## WIP
- [ ] Game mode publishing, publish through pageRepo alone pretty much, use modes to publish relevant roles/phases/events. Need to automate this instead of the monstrosity that resides in [AdminView](./src/modules/home/game/AdminView.js)

## Backlog
- [ ] Mafia core game
- [ ] email/sign-up on website
- [ ] board handling, thinking of implementing a room.board:[] property
- [ ] deck handling, thinking of implementing a room.deck:[] property that stores pageKeys. This allows for phases, roles, and events to be drawn from a deck. Would need to add a new logic field "onDrawn"
- [ ] Avalon blitz
- [ ] Avalon event based (deck)

## Low Priority
- [ ] move eventEditor to a modal view to write better pseudo code. Currently not working well.
- [ ] string edits cannot start with a variable

## 07/14/2019
### Major
- [x] Avalon core tested
- [x] Avalon Lady of the Lake
- [x] it's difficult to parse for phase changes, maybe I should create a marker that allows JSON.stringify to work? IMPLEMENTATION: just parsed string, seems to work decently so won't change it for now. IMPLEMENTATION 2: I realized that leftover logic still exists so now I am putting the logic through getCode and parsing for next.update.gameState.phase and finding the string. Can't go wrong with this.

## 07/06/2019
### Major
- [x] basic testing architecture

## 06/25/2019
### Major
- [x] Avalon core game
- [x] Beta key limitations on website
- [x] desktop view for website

## 06/21/2019
### Major
- [x] handling better returns and gameChoices (heavier inclusion of variables), this allows for more customization for what the user is seeing, and which choices to show each player. It was seen as necessary to allow for a variable amount of multiTarget/orderedTarget. Otherwise, games such as avalon would require many many cloned phases (select 2, select 3, etc). This also seemed appropriate for descriptions, under the same logic
- [x] moved rssMap to firebase, to allow for easier gameState manipulation (instead of a const). Allowed for creation of gameState fields in ModeView.

## 06/10/2019
### Major
- [x] flesh out health handling
- [x] logicType.function (using parseType.function for current front-end, needs fix though)
- [x] real test with roles

### Minor
- [x] NOT IMPLEMENTED: Field view tags can be moved to global vars, check if this can call for removal of fieldMap/fieldRepo. (REASON): fieldRepo tags could be removed but defaultValue is still useful.
- [x] test out nested Function eval ... SKETCH AF
- [x] proper tags in parseType.variable/update (e.g. player.tag-12345678 instead of player.dead)
- [x] add new items to rssMap such as player name

## 06/09/2019
### Major
- [x] playing a game (single player)
- [x] write more advanced phases
- [x] fix parseType.update
- [x] flesh out gameChoices

### Minor
- [x] delete logic

## 06/08/2019
### Major
- [x] basic website for landing (beta invite)

### Minor
- [x] image view

## 06/07/2019
### Major
- [x] Simple game prototyping, rough drafts are made through AdminView without any realistic way to parse the phase paths. Events not included yet.

### Minor
- [x] Project homeview
- [x] Common Input / TextArea components
- [x] Declared variables no longer store their state in the logicItem, but at the top-level of the Logic itself. Therefore, a check needs to take place when deleting logicItems. This needs to be added to the LogicEngine as well.
- [x] for loop handling
- [x] merge DEFAULT_VAR_ID with LOGIC_ITEM_VAR

## 06/05/2019
### Major
- [x] front-end revamp, getting rid of "Patches" & splitting up "Roles/Phases/GameModes/Events"
- [x] project handling & publishing (with removed modeRepo).

### Minor
- [x] Save wildcards while going through PickVar/PickVarSubfields
- [x] removed current/repeat variable from results. 1 edge case may be that variables with wildcards should be allowed to repeat because they have potential to end up as different variables.
- [x] pick types (special options): uid, time
- [x] removed dropdowns from types & rssMap
- [x] parseUpdate needs to account for variable paths (introduced varInStr to use on parseType.string as well)
- [x] removed modeRepo/modeMap, updated Tag to not need "mdi mdi-..."

## 06/04/2019
### Major
- [x] control handleSelect in LogicPanel instead of PickVar/PickVarWithType
- [x] wildcard direct handling in components with parseType.variable, this should be done through a dropdown + picking a uid

### Minor
- [x] parse string, boolean
- [x] parse object
- [x] merge comparisonType with other types
- [x] logicType.return / logicType.event - is 8 variable objects too much? GOOD FOR NOW
- [x] remove .nativeValue (can figure out from value itself)
- [x] add "setTo" among "calculator" option for varType.number
- [x] replace all modal wrapper divs with <Body>

## 06/03/2019
### Major
- [x] Apply parse method to LogicEngine
- [x] PickVar, Unify updates & assigns to parse method
- [x] PickVarWithType, Unify updates

### Minor
- [x] subpath has been DEPRECATED
- [x] declare scope properly in .map of LogicBlock
- [x] figuring out how to pass props properly through LogicParse

## 06/02/2019
### Major
- [x] PWA Prototyping for MVP

## 06/01/2019
### Major
- [x] remove mathType & DEFAULT_ASSIGN, fully replace with parse implementation

### Minor
- [x] parseType.number implementation
- [x] update order of operations for logic engine
- [x] getting rid of stuff in AppWrapper, got rid of cancel-appclick
- [x] all (important) React.Components removed

## 05/31/2019
### Major
- [x] parseType initial implementation

### Minor
- [x] Showing declared variables. ~~May have to revert the removal of the "static" property of LOGIC_ITEM_VAR~~. Created a new component for this (LogicDeclare) which accepts the overall vars, but filters them with "~~currentScope~~logicKey". This allows users to see the initial variables for the specific LogicView as well.
- [x] replaced all genUID functions with generatePushID which guarantee's uniqueness without using the repo. This has been expected for a while, but is pretty necessary for parsing architecture (creating more complex defaults)
- [x] comparisons can probably be done using the same architecture as math operations are using. This would allow for updateType.operation instead of the messy equation that currently exists for if/elseif logic
- [x] Figuring out how to show dropdown/modal based on the LogicPanel => just done through logicItem.logicType/operatorType and a switch statement. Nothing fancy right now, but it works
- [x] ~~defaults need to be fully developed at creation.~~ worked around this by allowing null objects to still show panels. They are still assigned a varKey, but are not fully created until the user performs an action. This is easier to do, & easier for firebase/listening.
- [x] VAR_DEFAULTS completely removed, key prop removed from LOGIC_ITEM_VAR as it will never be changed, and is always known at initialization. Wildchars changed to nativeValue, & set by default when selecting a variable. This ensures we are not checking "isWild", which is excessive.
- [x] deleted updateType

## 05/30/2019
### Major
- [x] NumberView works for if/elseif
- [x] StringView major refactor

### Minor
- [x] PageReducer.updateGeneral should be updated to receive ~~an array of objects~~ a infinite list of objects, so that multiple updates can reliably be sent to firebase at once. This also allows us to update using different paths.
- [x] variables should be handled at the top level (logicItem.~~varScopes~~ vars), instead of the current method which assigns objects together in a mutable style. This also allows us to access variables from any location, instead of passing an object of variables to the new Modal/Dropdown. When a variable is declared, it can simply be given a key. Each LogicBlock must keep track of it's path, so we can easily tell if variables belong to it's scope.
- [x] childKeys should be changed to byIndex for consistency
- [x] logicItems should be stored in byId for consistency
- [x] allow DropParent to be fully functional without taking props from it's parent. This allows the props for dropdown's to be more transparent, as the DropParent will no longer need ~~showDropdown~~(still needs a special showDropdown which has access to the index) and serialList. implemented a serialParent param to pass to Dropdown Reducer in order to accomplish this. Also changed dropdownType to dropdown to be consistent with DropClick.