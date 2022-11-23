import { Component, OnInit } from '@angular/core';
import { DbFirestoreService } from '../servicios/database/db-firestore.service';
import { LogService } from '../servicios/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  searchText!: string;
  componente:string="logger"
  data!: any;

  constructor(private logger: LogService,
    private dbFirebase: DbFirestoreService,
    ) {
  }

  testLog(): void {
      this.logger.log("console","Test the `log()` Method");
  }


  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.dbFirebase.getAll(this.componente).subscribe(data => {
      this.data = data;
      localStorage.setItem(`${this.componente}`, JSON.stringify(data))
      console.log(this.data);      
    })
  }

}
