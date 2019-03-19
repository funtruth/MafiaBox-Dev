#Architecture
- Basic documentation on database nodes

##users
```javascript
users
    {uid}
        uid
        firstName
        lastName
        email
        photoUrl
```

##projects
```javascript
projects
    {projectKey}
        projectKey
        title
        description
        members
            {uid}
                uid
                type
                permissions
                acceptedInvite
```

##userProjects
```javascript
userProjects
    {uid}
        {projectKey}: <boolean>
```