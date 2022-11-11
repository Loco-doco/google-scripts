function published_words_interval_refresh(){
  const sheet = new Global();
  const publish = new PublishedGlobal();

  const publishedWords = publish.p_wordSheet.getDataRange().getValues();
  sheet.wordsRepSheet.getRange("A:AA").clearContent(); // 언어 추가 시 확인!
  sheet.wordsRepSheet.getRange(1,1,publishedWords.length,publishedWords[0].length).setValues(publishedWords);
}