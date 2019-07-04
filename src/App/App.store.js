import { observable, action, decorate } from "mobx";

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
  const numRows = 200;

  for (let i = 0; i < numRows; i++) {
    records.push(makeRow(i+1))
  }

  return records
}


class AppStore {
  name = "";
  records = getInitialrecords();

  setName = (value) => { this.name = value }
  setStandards = (value) => { this.standards = value }
  setScriptedObjectives = (value) => { this.scriptedObjectives = value }
  setRecords = (value) => { this.records = value }
}

decorate(AppStore, {
  name: observable,
  numRows: observable,
  records: observable,
  setName: action,
  setStandards: action,
  setScriptedObjectives: action,
  setRecords: action
})

export default new AppStore();