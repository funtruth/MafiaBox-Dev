#Dropdown Documentation

##General Rules (* => required fields)
1. Dropdowns are triggered by elements at the global level (attached to AppWrapper)
2. In order to trigger a Dropdown, element should have:
- className*: "app-onclick" 
- menu-type*: dropdownType
- app-onclick-props: JSON.strigified Object

##Global Dropdown
- Handled at AppNavigator