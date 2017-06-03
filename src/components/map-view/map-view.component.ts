import { Component, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';

import { Event } from '../../shared/event';

const WHITE_SPACE = new RegExp('\w');
function searchEncode(input: string): string {
  return input.replace(WHITE_SPACE, '+');
}

const MAP_MAX_WIDTH = 640;
const MAP_MAX_HEIGHT = 288;
const MAP_RATIO = MAP_MAX_WIDTH / MAP_MAX_HEIGHT;

interface Rect {
  width: number;
  height: number;
  scale: number;
}

@Component({
  selector: 'map-view',
  templateUrl: './map-view.component.html'
})
export class MapView implements OnChanges {
  @Input() private event: Event;
  private mapUrl: string;
  private imgWidth: number;
  private afterContentInit: boolean = false;
  private afterChanges: boolean = false;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterContentInit(): void {
    this.imgWidth = this.elementRef.nativeElement.offsetWidth;
    this.afterContentInit = true;
    this.setMapUrl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.event) return;
    this.afterChanges = true;
    this.setMapUrl();
  }

  private setMapUrl() {
    if (!this.afterContentInit || !this.afterChanges) return;
    const street = searchEncode(this.event.location.street);
    const city = searchEncode(this.event.location.city);
    const { width, height, scale } = this.getMapHeightWidthScale();
    this.mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${street},+${city}&zoom=15&size=${width}x${height}&markers=${street},+${city}&scale=${scale}`;
  }

  private getMapHeightWidthScale(): Rect {
    if (this.imgWidth > MAP_MAX_WIDTH) {
      return this.mapBoundByHeight();
    }

    return this.mapBoundByWidth();
  }

  private mapBoundByHeight(): Rect {
    const scale = (window.devicePixelRatio === 1) ? 1 : 2;
    return <Rect>{
        height: MAP_MAX_HEIGHT,
        width: MAP_MAX_WIDTH,
        scale
      };
  }

  private mapBoundByWidth(): Rect {
    const scale = (window.devicePixelRatio === 1) ? 1 : 2;
    return {
      width: this.imgWidth,
      height: Math.floor(this.imgWidth / MAP_RATIO),
      scale
    };
  }
}
