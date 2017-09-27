import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  isLoading = false;
  gridData: any = {};

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.gridData = {
        data: [{
          id: 1,
          name: '彭骏豪',
          age: 3,
          sex: 0,
          weight: 27,
          height: 97
        }, {
          id: 2,
          name: '邢卓睿',
          age: 4,
          sex: 0,
          weight: 32,
          height: 110
        }, {
          id: 3,
          name: '曹子衿',
          age: 1,
          sex: 0,
          weight: 20,
          height: 67
        }],
        total: 3,
        pageIndex: 1
      };
      this.isLoading = false;
    }, 1000);
  }

  public rowSelectionChange(items) {
    console.log(items);
    console.log(this.gridData);
  }

  public modify(item) {
    console.log(item);
  }

  public pageChange(pageInfo) {
    console.log(pageInfo);
  }
}
