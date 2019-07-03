import { observable, action, computed, decorate } from "mobx";

class AppStore {
  name = "";
  recordColumns = ['Date','Lesson LU', 'Tactic', 'Protocol'];
  records = [[]];

  get grid() {
    return this.records.toArray()
  };

  setName = (value) =>{ this.name = value }
  setStandards = (value) =>{ this.standards = value }
  setScriptedObjectives = (value) =>{ this.scriptedObjectives = value }
  setRecords = (value) =>{ this.records = value }
}

decorate(AppStore, {
    name: observable,
    records: observable,
    grid: computed,
    setName: action,
    setStandards: action,
    setScriptedObjectives: action,
    setRecords: action
  })

export default new AppStore();