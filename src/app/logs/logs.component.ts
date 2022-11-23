import { Component, OnInit } from '@angular/core';
import { LogService } from '../servicios/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  constructor(private logger: LogService) {
  }

  testLog(): void {
      this.logger.log("Test the `log()` Method");
  }


  ngOnInit(): void {
  }

}
