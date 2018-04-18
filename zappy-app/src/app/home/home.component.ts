import { Component, OnInit , VERSION} from '@angular/core';
import {HttpService} from '../core/http/http.service'
import {HttpClient} from "@angular/common/http";
import { Socket } from 'ng-socket-io';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading: boolean;
  ver: any;
  tweets: any = []

  constructor(private http:HttpClient,
              private socket: Socket) {
    var that = this;
    this.socket.on('connection', function() {
      console.log("connect")
      that.socket.emit('load');
    });

    this.socket.on('load', function(data: any) {
      this.tweets = data
    }.bind(this));
  }

  ngOnInit() {
    this.isLoading = true;
    this.http.get('http://localhost:9200/api/tweets').subscribe((res)=>{
      this.tweets = res
      console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv", res)
    });


  }

}
