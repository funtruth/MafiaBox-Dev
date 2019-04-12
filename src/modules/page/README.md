# PageReducer Architecture
- Documentation for the PageReducer
- Decided not to use completely normalized structure (recommended by Redux), but to normalize the indexes of the pages. This is pretty much the equivalent of having an open "library" of pages, but always knowing the order.
- This was previously done through an "index" property, but needed to constantly be resorted. This causes changes in the Realtime Database too frequently. For example, if I move an object to the top of the list, every item between the start and end index has their index impacted, resulting in gabillion firebase updates. This would also trigger the listeners. Let's not be triggered.

## PageRepo
- all page information is stored in one area, this makes it easier to listen to child events with firebase ('child_changed')
```javascript
pageRepo
    [pageKey]: {},
    [pageKey]: {}...
```

## PageMap
- ordering information based on the storyKey (column), makes sure we can always sort the pages
```javascript
pageMap
    [storyKey]: [pageKey, pageKey...],
    [storyKey]: [pageKey, pageKey...]...
```

## StoryRepo
```javascript
storyRepo
    [storyKey]: {},
    [storyKey]: {}...
```

## StoryMap
```javascript
storyMap
    [boardType]: [storyKey, storyKey...],
    [boardType]: [storyKey, storyKey...]...
```

## FieldRepo
```javascript
fieldRepo
    [fieldKey]: {},
    [fieldKey]: {}...
```

## FieldMap
```javascript
fieldMap
    [boardType]: [fieldKey, fieldKey...],
    [boardType]: [fieldKey, fieldKey...]...
```