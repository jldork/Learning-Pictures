import { observable, action, decorate } from "mobx";
import * as moment from "moment";

const getInitialrecords = () => {
  //   Columns    
  let records = [
    [
      { value: 'Obj #', readOnly: true },
      { value: 'Date Met', readOnly: true },
      { value: 'Lesson LU', readOnly: true },
      { value: 'Tactic', readOnly: true },
      { value: 'Protocol', readOnly: true }
    ]
  ]

  // Rows
  const makeRow = (rowNum) => {
    return [{ value: rowNum, readOnly: true }, { value: '' }, { value: 0 }, { value: 0 }, { value: 0 }]
  };
  const numRows = 100;

  for (let i = 0; i < numRows; i++) {
    records.push(makeRow(i + 1))
  }

  return records
}

class AppStore {
  name = "";
  school_year = {
    start: moment(new Date(2019, 8, 3)), // Sept 3, 2019
    end: moment(new Date(2020, 5, 22)) // June 22, 2020
  }
  records = getInitialrecords();

  setName = (value) => { this.name = value }
  setSchoolStart = (event) => { this.school_year.start = moment(event.target.value) }
  setSchoolEnd = (event) => { this.school_year.end = moment(event.target.value) }
  setRecords = (value) => { this.records = value }
}

decorate(AppStore, {
  name: observable,
  numRows: observable,
  records: observable,
  setName: action,
  setSchoolStart: action,
  setSchoolEnd: action,
  setRecords: action
})

export default new AppStore();