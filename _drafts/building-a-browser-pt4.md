*This post is the fourth in a series about building a browser with [Electron](http://electron.atom.io/), [React](http://facebook.github.io/react/), and [Secure Scuttlebutt](https://github.com/ssbc/secure-scuttlebutt).*

Yesterday, [I implemented page-search and the hover status bar](/2015/08/27/building-a-browser-pt1.html).
Today, I'm going to work on the context menu.


## Webview Context Menu

The trick to the context menu is right in the name: it needs to be contextual.
After a little bit of googling, I found the API I'll need: [Document.elementFromPoint](https://developer.mozilla.org/en-US/docs/Web/API/Document/elementFromPoint).
Like with page-search, I'll need to send IPC messages to the webview to use it.
And, because I'll need to use the electron `menu` API, I'll need to send information out of the webview, and let the parent process construct the menu.

Also, I'll need to travel up the DOM to gather information.
If I only pulled data from the element returned by `elementFromPoint`, I might just get a `<span>` or `<img>`, and miss a link that wraps it.

In the webview's preload, I added the following:

`context-menu.js`

```js
var ipc = require('ipc')

function triggerMenu (data) {
  ipc.sendToHost('contextmenu-data', data)
}

ipc.on('get-contextmenu-data', function (pos) {
  var data = {
    x: pos.x,
    y: pos.y,
    hasSelection: !!window.getSelection.toString(),
    href: false,
    img: false
  }

  var el = document.elementFromPoint(pos.x, pos.y)
  while (el && el.tagName) {
    if (!data.img && el.tagName == 'IMG')
      data.img = el.src
    if (!data.href && el.href)
      data.href = el.href
    el = el.parentNode
  }

  triggerMenu(data)
})
```

Then I updated `BrowserPage` and `Browser` as follows:

`browser-page.jsx`

```js
/*var BrowserPage = React.createClass({
  componentDidMount: function () {
    ... */

    // set location, if given
    if (this.props.page.location)
      this.refs.webview.getDOMNode().setAttribute('src', this.props.page.location)
  /*},
  ...
  render: function () {
    return <div id="browser-page" className={this.props.isActive ? 'visible' : 'hidden'}>
      <BrowserPageSearch isActive={this.props.page.isSearching} onPageSearch={this.onPageSearch} />*/
      <webview ref="webview" preload="./preload/main.js" onContextMenu={this.props.onContextMenu} />
      /*<BrowserPageStatus page={this.props.page} />
    </div>
  }  
})*/
```

`browser.jsx`

```js
var remote = require('remote')
var Menu = remote.require('menu')
var MenuItem = remote.require('menu-item')
var clipboard = require('clipboard')

var Browser = React.createClass({

  createTab: function (location) {
    this.state.pages.push(createPageObject(location))
    this.setState({ pages: this.state.pages, currentPageIndex: this.state.pages.length - 1 })
  },
  onNewTab: function () { this.createTab() },

  /* ... */

  webviewContextMenu: function (e) {
    var self = this
    var menu = new Menu()
    if (e.href) {
      menu.append(new MenuItem({ label: 'Open Link in New Tab', click: function () { self.createTab(e.href) } }))
      menu.append(new MenuItem({ label: 'Copy Link Address', click: function () { clipboard.writeText(e.href) } }))
    }
    if (e.img) {
      menu.append(new MenuItem({ label: 'Save Image As...', click: function () { alert('todo') } }))
      menu.append(new MenuItem({ label: 'Copy Image URL', click: function () { clipboard.writeText(e.img) } }))
      menu.append(new MenuItem({ label: 'Open Image in New Tab', click: function () { self.createTab(e.img) } }))
    }
    if (e.hasSelection)
      menu.append(new MenuItem({ label: 'Copy', click: function () { self.getWebView().copy() } }))
    menu.append(new MenuItem({ label: 'Select All', click: function () { self.getWebView().selectAll() } }))
    menu.append(new MenuItem({ type: 'separator' }))
    menu.append(new MenuItem({ label: 'Inspect Element', click: function() { self.getWebView().inspectElement(e.x, e.y) } }))
    menu.popup(remote.getCurrentWindow())
  },

  pageHandlers: {
    onContextMenu: function (e, page, pageIndex) {
      this.getWebView(pageIndex).send('get-contextmenu-data', { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
    },
    onIpcMessage: function (e, page) {
      /*if (e.channel == 'status') {
        page.statusText = e.args[0]
        this.setState(this.state)
      }*/
      else if (e.channel == 'contextmenu-data') {
        this.webviewContextMenu(e.args[0])
      }
    },
    /* ...
  }
}*/
```

**todo - contextmenu.gif**

This will be good enough for now.
I'll want to add controls for `<video>` elements, and the image-save, in the future.

## Commit

```
git commit -m "add webview context menu"
```

### Chrome Context Menu

Now, we need menus for the browser's ui elements.
I'm going to keep this simple as well, with menus just for tabs and the location input.

Tabs first:

`browser-tabs.jsx`

```js
/*var BrowserTab = React.createClass({
  render: function () {
    var title = this.props.page.title || 'loading'*/
    return <div className={this.props.isActive ? 'active' : ''} title={title} onClick={this.props.onClick} onContextMenu={this.props.onContextMenu}>
      /*<a onClick={this.props.onClose}><i className="fa fa-close" /></a>
      <span>
        {title}
        {this.props.page.isLoading ? <i className="fa fa-spinner fa-pulse" /> : undefined}
      </span>
    </div>
  }
})

var BrowserTabs = React.createClass({
  render: function () {
    var self = this
    return <div id="browser-tabs">
      {this.props.pages.map(function (page, i) {
        if (!page)
          return
        
        function onClick (e) { self.props.onTabClick(e, page, i) }*/
        function onContextMenu (e) { self.props.onTabContextMenu(e, page, i) }
        /*function onClose (e) { e.preventDefault(); e.stopPropagation(); self.props.onTabClose(e, page, i) }*/
        return <BrowserTab key={'browser-tab-'+i} isActive={self.props.currentPageIndex == i} page={page} onClick={onClick} onContextMenu={onContextMenu} onClose={onClose} />
      /*})}
      <a onClick={this.props.onNewTab}><i className="fa fa-plus" /></a>
    </div>
  }  
})*/
```

`browser.jsx`

```js
var Browser = React.createClass({
  /* ... */

  tabContextMenu: function (pageIndex) {
    var self = this
    var menu = new Menu()
    menu.append(new MenuItem({ label: 'New Tab', click: function () { self.createTab() } }))
    menu.append(new MenuItem({ label: 'Duplicate', click: function () { self.createTab(self.getPageObject(pageIndex).location) } }))
    menu.append(new MenuItem({ type: 'separator' }))
    menu.append(new MenuItem({ label: 'Close Tab', click: function() { self.closeTab(pageIndex) } }))
    menu.popup(remote.getCurrentWindow())
  },

  tabHandlers: {
    onNewTab: function () {
      this.createTab()
    },
    onTabClick: function (e, page, pageIndex) {
      this.setState({ currentPageIndex: pageIndex })
    },
    onTabContextMenu: function (e, page, pageIndex) {
      this.tabContextMenu(pageIndex)
    },
    onTabClose: function (e, page, pageIndex) {
      this.closeTab(pageIndex)
    }
  },
  /* ... */
})
```

**todo - tabcontextmenu.gif**

Ok, now the location bar:

`browser-navbar.jsx`

```js
var BrowserNavbarLocation = React.createClass({
  /* ... */
  render: function() {
    return <input type="text" onKeyDown={this.onKeyDown} onChange={this.onChange} onContextMenu={this.props.onContextMenu} value={this.props.page.location} />
  }
})

var BrowserNavbar = React.createClass({
  /*render: function() {
    return <div id="browser-navbar">
      <BrowserNavbarBtn title="Home" icon="home fa-lg" onClick={this.props.onClickHome} />
      <BrowserNavbarBtn title="Back" icon="arrow-left" onClick={this.props.onClickBack} />
      <BrowserNavbarBtn title="Forward" icon="arrow-right" onClick={this.props.onClickForward} />
      <BrowserNavbarBtn title="Refresh" icon="refresh" onClick={this.props.onClickRefresh} />*/
      <BrowserNavbarLocation onEnterLocation={this.props.onEnterLocation} onChangeLocation={this.props.onChangeLocation} onContextMenu={this.props.onLocationContextMenu} page={this.props.page} />
      /*<BrowserNavbarBtn title="Network Sync" icon="cloud-download" onClick={this.props.onClickSync} />
    </div>
  }
})*/
```

`browser.jsx`

```js
var Browser = React.createClass({
  /* ... */

  locationContextMenu: function (el) {
    var self = this
    var menu = new Menu()
    menu.append(new MenuItem({ label: 'Copy', click: function () {
      clipboard.writeText(el.value)
    }}))
    menu.append(new MenuItem({ label: 'Cut', click: function () {
      clipboard.writeText(el.value.slice(el.selectionStart, el.selectionEnd))
      self.getPageObject().location = el.value.slice(0, el.selectionStart) + el.value.slice(el.selectionEnd)
    }}))
    menu.append(new MenuItem({ label: 'Paste', click: function() {
      var l = el.value.slice(0, el.selectionStart) + clipboard.readText() + el.value.slice(el.selectionEnd)
      self.getPageObject().location = l
    }}))
    menu.append(new MenuItem({ label: 'Paste and Go', click: function() {
      var l = el.value.slice(0, el.selectionStart) + clipboard.readText() + el.value.slice(el.selectionEnd)
      self.getPageObject().location = l
      self.getWebView().setAttribute('src', l)
    }}))
    menu.popup(remote.getCurrentWindow())    
  },
  /* ... */

  navHandlers: {
    /* ... */
    onLocationContextMenu: function (e) {
      this.locationContextMenu(e.target)
    }
  },
  /* ... */
}
```

**todo - location-context-menu.gif**

## Commit

```
git commit -m "add locationbar and tab context menus"
```

## Rewind Button

One thing I've been thinking is, the home button doesn't have that much utility these days.
When you want to go to your home view, you open a new tab.
What might be nicer is if you had a "rewind" button, that took you to the first page your tab opened.

It may be unwise to run UI experiments like this, but, I'm doing it anyway!

First, I updated the icons:

`browser-navbar.jsx`

```js
var BrowserNavbar = React.createClass({
  render: function() {
    return <div id="browser-navbar">
      <BrowserNavbarBtn title="Rewind" icon="angle-double-left fa-lg" onClick={this.props.onClickHome} />
      <BrowserNavbarBtn title="Back" icon="angle-left fa-lg" onClick={this.props.onClickBack} />
      <BrowserNavbarBtn title="Forward" icon="angle-right fa-lg" onClick={this.props.onClickForward} />
      <BrowserNavbarBtn title="Refresh" icon="circle-thin" onClick={this.props.onClickRefresh} />
      <BrowserNavbarLocation onEnterLocation={this.props.onEnterLocation} onChangeLocation={this.props.onChangeLocation} onContextMenu={this.props.onLocationContextMenu} page={this.props.page} />
      <BrowserNavbarBtn title="Network Sync" icon="cloud-download" onClick={this.props.onClickSync} />
    </div>
  }
})
```

Then, I made a simple behavior change:

`browser.jsx`

```js
var Browser = React.createClass({
  /* ... */

  navHandlers: {
    onClickHome: function () {
      this.getWebView().goToIndex(0)
    },
    /* ... */
  }
})
```

`goToIndex` takes the webview to the first page in its history.
Let's see how it works:

**todo - rewind-btn.gif**

After going a few clicks in, I was able to back to HN with the rewind button.
I like it.
We'll see if other people do.

## Commit

```
git commit -m "replace navbar home with rewind button"
```

Current todo list:

- Navbar
  - **Navigation Btns: Home, Back, Forward, Refresh**
  - **Location Bar**
  - SSB Network-sync Status
- **Page Tabs**
- Page View
  - **Content webview**
  - SSB browsing
  - APIs
  - API permissioning
  - **Page-search**
  - **Context menu**
  - **Status bar, driven by hover-state**
  - **Devtools**
- Main Menu
- Keyboard shortcuts

Tonight or tomorrow, I'll do the main menu and shortcuts (they'll be quick).
Then it'll be time to work on SSB browsing.

Later.
[-pfraze](https://twitter.com/pfrazee)