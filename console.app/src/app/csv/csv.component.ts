import { Component, OnInit } from '@angular/core';
import { CsvServiceService } from '../csv-service.service';
import { Router } from '@angular/router';
import { ParamDataService } from '../service/param-data.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css']
})
export class CsvComponent implements OnInit {
  public file: any='';
  public loading: boolean = false;
  public haveFile: boolean = false;
  public records: any;
  public csvArr: any;
  public newArr: any = [];
  constructor(
    private fileupload: CsvServiceService,
    private router: Router,
    private paramData: ParamDataService

  ) { }

  ngOnInit(): void {
  }
  onChange(event: any) {
    this.file = event.target.files[0];
    var splitted = this.file.name.split(".");
    if (splitted[1] != 'csv') {
      alert('This is not CSV file.')
      location.reload()
    }
    if (this.file) {
      this.haveFile = true
    }
  }
  onUpload() {
    this.newArr = []
    if (this.haveFile) {
      this.loading = !this.loading;
      let reader = new FileReader();
      reader.readAsText(this.file);
      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordArray = (<string>csvData).split(/\r|\n/);
        let headersRow = this.getHeaderArray(csvRecordArray);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordArray, headersRow.length)
        this.records.map((result: any) => {
          let res = {

            "title": result.title,
            "description": result.description,
            "status": true,
            "createUserId": Number(sessionStorage.getItem('userId'))

          }
          this.newArr.push(res);
        })
        let body = {
          "data": this.newArr
        }
        this.fileupload.upload(body).subscribe(
          (event: any) => {
            if (event.data == 1) {
              alert(`"${event.value}" title is already used.`)
            }
            else {
              this.router.navigateByUrl('post_list')
            }
          }
        );
      };
      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    }
    else {
      alert('There is no file.')
    }
  }
  getHeaderArray(csvRecordsArr: any) {
    let headers = (csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: data = new data();
        csvRecord.title = curruntRecord[0];
        csvRecord.description = curruntRecord[1];
        csvArr.push(csvRecord)
      }
    }
    return csvArr;
  }
}
export class data {
  public title: any;
  public description: any;
  public status: any;
  public createUserId: any;
}
