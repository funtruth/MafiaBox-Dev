# LogicView
- LogicView is a convenient way to bring the Logic Component anywhere in the application
- it's only requirement is an array of strings leading to it's location in redux

# Standard Props of LogicItem
- See DEFAULT_LOGIC in defaults.js

# Functionality
- this section describes the functionality which should be tested when making changes

## Basic
### Picking Logic Type
- user clicks on LogicType or empty LogicPanel to show PickLogic
- user selects logic type
- logic item is set to DEFAULT_ITEM, with logicType set to selected type
### Picking Operator Type (Logic sub-type)
- user clicks on LogicType or empty LogicPanel to show PickLogic
- user hovers DropParent of logicType to show PickOperator
- user selects operator type
- logic item is set to DEFAULT_ITEM, with operatorType set to selected type
- operator type adds a DEFAULT_ITEM to the .right direction
### Adding Logic Item Below
- user clicks on LogicAddBelow
- logic item .down property is set to DEFAULT_ITEM, with .down property of logic item
### Deleting Logic Item
- user clicks on close button from LogicOptions
- Item checks if delete is appropriate (cannot delete logic inside an operator unless there is .down)
- logic item is replaced by the logic item's .down property

## IF, ELSEIF Operators
### Picking the Comparison
- user clicks on the middle LogicPanel in the group of 3 LogicPanels to show PickComparison
- user selects comparison type
- logic item -> data -> comparison, is set to comparison type
### Picking a Variable
- user clicks on the left or right LogicPanel in the group of 3 LogicPanels to show PickVar
- user finds their variable
- variable is stored using LOGIC_ITEM_VAR format in dropdown/types

## ELSE Operator
- not much going on here, user cannot apply logic to an else operator

## FOR IN Operator
### Picking the UID Object
- user clicks on the LogicPanel to show PickUidObject
- user selects a uid object from the list
- logic item -> data
- new uid is declared and can be used inside the loop

## VARIABLE Logic
### Declaring a new variable
- user clicks on the LogicPanel to show DeclareVar
- user types in new variable name
- user hits enter or presses save button
- logic item -> data -> variableName
### Modifying a declared variable type
TODO
### Assigning a value to a new variable
TODO
### Assigning a variable to a new value
TODO

## FUNCTION Logic
TODO

## UPDATE Logic
TODO

## RETURN Logic
## Picking the Return Type
- user clicks on the LogicPanel to show EditToast