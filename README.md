# maxSumSite_UI

Technical Doc:

Front End: ReactJs 16.13.1 node 10.18.1

Back End: Spring boots 2.3.3

DB: MySql 8.0.21

Github:

Install instructions:
Backend App:

1. Pull docker image from Docker hub:
   docker pull jiachenduan/apple-demo:demo

2. Pull my sql image:
   docker pull mysql:8.0.21

3. Run mysql locally:
   docker run --name localhost -e MYSQL_ROOT_PASSWORD=1234567890 -e MYSQL_DATABASE=AppNewsDb -d mysql:8.0.21

4. Find docker images id
   docker images
5. Run docker container(Please replace "1aeee28fa70e" below with actual container ID on your local )
   docker run --name -d -p 8080:8080 --name 1aeee28fa70e --link localhost:mysql jiachenduan/apple-demo:demo

Frontend App:

1. Pull docker image from Docker hub:
   docker pull jiachenduan/apple-demo-ui:demo

2. Run docker container
   docker run -it -v \${PWD}:/app -v /app/node_modules -p 3000:3000 jiachenduan/apple-demo-ui:demo

Test Flow:

1. sign up the website by providing email/password after logging in, it will launch maxSum calculation page
2. if already have an account, you can chose sign in directly.
3. Pass a preorder serialized binary tree string to calculate maxSum

```
              Tree1:
                               1
                          2         3
                             5    6   7
                           1

              Input 1: "1,2,#,5,1,#,#,#,3,6,#,#,7,#,#" (maxSum: 1->2->5->1)
              MaxSum: 9
              Tree2:
                                1
                          2         6
                             5    9     7
                           2        1

              Input 2: "1,2,#,5,2,#,#,#,6,9,#,1,#,#,7,#,#" (maxSum path: 1->6->9->1)
              MaxSum: 17

              Tree 3:
                           1
                       3        3
                   5    8  6      7
                        1

              Input 3: "1,3,5,#,#,8,1,#,#,#,3,6,#,#,7,#,#"  (maxSum: 1-> 3 -> 8 ->1)
              MaxSum: 13
```

Frontend HIGHLIGHTS:

1. React router
2. Responsive Web Design
3. Performance optimizations with useCallback,etc.s
4. Handle user authentication in modern React Applications with context and hooks.

Backend HIGHLIGHTS:

1. The App is implemented with Jwt token based authentication. Token expiration time is 24 hours
2. Added cache on masSum service, when a user query with the same serialized tree, api will return cached results.
3. Added customized GlobalExceptionHandler for Exception
   NOTES:
4. When input serialized binary tree is too big, we can implement multipart/form-data to upload serialized tree data.
```
Frontend Project structure: 
- index.js: Entry point for app 
- App.js: Route Matchers 
- AppProviders.js: Taking a branch higher up in the tree of app simplifies the maintenance authentication of app 
- AuthProvider.js: A provider for app's authentication 
- UserProvider.js: The component which has the user data prevents the rest of the app from being rendered until the user data is retrieved - AuthenticatedApp.js : Main App (Calculation) UI - UnauthenticatedApp.js : Login/Signup UI

Backend Project structure:
Under com.example.demo 
- exception: contains customized exception handler 
- filter: contains jwt request filter 
- models: contains all models 
- repository: contains user repository 
- service: auth user services 
- utils: contains jwt utils and utils that does binary tree parsing and maxsum calculation. 
- DemoApplication: contains the main class 
- DemoController: contains the api end points 
- SecurityConfigure: has the configs for spring security
```
