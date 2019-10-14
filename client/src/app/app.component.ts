import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from './search.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;
  domain: string;
  message: any;
  errorMessage: any;
  loading = false;
  checkedDomain: string;

  constructor(private searchService: SearchService,
              private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Ng-domain-lookup');
    this.title = this.titleService.getTitle();
  }

  search(form: NgForm) {
    if (form.valid) {
      this.message = null;
      this.errorMessage = null;
      this.checkedDomain = this.domain;
      this.loading = !this.loading;

      this.searchService.checkDomain(this.domain)
      .then(
        data => {
          this.loading = !this.loading;
          this.message = data;
        }
      ).catch(
        err => {
          this.loading = !this.loading;
          this.errorMessage = err;
        }
      );
    }
  }

}
