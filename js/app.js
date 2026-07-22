import { loginHandler } from './auth.js'

function buildDOM() {
    const topBar = document.createElement('nav')
    topBar.id = 'topBar'

    const content = document.createElement('main')
    content.id = 'content'

    const footer = document.createElement('footer')
    footer.id = 'footer'
    document.body.append(topBar, content, footer)
}

buildDOM();
loginHandler();