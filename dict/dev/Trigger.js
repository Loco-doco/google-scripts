function published_words_interval_refresh(){
  const sheet = new Global();
  const publish = new PublishedGlobal();

  const publishedWords = publish.p_wordSheet.getDataRange().getValues();
  console.log("갖고옴")
  sheet.wordsRepSheet.getRange("A:Z").clearContent();
  console.log("지움")
  sheet.wordsRepSheet.getRange(1,1,publishedWords.length,publishedWords[0].length).setValues(publishedWords);
  console.log("새로 넣음")
}
