*This post is the third in a series about building a browser with [Electron](http://electron.atom.io/), [React](http://facebook.github.io/react/), and [Secure Scuttlebutt](https://github.com/ssbc/secure-scuttlebutt).*

Yesterday, [I implemented the tabs, navbar, and page behaviors](/2015/08/27/building-a-browser-pt1.html).
Today, I'm going to do some UI tweaking, and add page-search and status-bar hover states.

## UI Tweak: Tab Widths

**todo - fullwidth-tabs.gif**

I had the idea when I woke up to make tabs flex to fill their full space.

```css
#browser-tabs {
  display: flex;
}
#browser-tabs > div {
  flex: 1;
}
```

## Commit

```
git commit -m "ui tweak: tabs flex to fill horizontally"
```

## Page search

Page search is simple to do with the `window.find()` API.
The question is, can that be run from outside of the webframe?

Looks like the answer is the webview API, [executeJavaScript](https://github.com/atom/electron/blob/master/docs/api/web-view-tag.md#webviewexecutejavascriptcode-usergesture).

To trigger search, I'll probably use Electron's menu API, which lets me set hotkeys on the commands.
For now, I'm going to register a keydown event handler:

`browser.jsx

```js
/*function createPageObject () {
  return {
    location: '',
    statusText: false,
    title: 'new tab',
    isLoading: false,*/
    isSearching: false
  /*}
}

var Browser = React.createClass({
  ... */
  componentDidMount: function () {
    // attach keyboard shortcuts
    // :TODO: replace this with menu hotkeys
    document.body.addEventListener('keydown', function (e) {
      if (e.metaKey && e.keyCode == 70) { // cmd+f
        self.getPageObject().isSearching = true
        self.setState(self.state)
      } else if (e.keyCode == 27) { // esc
        self.getPageObject().isSearching = false
        self.setState(self.state)
      }
    })
  },
  /* ... */
})
```

`browser-page.jsx`

```js
/*var BrowserPage = React.createClass({
  ... 
  render: function () {
    return <div id="browser-page" className={this.props.isActive ? 'visible' : 'hidden'}>*/
      <BrowserPageSearch isActive={this.props.page.isSearching} />
      /*<webview ref="webview" />
      <BrowserPageStatus status={this.props.page.statusText} />
    </div>
  }  
})*/
```

This gets the search box rendering, but I need to give it focus when it's first rendered.
Thankfully, react is prepared for that with `componentDidUpdate(object prevProps, object prevState)`.

`browser-page.jsx`

```js
var BrowserPageSearch = React.createClass({
  componentDidUpdate: function (prevProps) {
    if (!prevProps.isActive && this.props.isActive)
      this.refs.input.getDOMNode().focus()
  },
  /* ... */
})
```

Now we need the search behavior.

`browser-page.jsx`

```js
/*var BrowserPageSearch = React.createClass({
  ... */
  onKeyDown: function (e) {
    if (e.keyCode == 13) {
      e.preventDefault()
      this.props.onPageSearch(e.target.value)
    }
  },
  /*render: function () {
    return <div id="browser-page-search" className={this.props.isActive ? 'visible' : 'hidden'}>*/
      <input ref="input" type="text" placeholder="Search..." onKeyDown={this.onKeyDown} />
    /*</div>
  }
})

var BrowserPage = React.createClass({
  ... */
  onPageSearch: function (query) {
    this.refs.webview.getDOMNode().executeJavaScript('window.find("'+query+'", 0, 0, 1)')
  },
  /*render: function () {
    return <div id="browser-page" className={this.props.isActive ? 'visible' : 'hidden'}>*/
      <BrowserPageSearch isActive={this.props.page.isSearching} onPageSearch={this.onPageSearch} />
      /*<webview ref="webview" />
      <BrowserPageStatus status={this.props.page.statusText} />
    </div>
  }  
})*/
```

**todo - pagesearch.gif**

## Commit

```
git commit -m "add page search"
```

## A Wild Pageclose Bug Appears

Check this out:

**todo - pageclose-bug.gif**

When tabs are closed to the *left* of active tabs, the webviews go out of sync with their pages.
What appears to happen is, the closed tab's webview doesn't go away.
Instead, the webviews all move to right one tab.

The solution I chose is not my favorite, but it's working.
Rather than splice out a page on close, I just null it:

`browser.jsx`

```js

