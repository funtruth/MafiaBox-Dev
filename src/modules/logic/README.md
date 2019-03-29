# LogicBoard
- Logic board is a convenient way to bring the Logic Component anywhere in the application
- However, it has a lot of requirements that should be passed in at the parent level
    - value
    - ...

# Standard Props of LogicItem
- data is set as a string be default for firebase storage

- data: ""
- down: ""
- logicType: ""
- operatorType: ""
- right: ""
- updateViewType: ""

## Needs to be added
- collapsed: false

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

## ELSE Operator
- not much going on here, user cannot apply logic to an else operator

## FOR IN Operator
### Picking the UID Object
- user clicks on the LogicPanel to show PickUidObject
- user selects a uid object from the list
- logic item -> data
- new uid is declared and can be used inside the loop

## VARIABLE Logic

## FUNCTION Logic

## UPDATE Logic

## RETURN Logic
## Picking the Return Type
- user clicks on the LogicPanel to show PickReturnType
- user selects a toast type from the list
- preset options generate key
- toaster generates string
- logic item -> data -> key, string