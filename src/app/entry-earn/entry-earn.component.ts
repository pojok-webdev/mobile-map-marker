import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-entry-earn',
  templateUrl: './entry-earn.component.html',
  styleUrls: ['./entry-earn.component.scss'],
})
export class EntryEarnComponent implements OnInit {
item:{
  name:''
}
title
  constructor(private navParams: NavParams) {
    this.title = this.navParams.data.title
    this.item = this.navParams.data.item
  }

  ngOnInit() {}

}
