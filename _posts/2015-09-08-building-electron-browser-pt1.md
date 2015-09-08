---
layout: post
title: Writing a Browser UI, for Electron, with React. (1/4)
desc: Speccing the UI components.
---

Recently, I was convinced that React can help me write more correct UI code.
To dive into it, I thought it'd be fun to write a browser chrome for Electron.

![screenshot](/img/building-electron-browser-pt1/screenshot.png)

[You can find the code on GitHub.](https://github.com/pfraze/electron-browser)

## Todo

On my todo list...

- Navbar
  - Navigation Btns: Home, Back, Forward, Refresh
  - Location Bar
- Page Tabs
- Page View
  - Content webview
  - Page-search
  - Context menu
  - Status bar, driven by hover-state


## Getting Started: Speccing the UI components.

Tonight, I want to get all of the components specced.
I have Electron opening this file:

`browser.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="./react.js"></script>
    <script src="./JSXTransformer.js"></script>
  </head>
  <body>
    <div id="content"></div>
    <script type="text/jsx" src="./browser-tabs.jsx"></script>
    <script type="text/jsx" src="./browser-navbar.jsx"></script>
    <script type="text/jsx" src="./browser-page.jsx"></script>
    <script type="text/jsx" src="./browser.jsx"></script>
  </body>
</html>
```

And here are the scripts:

`browser-tabs.jsx`

```js
var BrowserTab = React.createClass({
  render: function () {
    return <span>{this.props.isActive ? '/ tab \\' : ' tab '}</span>
  }
})

var BrowserTabs = React.createClass({
  render: function () {
    var tabs = this
    return <div id="browser-tabs">
      {this.props.pages.map(function (page, i) {
        return <BrowserTab key={'browser-tab-'+i} isActive={tabs.props.currentPageIndex == i} />
      })}
    </div>
  }  
})
```

`browser-navbar.jsx`

```js
var BrowserNavbar = React.createClass({
  render: function() {
    return <div>navbar</div>
  }  
})
```

`browser-page.jsx`

```js
var BrowserPage = React.createClass({
  render: function() {
    return <div>page</div>
  }  
})
```

`browser.jsx`

```js
var Browser = React.createClass({
  getInitialState: function () {
    return {
      pages: ['a', 'b', 'c'],
      currentPageIndex: 0
    }
  },
  render: function() {
    return <div>
      <BrowserTabs ref="tabs" pages={this.state.pages} currentPageIndex={this.state.currentPageIndex} />
      <BrowserNavbar ref="navbar" />
      <BrowserPage ref="page" />
    </div>
  }
})

// render
React.render(
  <Browser />,
  document.getElementById('content')
);
```

![screen shot 2015-08-27 at 10 07 55 pm](/img/building-electron-browser-pt1/Screen Shot 2015-08-27 at 10.07.55 PM.png)

Most of our state is going to live in the `Browser` component.
That state will filter down into the sub-components as `props`, as you can see in the `BrowserTabs`.

If I call `this.setState({ currentPageIndex: 1 })` from inside the `Browser` component, then React re-renders the tabs.

I'm curious, though, whether all the tabs would re-render, or just the tabs with a changed `state` or `props`?
To test that, I made a few changes:

`browser.jsx`

```js
/*var Browser = React.createClass({
  getInitialState: function () {
    return {
      pages: ['a', 'b', 'c'],
      currentPageIndex: 0
    }
  },*/

  // every second, cycle through the tabs:
  componentDidMount: function () {
    var self = this
    setInterval(function () {
      var i = self.state.currentPageIndex + 1
      if (i > 2) i = 0
      self.setState({ currentPageIndex: i })
    }, 1e3)
  },

  /*render: function() {
    return <div>
      <BrowserTabs ref="tabs" pages={this.state.pages} currentPageIndex={this.state.currentPageIndex} />
      <BrowserNavbar ref="navbar" />
      <BrowserPage ref="page" />
    </div>
  }
})*/
```

`browser-tabs.jsx`

```js
/*var BrowserTab = React.createClass({
  render: function () {*/
    // render a timestamp as the tab text
    var d = Date.now()
    return <span>{this.props.isActive ? '/ '+d+' \\' : ' '+d+' '}</span>
  /*}
})*/
```

![tabs-animation](/img/building-electron-browser-pt1/tabs-animation.gif)

All three tabs are re-rendered.
Hm.
Is that right?
React should be able to know not to render a component that isnt affected.

I asked my friend [John](https://twitter.com/johndotawesome) what was going on.
He explained, if the `render()` call returns an unchanged component, React will not update the DOM.
By returning timestamps, I'm giving React something to new to render.

So, React's smarter than I thought.
It doesn't update the DOM when `state` or `props` change - it updates it when `render()` returns something different.
That's what React's Virtual DOM does.

Now, let's spec out some of the navbar.

`browser-navbar.jsx`

```js
var BrowserNavbarBtn = React.createClass({
  shouldComponentUpdate: function () {
    return false
  },
  render: function() {
    return <a title={this.props.title} onClick={this.props.onClick}>{this.props.title}</a>
  }
})

var BrowserNavbarLocation = React.createClass({
  shouldComponentUpdate: function () {
    return false
  },
  onKeyDown: function (e) {
    if (e.keyCode == 13)
      this.props.onEnterLocation(e.target.value)
  },
  render: function() {
    return <input type="text" onKeyDown={this.onKeyDown} />
  }
})

/*var BrowserNavbar = React.createClass({
  shouldComponentUpdate: function () {
    return false
  },*/
  render: function() {
    return <div id="browser-navbar">
      <BrowserNavbarBtn title="Home" onClick={this.props.onClickHome} />
      <BrowserNavbarBtn title="Back" onClick={this.props.onClickBack} />
      <BrowserNavbarBtn title="Forward" onClick={this.props.onClickForward} />
      <BrowserNavbarBtn title="Refresh" onClick={this.props.onClickRefresh} />
      <BrowserNavbarLocation onEnterLocation={this.props.onEnterLocation} />
      <BrowserNavbarBtn title="Network Sync" onClick={this.props.onClickSync} />
    </div>
  }
/*})*/
```

All of the event-handlers gave me an opportunity to try out JSX's splat operator in `Browser`:

`browser.jsx`

```js
/*var Browser = React.createClass({*/
  componentWillMount: function () {
    // bind the nav-handlers to this object
    for (var k in this.navHandlers)
      this.navHandlers[k] = this.navHandlers[k].bind(this)
  },
  /*getInitialState: function () {
    return {
      pages: ['a', 'b', 'c'],
      currentPageIndex: 0
    }
  },*/
  navHandlers: {
    onClickHome: console.log.bind(console, 'home'),
    onClickBack: console.log.bind(console, 'back'),
    onClickForward: console.log.bind(console, 'forward'),
    onClickRefresh: console.log.bind(console, 'refresh'),
    onClickSync: console.log.bind(console, 'sync'),
    onEnterLocation: console.log.bind(console, 'location')
  },
  /*render: function() {
    return <div>
      <BrowserTabs ref="tabs" pages={this.state.pages} currentPageIndex={this.state.currentPageIndex} />*/
      <BrowserNavbar ref="navbar" {...this.navHandlers} />
      /*<BrowserPage ref="page" />
    </div>
  }
})*/
```

![screen shot 2015-08-27 at 11 01 52 pm](/img/building-electron-browser-pt1/Screen Shot 2015-08-27 at 11.01.52 PM.png)

Ok, not much to complain about there.
The navbar events are making their way up to the main browser component, where they'll be able to update state, and/or manipulate the subcomponents it needs.

Let's hit the page component.

`browser-page.jsx`

```js
var BrowserPageSearch = React.createClass({
  shouldComponentUpdate: function (nextProps, nextState) {
    return (this.props.isActive != nextProps.isActive)
  },
  render: function () {
    return <div id="browser-page-search" className={this.props.isActive ? 'visible' : 'hidden'}>
      <input type="text" placeholder="Search..." />
    </div>
  }
})

var BrowserPageStatus = React.createClass({
  shouldComponentUpdate: function (nextProps, nextState) {
    return (this.props.status != nextProps.status)
  },
  render: function () {
    return <div id="browser-page-status" className={this.props.status ? 'visible' : 'hidden'}>{this.props.status}</div>
  }
})

var BrowserPage = React.createClass({
  shouldComponentUpdate: function () {
    return false
  },
  render: function () {
    return <div id="browser-page">
      <BrowserPageSearch isActive={false} />
      <webview src="data:text/plain,webview" />
      <BrowserPageStatus status="status line goes here" />
    </div>
  }  
})
```

![screen shot 2015-08-27 at 11 18 45 pm](/img/building-electron-browser-pt1/Screen Shot 2015-08-27 at 11.18.45 PM.png)

The `<webview>` element is added by Electron.
It behaves mostly like an iframe, but it runs in a separate process from the containing element, and it has additional APIs.
We'll work with it more, later.

Also, note how React uses `className` instead of `class`.
That must be to avoid colliding with the `class` keyword in ES6.


## Commit

```
git commit -m "spec browser ui components"
```

Ok, we have our components specced, and the foundation of UI is laid.
There's not much to it yet, but tomorrow I'll add styles, and start connecting the navbar to the page's webview.

Cheers.
[-pfraze](https://twitter.com/pfrazee)