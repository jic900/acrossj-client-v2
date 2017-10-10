import {
  Component,
  OnInit
} from '@angular/core';

enum SelectMode {SINGLE, MULTI}

@Component({
  selector: 'aj-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

export class SelectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
