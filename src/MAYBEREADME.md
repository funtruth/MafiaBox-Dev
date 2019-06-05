# Why Maybe?
- I started making a lot of README's among the module folders but due to the need to develop fast and change things 24/7 I wasn't able to actually update them all when I made changes. MAYBEREADME and the root level README are the only reliable sources of information. If it's not here, sorry!

## Modals
- all modals are controlled from a High-level component located in AppNavigator
- Modals have a z-index of 2 (slightly lower than Dropdowns)

### Adding a Modal
- Add a new type to modal/types.js
- Create the Component
- Add the Component to ModalView corresponding to the type

## Firebase ARCHI

### dev
- keyed by projectKey, this is where all the game development happens for Desktop application

### projects
- keyed by projectKey, this is where project details can be found

### userProjects<UIDObject>
- keyed by UID, set to 'true' if user is listening to this project