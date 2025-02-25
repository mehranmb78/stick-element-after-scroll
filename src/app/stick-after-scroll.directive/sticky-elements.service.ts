import { Injectable } from '@angular/core'
import { fromEvent } from 'rxjs'
import { toSignal } from '@angular/core/rxjs-interop'
import { distinctUntilChanged, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class StickyElementsService {
  stickyElements: HTMLElement[] = []
  resizeObserver = new ResizeObserver(() => this.updateStickyElementsPosition())

  constructor() {}

  addNewStickyElements(el: HTMLElement): void {
    el.style.width = '100%'
    el.style.position = 'fixed'
    el.style.left = '0'
    el.style.transition = 'top 0.5s ease'
    this.stickyElements.push(el)
    this.resizeObserver.observe(el)
    this.updateStickyElementsPosition()
  }

  removeStickyElement(el: HTMLElement): void {
    const index = this.stickyElements.findIndex(stickyElement => stickyElement.id === el.id)

    if (index > -1) {
      el.removeAttribute('style')
      this.stickyElements.splice(index, 1)
      this.resizeObserver.unobserve(el)
      this.updateStickyElementsPosition()
    }
  }

  private updateStickyElementsPosition(): void {
    let top = 0
    let zIndex = 999

    this.stickyElements.forEach(el => {
      el.style.top = `${top}px`
      el.style.zIndex = `${zIndex--}`
      top += el.offsetHeight
    })
  }
}
