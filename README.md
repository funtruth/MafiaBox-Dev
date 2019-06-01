# Activity log
- Unchecked items are moved over to day of completion

## 06/01/2019
### Major
- [x] remove mathType & DEFAULT_ASSIGN, fully replace with parse implementation

### Minor
- [ ] figuring out how to pass props properly through LogicParse
- [ ] Declared variables no longer store their state in the logicItem, but at the top-level of the Logic itself. Therefore, a check needs to take place when deleting logicItems.
- [x] parseType.number implementation
- [x] update order of operations for logic engine

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