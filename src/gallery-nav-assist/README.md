gallery-nav-assist
==================


Introduction
--------------------
<p>
Gallery-nav-assist is a yui gallery module and a library to facilitate navigation on any given HTML page (with javascript enabled)
using just the keyboard. This is especially useful for moving through search
results on a web site without having to use the mouse.
</p>


Purpose of this library
-----------------------
<p> Sometime back I had a conversation with accessibility manager at yahoo who wanted to use a web page. As I watched him use the Web page he  expressed concerns about not being able to navigate through different parts of the page fast. Typically blind users use tab key on keyboard to navigate thorugh links and use screen readers to understand the context of a block they are in.
</p>
<p>
    That left me with writing this library where an application developer can make a web page 'more' accessible via this library and help users navigate through parts of the page easily by using common navigation keys like arrow up, arrow down etc.
</p>

List of commands to use when gallery-nav-assist is already used on the page
--------------------------------------------------------------------------
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


<pre>
    This is a preformatted block useful for ascii art
</pre>

<!-- make sure the CSS for this library is included in the below path -->
<!-- make sure the gallery module is included by pointing it to the right production url-->

**Lets dive directly into an Example on how to use the library on any given web page**


**HTML MARKUP**
<!doctype html>
<html>
    <head>
        <title>gallery-nav-assist</title>

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
            <hr>
            <div id="header">
                <h2>Lorem Ipsum</h2>
                <h2>Lorem Ipsum</h2>
            </div>
            <hr>
            <div id="eastrail">
                <h2 id="elem1"><a style="display:block;" href="http://www.yahoo.com/">Lorem Ipsum</a></h2>
                <h2 id="elem2"><a style="display:block;" href="http://www.yahoo.com/">Lorem Ipsum</a></h2>
            </div>
            <hr>
            <hr>
            <div id="navtabs">
                <div>tab1</div>
                <div>tab2</div>
            </div>
            <hr>
        </div>
        <script src="http://yui.yahooapis.com/3.12.0/build/yui/yui-debug.js"></script>
        <script src="../../../../build/gallery-nav-assist/gallery-nav-assist-debug.js"></script>
    </body>
</html>

```

**Lets make the above page navigable**
**Javascript**

```javascript
<script>
    YUI().use('gallery-nav-assist', 'node-event-simulate', function(Y) {
        var nav = new Y.NAVASSIST({
                styleContainer: true,
                debug: true,
                registry: [
                {
                    node: '#eastrail',
                    rank: 2
                },
                {
                    node: '#header',
                    rank: 1
                },
                {
                    node: '#sidebar',
                    rank: 3
                },
                {
                    node: '#navtabs',
                    rank: 4,
                    isHorizontal: true
                },
                {
                    node: '#tabs',
                    rank: 5
                }
                ],
                ignore: ['#testinputbox']
            });
</script>

```

