# Why Maybe?
- I started making a lot of README's among the module folders but due to the need to develop fast and change things 24/7 I wasn't able to actually update them all when I made changes. MAYBEREADME and the root level README are the only reliable sources of information. If it's not here, sorry!

## Auth
- [AuthWrapper](./modules/auth/AuthWrapper.js) keeps track of the user through firebase.auth().onAuthStateChanged().

## Modals
- all modals are controlled from a High-level component located in AppNavigator
- Modals have a z-index of 2 (slightly lower than Dropdowns)

### How it works
- [ModalView](./modules/modal/ModalView.js) maps the keys to render at position=relative to the window
- [ModalConnect](./modules/modal/ModalConnect.js) passes functions to every modal, with functions specific to the modal index (multiple modals can be open at once, and will stack on top of each other). If there is a path:Array prop passed to the modal, it will also pass a "slate" property, which uses the path to get state from redux.
- [ModalKeys](./modules/modal/ModalKeys.js) simply renders the Component. There are a lot of keys so we just want to keep this in a separate file as it gets hectic.

### Adding a Modal
- Add a new [type](./modules/modal/types.js)
- Create the Component
- Add the Component into ModalKeys  

## Dropdowns
- [DropdownView](./modules/dropdown/DropdownView.js)
- all modals are controlled from a High-level component located in AppNavigator
- Dropdowns have a z-index of 3 (slightly higher than Modals)
- everything works exactly like ModalView

### Features (or bugs?)
- When a dropdown is being shown, the screen "below" the dropdowns will not receive any pointer events. This is done through the "drop-down-pause" which covers the enter screen, and closes all dropdowns when it is clicked. This is ideal behavior, taken from Notion.
- Dropdowns lead to other dropdowns through DropParent. DropParent creates a serial number (key) on the first render which allows it to know if it is currently the source of any other Dropdowns. This serial number is passed to a list of serial numbers, passed as a prop to any higher Dropdowns.

## Firebase Architecture
- Firebase is treated as the source of truth, which means redux state is being refreshed based on firebase listeners.
- Updates go in one direction => dispatch action => diffs (with respect to redux state) => firebase => listener => redux

### dev
- keyed by projectKey, this is where all the game development happens for Desktop application

### projectsLive
- contains all projects that have been published to live servers, which allows for people to play them.

### projectUsers
- keyed by projectKey, this is where details of the project users can be found
- [AuthWrapper](./modules/auth/AuthWrapper.js) also starts listening to userProjects when the user has been confirmed.

### rooms
- all current live games being played

### userProjects
- keyed by UID, set to 'true' if user is listening to this project
- [AuthWrapper](./modules/auth/AuthWrapper.js) also starts listening to userProjects when the user has been confirmed.

### users
- personal user info, as well as if the user is in a lobby/game if they are using the mobile web-app.

## LogicEngine

## parseType
- [parseType](./modules/logic/types.js)
- A variable item can only have 1 parse type, but can hold / reference other variable items that have different parse types. This type simply indicates how the pseudo should be translated into real code, and which front-end patterns to show.
- [LogicPanels](./modules/logic/components/LogicPanels.js)
- [generateLogic](./modules/logic/codetool.js)
- the types do NOT indicate the actual variable type, but are more closely related to how you would translate the code if you had to speak in english (not javascript!). For example, a constant can be a string, such as "VALID". However, it may not require parse type of string because it is a simple constant. A string consists of multiple parts, contained in state by {byId, byIndex}.
- special types are used in hard-coded situations. For example, "update" acts very similarly to "variable", but will wrap the final code with "next.update[]", and it will string together the variable with "/" instead of "." if you had the variable `foo.bar`, "update" would want to translate it to `foo/bar`.

### normal types
- boolean
- constant
- string
- number
- variable

### special types
- wrapper
- collection
- object
- declare
- function
- operation
- update

## Logic Library
- more complex logic can be found below
- [featureNextPlayer](./modules/logic/packets/featureNextPlayer.js)

### Majority
- (x - x%2)/2 + 1

### Get random player
- get playerCount
- get random number from 1 - playerCount
- set counter = 1, and target (undeclared uid)
- loop through players while incrementing counter, if counter is equal to random number, set target to current player