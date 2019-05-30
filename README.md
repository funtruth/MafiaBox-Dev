# Activity log

## 05/30/2019
### Major
- [x] NumberView works for if/elseif
- [x] StringView major refactor

### Minor
- [x] PageReducer.updateGeneral should be updated to receive ~~an array of objects~~ a infinite list of objects, so that multiple updates can reliably be sent to firebase at once. This also allows us to update using different paths.
- [ ] comparisons can probably be done using the same architecture as math operations are using. This would allow for updateType.operation instead of the messy equation that currently exists for if/elseif logic
- [ ] spend some time looking at parseType implementation (along with the above comparison suggestion).
- [x] variables should be handled at the top level (logicItem.~~varScopes~~ vars), instead of the current method which assigns objects together in a mutable style. This also allows us to access variables from any location, instead of passing an object of variables to the new Modal/Dropdown. When a variable is declared, it can simply be given a key. Each LogicBlock must keep track of it's path, so we can easily tell if variables belong to it's scope.
- [x] childKeys should be changed to byIndex for consistency
- [x] logicItems should be stored in byId for consistency
- [x] allow DropParent to be fully functional without taking props from it's parent. This allows the props for dropdown's to be more transparent, as the DropParent will no longer need showDropdown and serialList. implemented a serialParent param to pass to Dropdown Reducer in order to accomplish this. Also changed dropdownType to dropdown to be consistent with DropClick.
- [ ] Showing declared variables. May have to revert the removal of the "static" property of VAR_DEFAULT.