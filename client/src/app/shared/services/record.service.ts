import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private currentRecord: any = null;

  setRecord(record: any) {
    this.currentRecord = record;
  }

  getRecord() {
    return this.currentRecord;
  }

  clearRecord() {
    this.currentRecord = null;
  }
}