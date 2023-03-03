# Getting started 



### How to setup 
    1) cd to src directory
    2) `yarn install`
    3) `yarn run start`


### How it works? 
    src/index.js
        -> heart of app, DO NOT CHANGE 

    src/App.js
        -> router of the application 
        -> connecting urls to the components

    components
        -> folder containing all components
        -> for new components create new file/folder 
        -> export the new component in the index.js file 

    main.less
        -> theme variables of the application
        -> DO NOT CHANGE 
    
    index.css 
        -> overall stylings to the application
        -> flexible to change 


### How to add page?
    1) create component inside the components folder
    2) export component in components/index.js 
    3) add page into the router, App.js, hold into current design 
    4) add menu item in the custom layout (let the main branch do this preferrably)



