function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    }
    else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState))
          resolve(true)
      })
    }
  })
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find(e => e === child))
      return parent.appendChild(child)
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find(e => e === child))
      return parent.removeChild(child)
  },
}

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  const styleContent = `
  .app-loading-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--c-primary);
    z-index: 9;
  }
  .sk-grid {
    width: 40px;
    height: 40px;
    /* Cube positions
    * 1 2 3
    * 4 5 6
    * 7 8 9
    */
  }
  .sk-grid-cube {
    width: 33.33%;
    height: 33.33%;
    background-color: #fff;
    float: left;
    animation: sk-grid 1.3s infinite ease-in-out;
  }

  .sk-grid-cube:nth-child(1), .sk-grid-cube:nth-child(5), .sk-grid-cube:nth-child(9) {
    animation-delay: 0.2s;
  }
  .sk-grid-cube:nth-child(2), .sk-grid-cube:nth-child(6) {
    animation-delay: 0.3s;
  }
  .sk-grid-cube:nth-child(4), .sk-grid-cube:nth-child(8) {
    animation-delay: 0.1s;
  }
  .sk-grid-cube:nth-child(3) { animation-delay: 0.4s; }
  .sk-grid-cube:nth-child(7) { animation-delay: 0.0s; }

  @keyframes sk-grid {
    0%, 70%, 100% {
      transform: scale3D(1, 1, 1);
    } 35% {
      transform: scale3D(0, 0, 1);
    }
  }
`
  const oStyle = document.createElement('style')
  const oDiv = document.createElement('div')

  oStyle.id = 'app-loading-style'
  oStyle.innerHTML = styleContent
  oDiv.className = 'app-loading-wrap'

  const oGrid = document.createElement('div')
  const oGridCube = document.createElement('div')

  oGrid.className = 'sk-grid'
  oGridCube.className = 'sk-grid-cube'
  for (let i = 0; i < 9; i++)
    oGrid.appendChild(oGridCube.cloneNode())

  oDiv.appendChild(oGrid)

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle)
      safeDOM.append(document.body, oDiv)
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle)
      safeDOM.remove(document.body, oDiv)
    },
  }
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)

window.onmessage = (ev) => {
  ev.data.payload === 'removeLoading' && removeLoading()
}

setTimeout(removeLoading, 4999)
