# ModalView
- all modals are controlled from a High-level component located in AppNavigator
- Modals have a z-index of 2 (slightly lower than Dropdowns)

# Adding a Modal
- Add a new type to modal/types.js
- Create the Component
- Add the Component to ModalView corresponding to the type

# Assumptions
- Modals do not immediately change information in state.page, apart from main PageViews
- Instead, they store changes in props.attach, which can then be saved if the user chooses
- To trigger a save dialog, simply wrap a Component with ModalCheckSave. If it is changing information through props.attach, it will prompt for saves automatically.