class EventKey extends Global{
  constructor(){
    super();
  }

  getEventKey(){
    if(!this.keyCount) throw new Error("이벤트 키가 없습니다")

    const keys = this.mapSheet.getRange(
      3,1,
      this.keyCount,this.c_colCount
    ).getValues();

    return keys
  }

  setEventKeyToCore(keys){
    const core = new CoreGlobal();
    core.c_targetSheet.getRange("A2:Z").clearContent();
    core.c_targetSheet.getRange(
      2,1,
      keys.length,keys[0].length
    ).setValues(keys);
  }

}
