function published_words_interval_refresh(){
  const sheet = new Global();
  const publish = new PublishedGlobal();
  const dev = new DevPublishedGlobal();

  const publishedWords = publish.wordSheet.getDataRange().getValues();
  sheet.prodSheet.getRange("A:Z").clearContent();
  sheet.prodSheet.getRange(1,1,publishedWords.length,publishedWords[0].length).setValues(publishedWords);
  
  const devPublishedWords = dev.wordSheet.getDataRange().getValues();
  sheet.devSheet.getRange("A:Z").clearContent();
  sheet.devSheet.getRange(1,1,devPublishedWords.length,devPublishedWords[0].length).setValues(devPublishedWords);
}