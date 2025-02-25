import { Directive, ElementRef, input, output } from '@angular/core';
import { StickyElementsService } from './sticky-elements.service';

type ElementType = 'Main' | 'Placement'

@Directive({
  selector: '[appStickAfterScroll]'
})
export class StickAfterScrollDirective {
  id = input.required<string>()
  stickThreshold = input(1)

  stickElement = output<boolean>()

  private placementHtmlEl: HTMLElement = document.createElement('div')
  private intersectionObserver?: IntersectionObserver

  constructor(
    private mainEl: ElementRef,
    private stickyElementsService: StickyElementsService,
  ) {}

  ngOnInit(): void {
    this.observeIntersection('Main')
  }

  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect()
  }

  observeIntersection(elType: ElementType): void {
    const el = elType === 'Main' ? this.mainEl.nativeElement : this.placementHtmlEl

    this.intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (elType === 'Main') {
          this.controlMainElIntersection(entry.isIntersecting)
        } else {
          this.controlPlacementElIntersection(entry.isIntersecting)
        }
      },
      { threshold: this.stickThreshold() },
    )

    this.intersectionObserver.observe(el)
  }

  controlMainElIntersection(isIntersecting: boolean): void {
    if (!isIntersecting) {
      this.intersectionObserver?.disconnect()
      this.showPlacementElement(this.mainEl.nativeElement, this.placementHtmlEl)
      this.stickyElementsService.addNewStickyElements(this.mainEl.nativeElement)
      this.observeIntersection('Placement')
      this.stickElement.emit(true)
    }
  }

  controlPlacementElIntersection(isIntersecting: boolean): void {
    if (isIntersecting) {
      this.intersectionObserver?.disconnect()
      this.removePlacementElement(this.placementHtmlEl)
      this.stickyElementsService.removeStickyElement(this.mainEl.nativeElement)
      this.observeIntersection('Main')
      this.stickElement.emit(false)
    }
  }

  private showPlacementElement(mainElement: HTMLElement, placementEl: HTMLElement): void {
    mainElement.before(placementEl)
    placementEl.style.height = `${mainElement.offsetHeight}px`
  }

  private removePlacementElement(placementEl: HTMLElement): void {
    placementEl.remove()
  }

}
