import { Input, Directive, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
/**
 * How to use this directive?
 *
 * ```
 * <div *mqIf="'(min-width: 500px)'">
 *     Div element will exist only when media query matches, and created/destroyed when the viewport size changes.
 * </div>
 * ```
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[mqIf]'
})
export class MqIfDirective implements OnDestroy {
  private prevCondition: boolean = null;

  private mql: MediaQueryList;
  private mqlListener: (mql: MediaQueryList) => void;   // reference kept for cleaning up in ngOnDestroy()
  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<Object>) {}

  /**
   * Called whenever the media query input value changes.
   */
  @Input()
  set mqIf(newMediaQuery: string) {
    if (!this.mql) {
      this.mql = window.matchMedia(newMediaQuery);

      /* Register for future events */
      this.mqlListener = (mq) => {
        console.log('DBG 32 ... media change');
        console.log(mq); // dbg
        this.onMediaMatchChange(mq.matches);
      };
      this.mql.addListener(this.mqlListener);
    }

    this.onMediaMatchChange(this.mql.matches);
  }

  ngOnDestroy() {
    this.mql.removeListener(this.mqlListener);
    this.mql = this.mqlListener = null;
  }

  private onMediaMatchChange(matches: boolean) {
    if (matches && !this.prevCondition) {
      this.prevCondition = true;
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (!matches && this.prevCondition) {
      this.prevCondition = false;
      this.viewContainer.clear();
    }
  }
}
