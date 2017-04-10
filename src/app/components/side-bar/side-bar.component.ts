import { Component, AnimationTransitionEvent, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'side-bar',
  template: require('./side-bar.html')
})
export class SidebarComponent {

  constructor (
    private changeDetection: ChangeDetectorRef
  ) {}
  private _opened: boolean = false;
  private _modeNum: number = 0;
  private _positionNum: number = 0;
  private _closeOnClickOutside: boolean = false;
  private _showBackdrop: boolean = false;
  private _animate: boolean = true;
  private _trapFocus: boolean = true;
  private _autoFocus: boolean = true;
  private _keyClose: boolean = false;
  private _autoCollapseHeight: number = null;
  private _autoCollapseWidth: number = null;

  private _MODES: Array<string> = ['over', 'push', 'dock'];
  private _POSITIONS: Array<string> = ['left', 'right', 'top', 'bottom'];

  toggleOpened(): void {
    this._opened = !this._opened;
    this.changeDetection.detectChanges();
  }

  private _onOpenStart(): void {
    console.info('Sidebar opening');
  }

  private _onOpened(): void {
    console.info('Sidebar opened');
  }

  private _onCloseStart(): void {
    console.info('Sidebar closing');
  }

  private _onClosed(): void {
    console.info('Sidebar closed');
  }

  private _onAnimationStart(e: AnimationTransitionEvent): void {
    console.info('Animation start', e);
  }

  private _onAnimationDone(e: AnimationTransitionEvent): void {
    console.info('Animation done', e);
  }
}