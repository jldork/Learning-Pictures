import { observable, action, computed, decorate, configure } from "mobx";
import Moment from "moment";
import { extendMoment } from 'moment-range';

configure({ enforceActions: "observed" });	 

const moment = extendMoment(Moment);

function range_generator(dataLength) {
  let x = []; let i = 1;
  while (x.push(i++) < dataLength) { };
  return x
}

class AppStore {
  name = "Student Name";
  grade = "Grade";
  subject = "Subject";

  schoolYear = {
    start: moment(new Date(2019, 8, 3)), // Sept 3, 2019
    end: moment(new Date(2020, 5, 22)) // June 22, 2020
  }

  learningData = {
    objective: range_generator(120),
    datesMet: new Array(120).fill(""),
    lessonLearnUnits: new Array(120).fill(0),
    tactic: new Array(120).fill(0),
    protocol: new Array(120).fill(0)
  }

  // Computed Values
  get schoolYearDateArray(){
    const valid_dates = this.learningData.datesMet.filter(
      moment.isMoment).filter((validMoment)=>{
        return validMoment.isValid()
    })
    const moment_range = moment.range(
      moment.min(valid_dates), 
      moment.max(valid_dates)
    );

    return Array.from(moment_range.by('days'));
  }

  get records() {
    //   Columns    
    let sheetAcceptedFormat = [
      [
        { value: 'Obj #', readOnly: true },
        { value: 'Date Met', readOnly: true },
        { value: 'Lesson LU', readOnly: true },
        { value: 'Tactic', readOnly: true },
        { value: 'Protocol', readOnly: true }
      ]
    ]

    // For each objective
    for (let i = 0; i < this.learningData.objective.length; i++) {
      let formatted_date = moment.isMoment(this.learningData.datesMet[i]) ? this.learningData.datesMet[i].format('M/DD/YYYY') : "";
      // Add a row
      sheetAcceptedFormat.push(
        // in { value: moment or int } format
        [
          { value: this.learningData.objective[i], readOnly: true },
          { value: formatted_date}, 
          { value: this.learningData.lessonLearnUnits[i] }, 
          { value: this.learningData.tactic[i] }, 
          { value: this.learningData.protocol[i] }
        ]
      )
    }

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