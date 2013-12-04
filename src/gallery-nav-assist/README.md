gallery-nav-assist
==================

Links
-----

  * <a name="Introduction" href="#introduction">Introduction</a>
  * <a name="Introduction" href="#purpose-of-this-library">Purpose</a>
  * <a href="#list-of-commands-to-remember-to-use-this-library">List of Keyboard commands</a>
  * <a href="#example-markup">example markup</a>
  * <a href="#example-javascript">example javascript</a>
    1. <a href="#example-of-manual-container-registeration">example for manual registeration of container</a>
    2. <a href="##example-of-container-deregisteration">example for deregisteration of container</a>
  * <a href="#frequently-asked-questions">FAQS</a>

## Introduction

<p>
Gallery-nav-assist is a yui gallery module and a library to facilitate navigation on any given HTML page (with javascript enabled)
using just the keyboard. This is especially useful for moving through search
results on a web site without having to use the mouse.
</p>


## Purpose of this library

<p> Sometime back I had a conversation with accessibility manager at yahoo who wanted to use a web page. As I watched him use the Web page he  expressed concerns about not being able to navigate through different parts of the page fast. Typically blind users use tab key on keyboard to navigate thorugh links and use screen readers to understand the context of a block they are in.
</p>
<p>
    That left me with writing this library where an application developer can make a web page 'more' accessible via this library and help users navigate through parts of the page easily by using common navigation keys like arrow up, arrow down etc.
</p>

## List of commands to remember to use this library

<table>
  <tr>
    <th>KEY COMBINATION</th><th>ACTION</th>
  </tr>
  <tr>
    <td>Shift + e</td><td>Enable container navigation</td>
  </tr>
  <tr>
    <td>Shift + d</td><td>Disable All navigation</td>
  </tr>
  <tr>
    <td>Shift + → <p>Shift + (Arrow-right)</p></td><td>Navigate to next container</td>
  </tr>
  <tr>
    <td>Shift + ← <p>Shift + (Arrow-Left)</p></td><td>Navigate to previous container</td>
  </tr>
  <tr>
    <td> ↓ (Arrow-Down)</td><td>Navigate to next child element within a selected container</td>
  </tr>
  <tr>
    <td> ↑ (Arrow-Up)</td><td>Navigate to previous child element within a selected container</td>
  </tr>
  <tr>
    <td>→ (Arrow-right)</td><td>Navigate to next child element within a selected container with Horizontal Elements eg: Tabs</td>
  </tr>
  <tr>
    <td>← (Arrow-Left)</td><td>Navigate to previous child element within a selected container with Horizontal Elements eg: Tabs</td>
  </tr>
</table>


## Example Markup

     <html>
    <head>
        <title>gallery-nav-assist</title>
        <!-- make sure to include the library's css -->
        <link href='../../../../build/gallery-nav-assist/gallery-nav-assist.css' rel='stylesheet' type='text/css'>
        <style type="text/css">
        #navtabs div {display: inline-block; margin-left:20px; padding:10px; border:1px solid #efefef;}
        </style>
    </head>
     <body>
         <div id="demo-page">
             <div id="tabs">
                 <div><a href="#Tab1" id="tab1">Lorem Ipsum</a></div>
                 <input type="text" id="testinputbox"/>
             </div>
             <div id="header">
                 <ul>
                     <li>
                         <h2>Lorem Ipsum</h2>
                     </li>
                     <li>
                         <h2>Lorem Ipsum</h2>
                     </li>
                 </ul>
             </div>
             <div id="eastrail">
                 <h2 id="elem1"><a style="display:block;" href="http://www.yahoo.com/">Lorem Ipsum</a></h2>
                 <h2 id="elem2"><a style="display:block;" href="http://www.yahoo.com/">Lorem Ipsum</a></h2>
             </div>
             <div id="navtabs">
                 <div>tab1</div>
                 <div>tab2</div>
             </div>
         </div>
     <!-- include the yui library -->
     <script src="http://yui.yahooapis.com/3.12.0/build/yui/yui-debug.js"></script>
     <!-- include the gallery from CDN -->
     <script src="../../../../build/gallery-nav-assist/gallery-nav-assist-debug.js"></script>
     </body>
     </html>

Lets make the above page navigable with the following javascript
----------------------------------------------------------------

## Example Javascript

```javascript
    // add this javascript snippet to the above page
    YUI().use('gallery-nav-assist', function(Y) {
        var nav = new Y.NAVASSIST({
            styleContainer: true,
            debug: true,
            registry: [
            {
                node: '#eastrail',//by default all containers are assumed to have vertically navigable nodes
                rank: 2 //specifies the rank of the container to be selected on using (shift + Right/left Arrow)
            },
            {
                node: '#header ul',
                rank: 1
            },
            {
                node: '#tabs',
                rank: 4
            },
            {
                node: '#navtabs',
                isHorizontal: true,//an example of horizontal container with nodes horizontally aligned
                containerStyle: {
                    className: 'custom-highlight'
                }
            }
            ],
            ignore: ['#testinputbox']
        });
```

## What does the code do
    
 * This code basically forms part of the application you want to write.
 * #header, #tabs, #eastrail, #navtabs are the containers registered.
 * Once registered all the First level child elements of the container are navigable
 * Note that you can specify a selector to reach a container for eg: '#header ul' will make all the list items navigable
 * Now use the <a href="#list-of-commands-to-remember-to-use-this-library">Command List</a> to navigate through the page



## Example of manual container registeration

```javascript
    //Example of manual registeration
    nav.register({
        node: '#navtabs',
        isHorizontal: true,//an example of horizontal container with nodes horizontally aligned
        containerStyle: {
            className: 'custom-highlight'
        }
    });
```


## Example of container deregisteration

```javascript
    nav.deRegister({
        node: '#eastrail'
    });
    // after this the eastrail container will no longer be accessible
```
## Frequently asked questions

<h4>
1. What if I have navigable child elements which are horizontally aligned eg: tabs, wont using arrow-up arrow-down key be counter intuitive?
</h4>

<h4>Answer</h4>

<p>Yes. Its intuitive to use arrow-right and arrow-left. So Just register the node the following way</p>

```javascript
    nav.register({
        node: '#navtabs',
        isHorizontal: true,//note this is set and is default false otherwise
    });
```
<p> this will make the child elements navigable via arrow-right and arrow-left keys</p>

<h4>
2. How do I make sure that shift-arrow-right or arrow-right does not tamper with my events for eg: arrow-right when on search box autocompletes a query, how do I disable gallery's events on certain DOM nodes?
</h4>

<h4>Answer</h4>

<p>Yes. You can disable the events for certain nodes via the ignore list during instantiation for eg:</p>

```javascript
        var nav = new Y.NAVASSIST({
            registry: [
            {
                node: '#eastrail',//by default all containers are assumed to have vertically navigable nodes
                rank: 2 //specifies the rank of the container to be selected on using (shift + Right/left Arrow)
            },
            {
                node: '#tabs',
                rank: 4
            }
            ],
            ignore: ['#testinputbox']
            //here the testinputbox is part of '#tabs' container and when it receives focus the regular events of nav-assist wont work
        });
```

<p> Note that the ignore takes an array of *selectors* for eg: </p>

```javascript
 ignore: ['#tabs input', '#elem1']; //will ignore gallery-nav-assist's events when focus is on these containers
```

