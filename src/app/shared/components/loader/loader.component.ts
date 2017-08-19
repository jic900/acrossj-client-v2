import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from './loader.service';
import { LoaderState } from './loader';

@Component({
  selector: 'aj-loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.scss']
})

export class LoaderComponent implements OnInit, OnDestroy {

  show: boolean;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) {
    this.show = false;
  }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
