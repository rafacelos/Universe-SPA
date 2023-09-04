export class Router {

  routes = {}

  add(addressHref, addressContent) {
    this.routes[addressHref] = addressContent
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, "", event.target.href || event.target.dataset.action || "/universe")
  
    this.handle()
  }
  
  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]
    
    fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector('#content').innerHTML = html
    })

    this.backgroundImg()
  }

  backgroundImg() {
    if (window.location.pathname == '/') {
      document.querySelector("main").style.backgroundImage = "url(./assets/bg1.png)"
    } 
    if ( window.location.pathname == '/universe' ) {
      document.querySelector("main").style.backgroundImage = "url(./assets/bg2.png)"
    }
    if ( window.location.pathname == '/explorer' ) {
      document.querySelector("main").style.backgroundImage = "url(./assets/bg3.png)"
    }

  }
}