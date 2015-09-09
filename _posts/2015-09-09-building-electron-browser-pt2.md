---
layout: post
title: Writing a Browser UI, for Electron, with React. (2/4)
desc: Connecting the page's webview to the navbar, and adding tabs.
---

 - [Part 1](/2015/09/08/building-electron-browser-pt1.html)
 - Part 2

Last night, [I specced the components to the browser's UI](/2015/09/08/building-electron-browser-pt1.html).
Today, I'm going to add styles and begin connecting the page's webview to the navbar.

[You can find the code on GitHub.](https://github.com/pfraze/electron-browser)

## Styles and basic navigation behaviors

![Screen Shot 2015-08-28 at 12.16.55 PM](/img/building-electron-browser-pt2/Screen Shot 2015-08-28 at 12.16.55 PM.png)

This is a simple start.
I won't show all of the CSS, but I will highlight a few newish features.
First, is the flexbox:

```css
#browser-navbar {
  display: flex;
  flex-direction: row;
}

#browser-navbar > input {
  flex: 1;
}
```

I don't know how I lived before flexbox.
It makes layouts *so much easier*!
Here, I've set the location input to fill any available horizontal space.

Second newish feature, gradients:

```css
#browser-navbar {
  background: linear-gradient(to bottom, #eee, #ddd);
}
```

Of course, flat is all the rage now, so `linear-gradient` isn't getting the love it really deserves.
Anybody remember the days of 1px-wide background-img gradients?
I sure don't, because I've chosen to block it out.

In fact, I think we code use them to give a nice shadow effect on inactive tabs:

```css
#browser-tabs > span {
  background: linear-gradient(to bottom, #ddd 90%, #bbb);
}
```

![Screen Shot 2015-08-28 at 12.34.38 PM](/img/building-electron-browser-pt2/Screen Shot 2015-08-28 at 12.34.38 PM.png)

Notice the `90%`, which tells the browser to start the gradient around 90% across the element.

Next... I think I'm going to need some icons if I'm going to keep looking at this thing.
I think I'll use the awesome [Font Awesome](http://fortawesome.github.io/Font-Awesome/).

![Screen Shot 2015-08-28 at 12.52.25 PM](/img/building-electron-browser-pt2/Screen Shot 2015-08-28 at 12.52.25 PM.png)

Hm.
Not as pretty as I'd hoped, but they'll do.
Here's the new code:

```js
/*var BrowserNavbarBtn = React.createClass({
  shouldComponentUpdate: function () {
    return false
  },*/
  render: function() {
    return <a href="#" title={this.props.title} onClick={this.props.onClick}><i className={'fa fa-'+this.props.icon} /></a>
  }
/*})

var BrowserNavbar = React.createClass({
  shouldComponentUpdate: function () {
    return false
  },*/
  render: function() {
    return <div id="browser-navbar">
      <BrowserNavbarBtn title="Home" icon="home fa-lg" onClick={this.props.onClickHome} />
      <BrowserNavbarBtn title="Back" icon="arrow-left" onClick={this.props.onClickBack} />
      <BrowserNavbarBtn title="Forward" icon="arrow-right" onClick={this.props.onClickForward} />
      <BrowserNavbarBtn title="Refresh" icon="refresh" onClick={this.props.onClickRefresh} />
      <BrowserNavbarLocation onEnterLocation={this.props.onEnterLocation} />
      <BrowserNavbarBtn title="Network Sync" icon="cloud-download" onClick={this.props.onClickSync} />
    </div>
  }
/*})*/
```

So, let's connect the webview to that navbar.

```js
var Browser = React.createClass({
  /* ... */
  getWebView: function () {
    return this.refs.page.refs.webview.getDOMNode()
  },
  navHandlers: {
    onClickHome: function () {
      this.getWebView().setAttribute('src', 'data:text/plain,home')
    },
    onClickBack: function () {
      this.getWebView().goBack()
    },
    onClickForward: function () {
      this.getWebView().goForward()
    },
    onClickRefresh: function () {
      this.getWebView().reload()
    },
    onClickSync: console.log.bind(console, 'sync'),
    onEnterLocation: function (location) {
      this.getWebView().setAttribute('src', location)
    }
  },
  /* ... */
})
```

![nav-animation](/img/building-electron-browser-pt2/nav-animation.gif)

This is pretty straight-forward.
I might be breaking good encapsulation practices in `getWebView` by reaching into a sub-component's refs.
We'll see if that's worth changing in the future.

What's missing now is, 1) the webview isn't automatically filling the vertical space, and 2) the UI doesn't reflect the state of the webview.
I've worked with webviews before, so I've got some code to do the sizing.
No biggie.

```js
var BrowserPage = React.createClass({
  /* ... */
  componentDidMount: function () {
    window.addEventListener('resize', resize)
    resize()
  },
  componentWillUnmount: function () {
    window.removeEventListener('resize', resize)    
  },
  /* ... */
})

function resize () {
  var webview = document.querySelector('webview')
  var obj = webview && webview.querySelector('::shadow object')
  if (obj)
    obj.style.height = (window.innerHeight - 61) + 'px' // -61 to adjust for the tabs and navbar regions
}
```

I'll start tracking webview state with the status line.

```js
var BrowserPage = React.createClass({
  /* ... */
  componentDidMount: function () {
    // attach webview events
    for (var k in this.webviewHandlers)
      this.refs.webview.getDOMNode().addEventListener(k, this.webviewHandlers[k].bind(this))
  },
  webviewHandlers: {
    'load-commit': console.log.bind(console, 'load-commit'),
    'did-start-loading': console.log.bind(console, 'did-start-loading'),
    'did-stop-loading': console.log.bind(console, 'did-stop-loading'),
    'did-finish-load': console.log.bind(console, 'did-finish-load'),
    'did-fail-load': console.log.bind(console, 'did-fail-load'),
    'did-get-redirect-request': console.log.bind(console, 'did-get-redirect-request'),
    'dom-ready': console.log.bind(console, 'dom-ready'),
    'page-title-set': console.log.bind(console, 'page-title-set'),
    'close': console.log.bind(console, 'close'),
    'destroyed': console.log.bind(console, 'destroyed')
  },
  /* ... */
})
```

I couldn't find a way for React's `on*` syntax to work, so I manually bound the handlers in `componentDidMount`.
Let's get the status line going:

```js

var BrowserPage = React.createClass({
  getInitialState: function () {
    return {
      statusText: ''
    }
  },
  /* ... */
  webviewHandlers: {
    'did-start-loading': function (e) {
      this.setState({ statusText: 'Loading...' })
    },
    'did-stop-loading': function (e) {
      this.setState({ statusText: false })
    },
    /* ... */
  },
  /*render: function () {
    return <div id="browser-page">
      <BrowserPageSearch isActive={false} />
      <webview ref="webview" src="data:text/plain,webview" />*/
      <BrowserPageStatus status={this.state.statusText} />
    /*</div>
  }*/
})
```

There we go:

![loading-status-anim](/img/building-electron-browser-pt2/loading-status-anim.gif)

Let's get the tab title next.
We'll need that state to percolate up to the `Browser` component, because that's where the `BrowserTabs` component lives.
And that makes me think, the `statusText` state should go up into the `Browser` component as well.

So, let's do that...

```js
var Browser = React.createClass({
  getInitialState: function () {
    return {
      pages: [{
        location: '',
        statusText: false,
        title: false
      }],
      currentPageIndex: 0
    }
  },
  /* ... */
  // move this in from BrowserPage:
  componentDidMount: function () {
    // attach webview events
    for (var k in this.webviewHandlers)
      this.getWebView().addEventListener(k, this.webviewHandlers[k].bind(this))
  },
  webviewHandlers: {
    'did-start-loading': function (e) {
      this.state.pages[this.state.currentPageIndex].statusText = 'Loading...'
      this.setState(this.state)
    },
    'did-stop-loading': function (e) {
      this.state.pages[this.state.currentPageIndex].statusText = false
      this.setState(this.state)
    },
    'page-title-set': function (e) {
      this.state.pages[this.state.currentPageIndex].title = e.title
      this.setState(this.state)
    }
  },
  render: function() {
    return <div>
      <BrowserTabs ref="tabs" pages={this.state.pages} currentPageIndex={this.state.currentPageIndex} />
      <BrowserNavbar ref="navbar" {...this.navHandlers} page={this.state.pages[this.state.currentPageIndex]} />
      <BrowserPage ref="page" page={this.state.pages[this.state.currentPageIndex]} />
    </div>
  }
})
```

Ok then:

![better-loading-anim](/img/building-electron-browser-pt2/better-loading-anim.gif)

Feels like I'm putting more handlers in `Browser` than I'd expect, but I'm going to keep moving with this for now.

Let's toss in a spinner on the tabs:

`browser.jsx`

```js
var Browser = React.createClass({
  getInitialState: function () {
    return {
      pages: [{
        location: '',
        statusText: false,
        title: false,
        isLoading: false
      }],
      currentPageIndex: 0
    }
  },
  webviewHandlers: {
    'did-start-loading': function (e) {
      var page = this.state.pages[this.state.currentPageIndex]
      page.statusText = 'Loading...'
      page.isLoading = true
      page.title = false
      this.setState(this.state)
    },
    'did-stop-loading': function (e) {
      var page = this.state.pages[this.state.currentPageIndex]
      page.statusText = false
      page.location = this.getWebView().getUrl()
      if (!page.title)
        page.title = page.location
      page.isLoading = false
      this.setState(this.state)
    },
  },
  /* ... */
})
```

`browser-tabs.jsx`

```js
var BrowserTab = React.createClass({
  render: function () {
    var title = this.props.page.title || 'loading'
    var tshortened = title
    if (tshortened.length > 15)
      tshortened = tshortened.slice(0, 12) + '...'

    return <span className={this.props.isActive ? 'active' : ''} title={title}>
      {tshortened}
      {this.props.page.isLoading ? <i className="fa fa-spinner fa-pulse" /> : undefined}
    </span>
  }
})
```

![tab-spinner](/img/building-electron-browser-pt2/tab-spinner.gif)

Ok, now I need to get the location input synced with the webview, because it's not getting updated when I click back/forward.
I did the obvious thing first:

`browser-navbar.jsx`

```js
var BrowserNavbarLocation = React.createClass({
  onKeyDown: function (e) {
    if (e.keyCode == 13)
      this.props.onEnterLocation(e.target.value)
  },
  render: function() {
    return <input type="text" onKeyDown={this.onKeyDown} value={this.props.page.location} />
  }
})
```

But this froze the input, which I expected.
After digging into the React docs, I found the right process for two-way binding.
I have to listen to the input's `change` event and update the state with it:

`browser-navbar.js`

```js
/*var BrowserNavbarLocation = React.createClass({
  onKeyDown: function (e) {
    if (e.keyCode == 13)
      this.props.onEnterLocation(e.target.value)
  },*/
  onChange: function (e) {
    this.props.onChangeLocation(e.target.value)
  },
  render: function() {
    return <input type="text" onKeyDown={this.onKeyDown} onChange={this.onChange} value={this.props.page.location} />
  }
/*})

var BrowserNavbar = React.createClass({
  render: function() {
    return <div id="browser-navbar">
      <BrowserNavbarBtn title="Home" icon="home fa-lg" onClick={this.props.onClickHome} />
      <BrowserNavbarBtn title="Back" icon="arrow-left" onClick={this.props.onClickBack} />
      <BrowserNavbarBtn title="Forward" icon="arrow-right" onClick={this.props.onClickForward} />
      <BrowserNavbarBtn title="Refresh" icon="refresh" onClick={this.props.onClickRefresh} />*/
      <BrowserNavbarLocation onEnterLocation={this.props.onEnterLocation} onChangeLocation={this.props.onChangeLocation} page={this.props.page} />
      /*<BrowserNavbarBtn title="Network Sync" icon="cloud-download" onClick={this.props.onClickSync} />
    </div>
  }
})*/
```

`browser.jsx`

```js

var Browser = React.createClass({
  /* ... */
  navHandlers: {
  /* ... */
    onChangeLocation: function (location) {
      var page = this.state.pages[this.state.currentPageIndex]
      page.location = location
      this.setState(this.state)      
    }
  },
  /* ... */
})
```

And we're in business:

![location-updates](/img/building-electron-browser-pt2/location-updates.gif)

## Commit

```
git commit -m "add browser ui styles and basic navigation behaviors"
```
<br>

## Tabs

Tabs should be simple enough.
I'll need to keep the webviews alive when a tab is not visible.
So, there should be one `BrowserPage` per tab, and the hidden pages should continue to exist, but have `display: none` set.

Earlier, I put the `webview` event handlers on the `Browser` component.
That doesn't work well for this, because there are now more than one webviews.
So, I'm going to handle those events in `BrowserPage`, and re-emit those events so that `Browser` can handle them via React's attributes.

`browser-page.jsx`

```js
var BrowserPage = React.createClass({
  componentDidMount: function () {
    /* ... */

    // attach webview events
    for (var k in webviewEvents)
      this.refs.webview.getDOMNode().addEventListener(k, webviewHandler(this, webviewEvents[k]))
  },
  /* ... */
})

function webviewHandler (self, fnName) {
  return function (e) {
    console.log(fnName, e)
    if (self.props[fnName])
      self.props[fnName](e, self.props.page)
  }
}

var webviewEvents = {
  'load-commit': 'onLoadCommit',
  'did-start-loading': 'onDidStartLoading',
  'did-stop-loading': 'onDidStopLoading',
  'did-finish-load': 'onDidFinishLoading',
  'did-fail-load': 'onDidFailLoad',
  'did-get-redirect-request': 'onDidGetRedirectRequest',
  'dom-ready': 'onDomReady',
  'page-title-set': 'onPageTitleSet',
  'close': 'onClose',
  'destroyed': 'onDestroyed'
}
```

`browser.jsx`

```js
var Browser = React.createClass({
  /* ... */
  pageHandlers: {
    onDidStartLoading: function (e) {
      /* ... */
    },
    onDidStopLoading: function (e) {
      /* ... */
    },
    onPageTitleSet: function (e) {
      /* ... */
    }
  },
  /*render: function() {
    var self = this
    return <div>
      <BrowserTabs ref="tabs" pages={this.state.pages} currentPageIndex={this.state.currentPageIndex} />
      <BrowserNavbar ref="navbar" {...this.navHandlers} page={this.state.pages[this.state.currentPageIndex]} />*/
      {this.state.pages.map(function (page, i) {
        return <BrowserPage ref={'page-'+i} key={'page-'+i} {...self.pageHandlers} page={page} isActive={i == self.state.currentPageIndex} />
      })}
    /*</div>
  }
})*/
```

Ok, with that going, we can get click-handling on the tabs:

`browser-tabs.jsx`

```js
/*var BrowserTab = React.createClass({
  render: function () {
    ... */
    return <span className={this.props.isActive ? 'active' : ''} title={title} onClick={this.props.onClick}>
      /*{tshortened}
      {this.props.page.isLoading ? <i className="fa fa-spinner fa-pulse" /> : undefined}
    </span>
  }
})

var BrowserTabs = React.createClass({
  render: function () {
    var self = this
    return <div id="browser-tabs">
      {this.props.pages.map(function (page, i) {*/
        var onClick
        if (self.props.onTabClick)
          onClick = function (e) { self.props.onTabClick(e, page, i) }
        return <BrowserTab key={'browser-tab-'+i} isActive={self.props.currentPageIndex == i} page={page} onClick={onClick} />
      /*})}
    </div>
  }  
})*/
```

`browser.jsx`

```js
var Browser = React.createClass({
  /* ... */
  onTabClick: function (e, page, pageIndex) {
    this.setState({ currentPageIndex: pageIndex })
  },
  render: function() {
    var self = this
    return <div>
      <BrowserTabs ref="tabs" pages={this.state.pages} currentPageIndex={this.state.currentPageIndex} onTabClick={this.onTabClick} />
      <BrowserNavbar ref="navbar" {...this.navHandlers} page={this.state.pages[this.state.currentPageIndex]} />
      {this.state.pages.map(function (page, i) {
        return <BrowserPage ref={'page-'+i} key={'page-'+i} {...self.pageHandlers} page={page} isActive={i == self.state.currentPageIndex} />
      })}
    </div>
  }
})
```

![tab-selection](/img/building-electron-browser-pt2/tab-selection.gif)

Now let's get the close button in there...

`browser-tabs.jsx`

```js
/*var BrowserTab = React.createClass({
  render: function () {
    ...
    return <div className={this.props.isActive ? 'active' : ''} title={title} onClick={this.props.onClick}>
      <span>
        {tshortened}
        {this.props.page.isLoading ? <i className="fa fa-spinner fa-pulse" /> : undefined}
      </span>*/
      <a onClick={this.props.onClose}><i className="fa fa-close" /></a>
    /*</div>
  }
})

var BrowserTabs = React.createClass({
  render: function () {
    var self = this
    return <div id="browser-tabs">
      {this.props.pages.map(function (page, i) {
        var onClick, onClose
        if (self.props.onTabClick)
          onClick = function (e) { self.props.onTabClick(e, page, i) }*/
        if (self.props.onTabClose)
          onClose = function (e) { e.preventDefault(); e.stopPropagation(); self.props.onTabClose(e, page, i) }
        return <BrowserTab key={'browser-tab-'+i} isActive={self.props.currentPageIndex == i} page={page} onClick={onClick} onClose={onClose} />
      /*})}
    </div>
  }  
})*/
```

`browser.jsx`

```js
var Browser = React.createClass({
  /* ... */
  onTabClose: function (e, page, pageIndex) {
    if (this.state.pages.length == 1)
      this.setState({ pages: [createPageObject()] })
    else {
      this.state.pages.splice(pageIndex, 1)
      this.setState({ pageS: this. state.pages })
    }

    if (this.state.currentPageIndex == pageIndex)
      this.setState({ currentPageIndex: 0 })
    else if (pageIndex < this.state.currentPageIndex)
      this.setState({ currentPageIndex: this.state.currentPageIndex - 1 })
  },
  /*render: function() {
    var self = this
    return <div>*/
      <BrowserTabs ref="tabs" pages={this.state.pages} currentPageIndex={this.state.currentPageIndex} onTabClick={this.onTabClick} onTabClose={this.onTabClose} />
      /*<BrowserNavbar ref="navbar" {...this.navHandlers} page={this.state.pages[this.state.currentPageIndex]} />
      {this.state.pages.map(function (page, i) {
        return <BrowserPage ref={'page-'+i} key={'page-'+i} {...self.pageHandlers} page={page} isActive={i == self.state.currentPageIndex} />
      })}
    </div>
  }
})*/
```

![tab-close](/img/building-electron-browser-pt2/tab-close.gif)

New tab button...

`browser-tabs.jsx`

```js
/*var BrowserTabs = React.createClass({
  render: function () {
    var self = this
    return <div id="browser-tabs">
      {this.props.pages.map(function (page, i) {
        var onClick, onClose
        if (self.props.onTabClick)
          onClick = function (e) { self.props.onTabClick(e, page, i) }
        if (self.props.onTabClose)
          onClose = function (e) { e.preventDefault(); e.stopPropagation(); self.props.onTabClose(e, page, i) }
        return <BrowserTab key={'browser-tab-'+i} isActive={self.props.currentPageIndex == i} page={page} onClick={onClick} onClose={onClose} />
      })}*/
      <a onClick={this.props.onNewTab}><i className="fa fa-plus" /></a>
    /*</div>
  }  
})*/
```

`browser.jsx`

```js

var Browser = React.createClass({
  /* ... */
  onNewTab: function () {
    this.state.pages.push(createPageObject())
    this.setState({ pages: this.state.pages, currentPageIndex: this.state.pages.length - 1 })
  },
  /*render: function() {
    var self = this
    return <div>*/
      <BrowserTabs ref="tabs" pages={this.state.pages} currentPageIndex={this.state.currentPageIndex} onNewTab={this.onNewTab} onTabClick={this.onTabClick} onTabClose={this.onTabClose} />
      /*<BrowserNavbar ref="navbar" {...this.navHandlers} page={this.state.pages[this.state.currentPageIndex]} />
      {this.state.pages.map(function (page, i) {
        return <BrowserPage ref={'page-'+i} key={'page-'+i} {...self.pageHandlers} page={page} isActive={i == self.state.currentPageIndex} />
      })}
    </div>
  }
})*/
```

![tab-create](/img/building-electron-browser-pt2/tab-create.gif)

## Commit

```
git commit -m "add tab controls"
```

Let's check the todo list:

- Navbar
  - **Navigation Btns: Home, Back, Forward, Refresh** - done
  - **Location Bar** - done
- **Page Tabs** - done
- Page View
  - **Content webview** - done
  - Page-search
  - Context menu
  - Status bar, driven by hover-state

Tomorrow is a car-trip, so it'll be a halfday.
Page-search and the status bar should be doable.

Be well.
[-pfraze](https://twitter.com/pfrazee)