var Browser = React.createClass({
  /* ... */
  onTabClose: function (e, page, pageIndex) {
    // last tab, full reset
    if (this.state.pages.filter(Boolean).length == 1)
      return this.setState({ pages: [createPageObject()], currentPageIndex: 0 })

    this.state.pages[pageIndex] = null
    this.setState({ pages: this.state.pages })

    // find the nearest adjacent page to make active
    if (this.state.currentPageIndex == pageIndex) {
      for (var i = pageIndex; i >= 0; i--) {
        if (this.state.pages[i])
          return this.setState({ currentPageIndex: i })
      }
      for (var i = pageIndex; i < this.state.pages.length; i++) {
        if (this.state.pages[i])
          return this.setState({ currentPageIndex: i })
      }
    }
  }
})
```

That seems to work, for now.
The render functions just return early if the page is null.

## Commit

```
git commit -m "fix: page-close no longer unsyncs webviews with their tabs"
```

## Hover Status

AFAICT, I can't receive the `hover` event from outside the webview.
So, I'll need to add a preload script which emits status-changes over IPC.

I believe, without `nodeintegration` set on the webview, it'll be impossible for the content to access the `ipc` library.
Therefore, it *shouldn't* be possible for guest content to set status on their own, because it won't be able to send ipc messages.
If that's incorrect, please let me know!

`preload.js`

```js
var ipc = require('ipc')

function setStatus (status) {
  ipc.sendToHost('status', status)
}

document.body.addEventListener('mouseover', function (e) {
  // watch for mouseovers of anchor elements
  var el = e.target
  while (el) {
    if (el.tagName == 'A') {
      // set to title or href
      if (el.getAttribute('title'))
        setStatus(el.getAttribute('title'))
      else if (el.href)
        setStatus(el.href)
      return 
    }
    el = el.parentNode
  }
  setStatus(false)
})
```

`browser-page.jsx`

```js
var BrowserPageStatus = React.createClass({
  render: function () {
    var status = this.props.page.statusText
    if (!status && this.props.page.isLoading)
      status = 'Loading...'
    return <div id="browser-page-status" className={status ? 'visible' : 'hidden'}>{status}</div>
  }
})

/*var BrowserPage = React.createClass({
  ...
  render: function () {
    return <div id="browser-page" className={this.props.isActive ? 'visible' : 'hidden'}>
      <BrowserPageSearch isActive={this.props.page.isSearching} onPageSearch={this.onPageSearch} />
      <webview ref="webview" preload="./preload.js" />*/
      <BrowserPageStatus page={this.props.page} />
    /*</div>
  }  
})*/

var webviewEvents = {
  /* ... */
  'ipc-message': 'onIpcMessage' // new event to listen for
}
```

`browser.jsx`

```js
var Browser = React.createClass({
  /* ... */
  pageHandlers: {
    onIpcMessage: function (e, page) {
      if (e.channel == 'status') {
        page.statusText = e.args[0]
        this.setState(this.state)
      }
    }
  },
  /* ... */
})
```

**todo - statushover.gif**

## Commit

```
git commit -m "add status line to hovered webview links"
```

Let's check the todo list:

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
  - Context menu
  - **Status bar, driven by hover-state**
  - Devtools
- Main Menu
- Keyboard shortcuts

Ok, another day done.
I think, tomorrow, I'll spend time on the context-menu, which I think will require some fairly detailed behaviors.

Be well.
[-pfraze](https://twitter.com/pfrazee)