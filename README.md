# DSolver

The code for the DSolver.   
DSolver is a websites that solves common Discrete-Structure-Alogrithms for the user. 

### Disclaimer
We have created everything to the best of our knowledge and belief, but of course we can not exclude errors. Therefore we can't give any guarantee for any results. Please let us know via the feedback form or Github Issues when you find any errors or bugs. 
The information from the lecture notes or from the tutorial instructor always takes precedence.

The purpose of this page is to provide sample solutions to make learning easier. It does not replace dealing with the material, e.g. doing the EEA by yourself. The point of DS is not to memorize algorithms, e.g. to execute the EEA perfectly, because it is quite trivial to automate it (we managed to do it), but to understand how and WHY these algorithms work.




# Development 

### Host locally
    1) cd to src directory
    2) `yarn install`
    3) `yarn run start`


### Project structure 
    src/index.js
        -> heart of app, DO NOT CHANGE 

    src/routes.js
        -> router of the application 
        -> connecting urls to the components
        -> responsible for sidebar, routes and homepage

    components
        -> folder containing all components
        -> for new components create new file/folder 
        -> export the new component in the index.js file 

    main.less
        -> theme variables of the application
    
    index.css 
        -> overall stylings to the application
        -> free to change 


### How to add page?
    1) create new component 
    2) make a screenshot of this component, and save the image in src/images
    3) at routes.js create a new object for the array, fill in the keys and done
    New component has been added



