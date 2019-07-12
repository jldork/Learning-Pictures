import { observable, action, computed, decorate, configure } from "mobx";
import Moment from "moment";
import { extendMoment } from 'moment-range';
import DataFrame from'dataframe-js';

configure({ enforceActions: "observed" });	 

const moment = extendMoment(Moment);

function range_generator(dataLength) {
  let x = []; let i = 0;
  while (x.push(i++) < dataLength) { };
  return x
}

class AppStore {
  name = "Student Name";
  grade = "Grade";
  subject = "Subject";
  columns = ['OBJECTIVE', 'DESCRIPTION', 'DATES MET', 'LESSON LU', 'TACTIC', 'PROTOCOL']

  schoolYear = {
    start: moment(new Date(2019, 8, 3)), // Sept 3, 2019
    end: moment(new Date(2020, 5, 22)) // June 22, 2020
  }

  learningData = new DataFrame(
    range_generator(120).map((i)=>[i+1, "", "", 0, 0, 0]), this.columns
  )

  // Computed Values
  get schoolYearDateArray(){
    return Array.from(moment.range(
      this.schoolYear.start, 
      this.schoolYear.end
    ).by('days'));
  }

  get records() {
    //   Columns    
    let sheetAcceptedFormat = [
      [
        { value: 'Obj #', readOnly: true },
        { value: 'Description', readOnly: true},
        { value: 'Date Met', readOnly: true },
        { value: 'Lesson LU', readOnly: true },
        { value: 'Tactic', readOnly: true },
        { value: 'Protocol', readOnly: true }
      ]
    ]

    this.learningData.toArray().forEach((row)=>{ 
      // Add a row
      sheetAcceptedFormat.push(
        // in { value: moment or int } format
        [
          { value: parseInt(row[0]) || 0, readOnly: true }, // Objective #
          { value: row[1]}, // Description
          { value: moment.isMoment(row[2]) ? row[2].format('M/DD/YYYY') : row[2]}, // Date Met 
          { value: parseInt(row[3]) || 0}, // Lesson LU
          { value: parseInt(row[4]) || 0}, // Tactic
          { value: parseInt(row[5]) || 0}  // Protocol
        ]
      ) 
    })

    return sheetAcceptedFormat
  }

  // Setter Actions 
  setName = (event) => { this.name = event.target.value }
  setGrade = (event) => { this.grade = event.target.value }
  setSubject = (event) => { this.subject = event.target.value }
  setSchoolStart = (event) => { this.schoolYear.start = moment(event.target.value) }
  setSchoolEnd = (event) => { this.schoolYear.end = moment(event.target.value) }
  setLearningData = (event) => { this.learningData = event }
}

decorate(AppStore, {
  name: observable,
  grade: observable,
  subject: observable,
  numRows: observable,
  schoolYear: observable,
  schoolYearDateArray: computed,
  learningData: observable,
  records: computed,
  setName: action,
  setGrade: action,
  setSubject: action,
  setSchoolStart: action,
  setSchoolEnd: action,
  setLearningData: action
})

export default new AppStore();