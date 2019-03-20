# Deploying functions
firebase deploy --only functions

# Deploying a specific function
firebase deploy --only functions:exportedFunctionName

# Flattening functions
- To compensate for the structure of Firebase, we must flatten data structures
[Best Practices](https://firebase.google.com/docs/database/ios/structure-data)
- This creates potential inconsistencies in data across the Realtime Database
- Flattening functions simply copy & paste data so this does not happen

## Documentation
- Parent is seen as the "source of truth"
- Child is updated when Parent is updated
- Child should not directly be updated

## Flattened paths
| Parent | Child | Function |
| ------------- | ------------- | ----- |
| projects/{projectKey}/members/{uid} | userProjects/{uid}/{projectKey} | onProjectMemberChange |

## Why?
- Updating all points in a single update is a possible solution
[Fan out](https://firebase.googleblog.com/2015/10/client-side-fan-out-for-data-consistency_73.html)
- Architec is built, but not deployed yet