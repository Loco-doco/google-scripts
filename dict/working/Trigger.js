function published_words_interval_refresh(){
  const sheet = new Global();
  const publish = new PublishedGlobal();

  const publishedWords = publish.p_wordSheet.getDataRange().getValues();
  sheet.wordsRepSheet.getRange("A:Z").clearContent();
  sheet.wordsRepSheet.getRange(1,1,publishedWords.length,publishedWords[0].length).setValues(publishedWords);
}