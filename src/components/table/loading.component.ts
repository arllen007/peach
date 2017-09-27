/**
 * Created by bjpengzhilong on 2017/9/22.
 */
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'peach-loading',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="peach-loading-mask">
      <div *ngIf="supportAnimation" class="peach-loading-main">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="peach-loading-main-ie" *ngIf="!supportAnimation"></div>
    </div>
  `,
  styleUrls: [
    './style/loading.less'
  ]
})
export class PeachLoadingComponent {
  supportAnimation = true;
  constructor() {
    this.supportAnimation = this._supportCss3('animation');
  }

  private _supportCss3(style) {
    const prefix = ['webkit', 'Moz', 'ms', 'o'],
           humpString = [],
           htmlStyle = document.documentElement.style,
           _toHumb = function (string) {
              return string.replace(/-(\w)/g, function ($0, $1) {
                return $1.toUpperCase();
              });
           };

    for (const key of prefix) {
      humpString.push(_toHumb(key + '-' + style));
    }
    humpString.push(_toHumb(style));
    for (const key of humpString) {
      if (key in htmlStyle) {
        return true;
      }
    }

    return false;
  }
}
